# Environment Configuration

## Overview

All sensitive data and configuration is stored in environment variables, never committed to git.

---

## Required Environment Variables

### Database

- **`DATABASE_URL`** (REQUIRED)
  - PostgreSQL connection string
  - Format: `postgresql://user:password@host:port/database`
  - Example: `postgresql://postgres:mypassword@localhost:5432/portfolio_db`
  - Generate: From your database provider (Vercel Postgres, Supabase, local PostgreSQL, etc.)

### Email Service

- **`OWNER_EMAIL`** (REQUIRED)
  - Email address where contact form submissions are sent
  - Example: `aziz@example.com`
  - Used in email header "To" field

- **`RESEND_API_KEY`** (Required if using Resend, otherwise optional)
  - API key for Resend email service
  - Obtain from: https://resend.com (free tier available)
  - Format: `re_xxxxxxxxxxxxxxxxxxxxx`
  - Alternative: Use nodemailer/SMTP (see below)

- **`SMTP_HOST`** (Required if using nodemailer, optional otherwise)
  - SMTP server hostname
  - Example: `smtp.gmail.com` (Gmail), `smtp.sendgrid.net` (SendGrid)
  - Recommended: Use environment-specific SMTP (test vs. production)

- **`SMTP_PORT`** (Required if using nodemailer)
  - SMTP server port
  - Example: `587` (TLS), `465` (SSL), `25` (plain)

- **`SMTP_USER`** (Required if using nodemailer)
  - SMTP authentication username
  - Example: `noreply@example.com` or Gmail account

- **`SMTP_PASS`** (Required if using nodemailer)
  - SMTP authentication password
  - Use app-specific password for Gmail (not your main password)

- **`SMTP_FROM_EMAIL`** (Optional, defaults to SMTP_USER)
  - Email address shown in "From" field
  - Example: `noreply@yoursite.com`
  - Only needed if different from authentication user

### Rate Limiting (Optional but Recommended)

- **`UPSTASH_REDIS_REST_URL`** (Optional, for external rate limiting)
  - Upstash Redis instance REST URL
  - Obtain from: https://upstash.com (free tier available)
  - Format: `https://your-instance.upstash.io`

- **`UPSTASH_REDIS_REST_TOKEN`** (Optional, pairs with above)
  - Upstash Redis authentication token

### Optional Features

- **`NEXT_PUBLIC_SITE_URL`** (Optional)
  - Public site URL, used in email links or canonical tags
  - Example: `https://mrxstudio.com`
  - Marked with NEXT*PUBLIC* to be available in browser (safe)

---

## Local Development Setup

### Step 1: Create `.env.local`

```bash
# Copy the example file to create your local env
cp .env.example .env.local
```

### Step 2: Edit `.env.local` with your values

```env
# Database (PostgreSQL)
DATABASE_URL=postgresql://postgres:password@localhost:5432/portfolio_db

# Email (choose one: Resend OR SMTP)

# Option A: Resend (simple, requires account)
RESEND_API_KEY=re_your_api_key_here
OWNER_EMAIL=aziz@example.com

# Option B: SMTP (Gmail, SendGrid, custom server)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-specific-password
# OWNER_EMAIL=aziz@example.com

# Rate Limiting (optional)
# UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
# UPSTASH_REDIS_REST_TOKEN=xxx

# Optional
# NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 3: Set up PostgreSQL locally

```bash
# Option A: Docker Compose (if Docker installed)
docker-compose up

# Option B: PostgreSQL installed locally
# Create database and user
createdb portfolio_db
createuser portfolio_user -P  # Set password when prompted

# Option C: Use Supabase free tier
# Sign up at https://supabase.com
# Create new project, copy Connection String to DATABASE_URL
```

### Step 4: Run migrations

```bash
npx prisma migrate dev --name init
# This creates tables in your database
```

### Step 5: Start dev server

```bash
npm run dev
# Visit http://localhost:3000
```

---

## Production Setup (Vercel)

### Step 1: Push code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com/new
2. Select your GitHub repository
3. Select project root directory (if monorepo)
4. Click "Deploy"

### Step 3: Add environment variables to Vercel

In Vercel Dashboard → Settings → Environment Variables, add:

```
DATABASE_URL=postgresql://...  (from Vercel Postgres or managed DB)
OWNER_EMAIL=aziz@example.com
RESEND_API_KEY=re_xxxxx
UPSTASH_REDIS_REST_URL=https://...  (optional)
UPSTASH_REDIS_REST_TOKEN=xxxxx
```

### Step 4: Database migration in production

```bash
# In your local terminal, connected to production database
npx prisma migrate deploy

# Or Vercel will run this automatically in pre-deployment step
# (if configured in vercel.json)
```

### Step 5: Verify deployment

- Visit your Vercel URL
- Test contact form → should send email
- Check database → submission should be stored

---

## Environment Variables by Environment

### Development

```env
DATABASE_URL=postgresql://localhost/portfolio_db
RESEND_API_KEY=re_dev_key_or_use_smtp
OWNER_EMAIL=test@example.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Staging/Preview (Vercel Preview Deployments)

