# Deployment Guide

## Overview

Step-by-step instructions for local development, Vercel deployment, and database provisioning.

---

## Phase 1: Local Development Setup

### Prerequisites

- Node.js 18+ installed (`node --version`)
- Git installed
- Code editor (VS Code)
- PostgreSQL installed OR Docker/Docker Compose

### Step 1: Clone/Initialize Project

```bash
# Navigate to project directory
cd ~/desktop/portfolio

# Initialize git (if new project)
git init

# Stage all files
git add .

# Make initial commit
git commit -m "Initial commit: landing page with contact form"
```

### Step 2: Install Dependencies

```bash
# Install npm packages
npm install

# Verify installation
npm list
```

### Step 3: Set Up Environment Variables

```bash
# Copy example to local config
cp .env.example .env.local

# Edit .env.local with your values
# For Resend:
# RESEND_API_KEY=re_your_key_here
# OWNER_EMAIL=your@example.com
# DATABASE_URL=postgresql://localhost/portfolio_db

# For SMTP (Gmail example):
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your.email@gmail.com
# SMTP_PASS=your-app-specific-16-char-password
# OWNER_EMAIL=your@example.com
# DATABASE_URL=postgresql://localhost/portfolio_db
```

### Step 4: Set Up Database

#### Option A: Docker Compose (Recommended, No PostgreSQL Install Needed)

```bash
# Create docker-compose.yml in project root
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    container_name: portfolio_postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: portfolio_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
volumes:
  postgres_data:
EOF

# Start PostgreSQL in background
docker-compose up -d

# Verify running
docker-compose ps
```

#### Option B: PostgreSQL Installed Locally

```bash
# On macOS/Linux
createdb portfolio_db
createuser portfolio_user -P  # Set password when prompted

# On Windows (in PostgreSQL Shell)
createdb portfolio_db
createuser portfolio_user WITH PASSWORD 'password'

# Update DATABASE_URL in .env.local:
# DATABASE_URL=postgresql://portfolio_user:password@localhost:5432/portfolio_db
```

#### Option C: Supabase (Cloud Database)

1. Sign up at https://supabase.com
2. Create new project (choose region closest to you)
3. Wait for project to initialize
4. Go to Settings → Database → Connection string
5. Copy PostgreSQL connection string (URI)
6. Paste into .env.local as DATABASE_URL
7. Update password in connection string

### Step 5: Run Database Migrations

```bash
# Generate Prisma Client + run migrations
npx prisma migrate dev --name init

# This will:
# - Create ContactSubmission table
# - Generate prisma client
# - Show migration status

# Verify database
npx prisma studio  # Opens GUI at http://localhost:5555
```

### Step 6: Start Development Server

```bash
# Start Next.js dev server
npm run dev

# Output should show:
# ▲ Next.js 14.x.x
# - Local: http://localhost:3000

# Open browser and visit http://localhost:3000
```

### Step 7: Test Contact Form Locally

```bash
# 1. Visit http://localhost:3000
# 2. Scroll to "Ready to build the future?" section
# 3. Fill out form:
#    Email: test@example.com
#    Message: "Testing the contact form functionality"
# 4. Click "Send Message"
# 5. Verify:
#    - Success message appears on page
#    - Check email inbox for notification (may be in spam)
#    - Run: npx prisma studio to verify database record
```

### Step 8: Verify Setup

```bash
# Linting (optional, install ESLint if needed)
npm run lint

# Build (test production build)
npm run build

# Expect:
# - 0 errors/warnings
# - .next/ folder created
```

### Troubleshooting Local Setup

#### Port 3000 Already In Use

```bash
# Use different port
npm run dev -- -p 3001

# Or kill process on 3000
# macOS/Linux:
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows (PowerShell):
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

#### Database Connection Failed

```bash
# Verify PostgreSQL is running
# Docker:
docker-compose ps

# Local PostgreSQL:
psql postgres  # Should connect

# Test connection string:
npx prisma db execute --stdin < /dev/null
```

#### Prisma Migration Issues

```bash
# Reset database (deletes all data, use dev only!)
npx prisma migrate reset --force

# Regenerate client
npx prisma generate

# Check status
npx prisma migrate status
```

#### Resend API Key Invalid

- Verify key in .env.local starts with `re_`
- Check Resend dashboard: https://dashboard.resend.com
- Copy fresh key from dashboard

#### Email Not Sending

- Check OWNER_EMAIL in .env.local
- Verify SMTP credentials if using SMTP
- Check Gmail app password (not main password): https://myaccount.google.com/apppasswords
- Check spam folder for email

---

## Phase 2: Prepare for Deployment

### Step 1: Clean Up & Commit Code

```bash
# Ensure .gitignore includes:
# - .env.local (environment variables)
# - node_modules/
# - .next/ (build folder)
# - .DS_Store (macOS files)

# Stage changes
git add .

# Commit with clear message
git commit -m "Ready for deployment: landing page + contact form"

# View changes
git log --oneline -5
```

### Step 2: Push to GitHub

```bash
# Create repository on GitHub.com (if not exists)

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/portfolio.git

# Push code
git branch -M main
git push -u origin main

# Verify on GitHub: https://github.com/yourusername/portfolio
```

### Step 3: Set Up Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub account
3. Authorize Vercel to access your GitHub repos

### Step 4: Deploy to Vercel

#### Automatic Deployment from GitHub

1. Go to https://vercel.com/new
2. Click "Select Git Repository"
3. Find and select `yourusername/portfolio`
4. Click "Import"
5. **Important**: In "Environment Variables" section, add:
   ```
   DATABASE_URL = postgresql://...production_db...
   RESEND_API_KEY = re_your_production_key
   OWNER_EMAIL = your@example.com
   UPSTASH_REDIS_REST_URL = https://... (optional)
   UPSTASH_REDIS_REST_TOKEN = ... (optional)
   ```
6. Click "Deploy"
7. Wait for build to complete (usually 2-3 minutes)
8. Vercel provides URL (e.g., `https://portfolio-rho.vercel.app`)

### Step 5: Database Setup on Production

#### Option A: Vercel Postgres (Easiest)

1. In Vercel dashboard, go to your project → Storage
2. Click "Create Database" → "Postgres"
3. Choose region
4. Name: `portfolio_db`
5. Vercel auto-creates DATABASE_URL env var
6. Click "Create"
7. Open database connection and run migrations

#### Option B: Supabase (Recommended for Free Tier)

1. Sign up at https://supabase.com
2. Create new project (choose region)
3. Go to Settings → Database → Connection string
4. Copy PostgreSQL URI
5. In Vercel dashboard → Environment Variables, set:
   ```
   DATABASE_URL = [paste Supabase connection string here]
   ```
6. Redeploy Vercel project
7. Run migrations against production database

#### Option C: AWS RDS / Azure Database / Other

- Follow your provider's setup guide
- Get connection string
- Add to Vercel environment variables
- Redeploy

### Step 6: Run Production Migrations

```bash
# From local machine, connected to production database:
npx prisma migrate deploy

# Or if using Vercel CLI:
vercel env pull  # Downloads production .env
npx prisma migrate deploy

# Verify with:
npx prisma studio --preview-port 5556
```

### Step 7: Test Production Deployment

```bash
# Visit Vercel URL (e.g., https://portfolio-rho.vercel.app)

# Test form:
# 1. Fill form with test data
# 2. Submit
# 3. Verify success message
# 4. Check email inbox for notification
# 5. Verify database: npx prisma studio (pointing to production)

# Check Vercel logs for errors
# Vercel dashboard → Deployments → Select latest → Logs
```

### Step 8: Set Custom Domain (Optional)

1. In Vercel dashboard → Project Settings → Domains
2. Enter your domain (e.g., mrxstudio.com)
3. Follow DNS configuration steps
4. Wait 24-48 hours for DNS propagation
5. Update .env: `NEXT_PUBLIC_SITE_URL=https://mrxstudio.com`

---

## Phase 3: Ongoing Maintenance

### Monitoring

```bash
# Check Vercel logs
# Dashboard → Deployments → Select → Logs

# Database backups (if using Vercel Postgres or Supabase)
# Automatically handled by provider
# Check dashboard for backup settings

# Monitor submission volume
# Set up daily email report or use Vercel Analytics
```

### Updates & Patches

```bash
# Check for dependency updates (monthly)
npm outdated

# Update packages (carefully!)
npm update

# Test locally:
npm run build

# Commit and push to trigger Vercel redeploy
git add package*.json
git commit -m "chore: update dependencies"
git push origin main
```

### Error Handling