```env
DATABASE_URL=postgresql://...staging_db...
RESEND_API_KEY=re_real_key  # or SMTP credentials
OWNER_EMAIL=aziz@example.com
NEXT_PUBLIC_SITE_URL=https://projectname-staging.vercel.app
```

### Production

```env
DATABASE_URL=postgresql://...production_db...
RESEND_API_KEY=re_real_key  # or SMTP credentials
OWNER_EMAIL=aziz@example.com
NEXT_PUBLIC_SITE_URL=https://mrxstudio.com
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=xxx
```

---

## `.env.example` Template

Always commit `.env.example` to git (with dummy values) so others know what to configure:

```env
# Database
# Get DATABASE_URL from your database provider
# Local: postgresql://user:password@localhost:5432/dbname
# Vercel Postgres: postgresql://... (provided by Vercel)
# Supabase: postgresql+psycopg2://... (provided by Supabase)
DATABASE_URL=postgresql://localhost/portfolio_db

# Email Service
# Choose Option A (Resend) OR Option B (SMTP)

# Option A: Resend (https://resend.com - sign up free)
RESEND_API_KEY=re_your_api_key_here
OWNER_EMAIL=your-email@example.com

# Option B: SMTP (Gmail, SendGrid, etc.)
# Uncomment if using SMTP instead of Resend
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-specific-password-not-real-password
# SMTP_FROM_EMAIL=noreply@example.com
# OWNER_EMAIL=your-email@example.com

# Rate Limiting (Optional, use Upstash for production)
# Sign up: https://upstash.com (free tier available)
# UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
# UPSTASH_REDIS_REST_TOKEN=your_token_here

# Site Configuration
# NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

---

## Security Best Practices

1. **Never commit `.env.local` or actual secrets**
   - Git ignore: `.env.local`, `.env.*.local`
   - Already in `.gitignore`

2. **Use different secrets for each environment**
   - Dev: test email, test database
   - Prod: real email, real database

3. **Rotate secrets periodically**
   - Change SMTP password every 90 days
   - Regenerate API keys annually

4. **Use strong database passwords**
   - Min 16 characters, mix case + numbers + symbols
   - Example: `P@ssw0rd!2024#Secure$`

5. **Restrict database access**
   - Only allow app server to connect to database
   - Use VPC/private endpoints in production
   - Whitelist IP addresses if possible

6. **Monitor API key usage**
   - Resend: Check API key usage in Resend dashboard
   - SMTP: Monitor failed login attempts in email provider logs

7. **Use environment-specific URLs**
   - Never use production database in development
   - Never use production credentials for testing

---

## Troubleshooting

### "DATABASE_URL is not defined"

- Ensure `.env.local` exists in project root
- Verify DATABASE_URL line has no typos
- Restart dev server after creating `.env.local`

### "RESEND_API_KEY is invalid"

- Check key is correct in Resend dashboard
- Ensure no extra spaces in `.env.local`
- Key should start with `re_`

### "Failed to connect to email service"

- Resend: Check API key is valid
- SMTP: Verify host, port, user, password
- Gmail: Use app-specific password, not account password
- Verify firewall allows outbound SMTP (port 587/465)

### "Prisma Client not generated"

- Run: `npm install`
- Run: `npx prisma generate`
- Delete `node_modules/.prisma` and regenerate if stuck

### "Rate limiting not working"

- Check UPSTASH_REDIS_REST_URL and TOKEN are correct
- Upstash: Verify connection in upstash dashboard
- Fallback: In-memory rate limiter works without Upstash (dev only)

---

## Email Service Comparison

| Feature     | Resend           | SendGrid         | AWS SES     | Gmail SMTP   |
| ----------- | ---------------- | ---------------- | ----------- | ------------ |
| Setup       | Easy             | Moderate         | Complex     | Easy         |
| Free Tier   | Yes (100/month)  | Yes (100/month)  | Yes (start) | Yes          |
| API Rate    | 100 req/day free | 100 emails/month | Variable    | Limited      |
| Auth        | API key only     | Complex          | Access keys | App password |
| Recommended | ✅ Best for MVP  | Good             | Overkill    | Testing only |

---

## Configuration for common SMTP Providers

### Gmail

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your.email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx  # 16-char app password (not your Gmail password!)
```

### SendGrid

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxxxxxxxxxxx  # SendGrid API key starts with SG.
```

### Outlook/Microsoft 365

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your.email@outlook.com
SMTP_PASS=your-password
```

### Custom Server (e.g., Postmark, Mailgun)

```env
SMTP_HOST=api.postmarkapp.com  # or your custom domain
SMTP_PORT=587 or 465
SMTP_USER=your-api-token-or-username
SMTP_PASS=your-api-token-password
```

Verify settings with your email provider's documentation.