```bash
# Check Vercel logs for errors
# Common issues:
# - database connection timeout (check DATABASE_URL)
# - missing env variable (verify in Vercel dashboard)
# - email service down (check Resend/SMTP status page)

# Rollback to previous deployment
# Vercel dashboard → Deployments → Right-click → Promote
```

---

## Checklist: Before Going Live

- [ ] Local dev server works (`npm run dev`)
- [ ] Contact form accepts valid input
- [ ] Email sent successfully on submission
- [ ] Database records created correctly
- [ ] Form rejects invalid input with messages
- [ ] Honeypot field hidden and functional
- [ ] Rate limiting active (5 per 15 min)
- [ ] No console errors or warnings
- [ ] Build succeeds (`npm run build`)
- [ ] ESLint passes (`npm run lint`)
- [ ] TypeScript checks pass (`tsc --noEmit`)
- [ ] Privacy policy page accessible
- [ ] Navigation links work
- [ ] Mobile responsive (test on phone)
- [ ] Accessibility basics (keyboard nav, labels)
- [ ] Code committed to GitHub
- [ ] Environment variables configured in Vercel
- [ ] Database migrations run successfully
- [ ] Test submission sent and received in production
- [ ] Lighthouse score > 80
- [ ] HTTPS enabled (Vercel default)
- [ ] Custom domain configured (optional)

---

## Monitoring & Analytics (Optional Future)

### Vercel Analytics (Free)

1. Vercel dashboard → Settings → Analytics
2. Enable Web Vitals
3. View performance metrics

### Email Monitoring

- Resend dashboard: https://dashboard.resend.com → Analytics
- SMTP logs (if using nodemailer): check email provider logs

### Database Monitoring

- Supabase dashboard: Query performance, storage usage
- Vercel Postgres: Database browser in Vercel dashboard

### Form Submission Tracking

- Option 1: Simple admin dashboard (future enhancement)
- Option 2: Email digest (manually build list)
- Option 3: Webhook to Slack/Discord (future enhancement)

---

## Security Checklist (Production)

- [ ] Environment variables not committed (.gitignore enforced)
- [ ] Database backups enabled
- [ ] HTTPS enforced (redirecting HTTP → HTTPS)
- [ ] Bot/spam prevention active (honeypot + rate limit)
- [ ] Email service API key not exposed in code
- [ ] Database connection uses SSL/TLS
- [ ] Firewall/IP restrictions on database (if available)
- [ ] Logs don't contain sensitive data
- [ ] Error messages don't leak stack traces to users

---

## Disaster Recovery

### If Database Goes Down

```bash
# Quick recovery:
# 1. Vercel Postgres: Automatic failover (built-in)
# 2. Supabase: Restore from automatic backup
# 3. Custom RDS: Use RDS snapshots/backups

# Contact form queues submissions in browser (future)
# and retries when database recovers
```

### If Email Service Down

```bash
# Fallback strategy:
# - User sees success message (graceful degradation)
# - Submission stored in database
# - Owner can retrieve messages from dashboard/Prisma Studio
# - Owner sends follow-up email manually

# Uptime monitoring:
# - Resend status: https://resend.statuspage.io
# - Gmail/SMTP: Check email provider status
```

### If Vercel Down

```bash
# Automatic handling:
# - Vercel has 99.9% SLA
# - Failover to backup region (automatic)
# - Check Vercel status: https://www.vercel-status.com
```

---

## Scaling Considerations (Future)

- Current setup handles ~100 submissions/day
- For higher volume:
  - Upgrade database (Supabase Pro, RDS Multi-AZ)
  - Add email queue (Bull, RabbitMQ)
  - Add Vercel Functions for heavy processing
  - Implement caching (Redis)
  - Monitor with Datadog/New Relic

---

## Deployment Command Reference

```bash
# Local dev
npm run dev

# Build check
npm run build

# Lint check
npm run lint

# Database operations
npx prisma migrate dev --name init  # local migration
npx prisma migrate deploy           # production migration
npx prisma studio                   # GUI database browser
npx prisma db push                  # push schema changes

# Push to GitHub (triggers Vercel deploy)
git push origin main

# Vercel CLI (optional)
npm install -g vercel               # install Vercel CLI
vercel                              # deploy current project
vercel env pull                     # download production .env
vercel logs                         # view recent logs
```
