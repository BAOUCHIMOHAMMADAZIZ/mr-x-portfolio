# MR X Studio - Portfolio Landing Page

Professional portfolio landing page with integrated contact form for AI Systems Architect & Full-Stack Developer.

## 🚀 Features

- **Dark, premium UI** with teal/cyan accent colors
- **Fully functional contact form** with validation and spam protection
- **PostgreSQL database** for form submissions
- **Email notifications** via Resend or SMTP
- **Rate limiting** per IP address (5 requests per 15 minutes)
- **Responsive design** for mobile, tablet, and desktop
- **Accessibility** features (WCAG AA compliance)
- **Production-ready code** with TypeScript and ESLint

## 📋 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, TailwindCSS
- **Backend**: Next.js Route Handlers
- **Database**: PostgreSQL with Prisma ORM
- **Email**: Resend (primary) or nodemailer/SMTP (fallback)
- **Validation**: Zod
- **Rate Limiting**: Upstash Redis (optional) with in-memory fallback
- **Hosting**: Vercel-ready
- **Security**: Honeypot field, server-side validation, IP hashing

## 🛠️ Local Setup

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Code editor (VS Code recommended)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db

# Email (choose one)
RESEND_API_KEY=re_your_api_key
# OR
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password

OWNER_EMAIL=your-email@example.com
```

### Step 3: Set Up Database (PostgreSQL)

**Option A: Docker**

```bash
docker-compose up -d
```

**Option B: PostgreSQL Installed Locally**

```bash
createdb portfolio_db
```

**Option C: Supabase (Cloud)**

- Sign up at https://supabase.com
- Create project and copy connection string to DATABASE_URL

### Step 4: Run Migrations

```bash
npx prisma migrate dev --name init
```

This creates tables and generates Prisma Client.

### Step 5: Start Development Server

```bash
npm run dev
```

Visit **http://localhost:3000**

### Step 6: Test Contact Form

1. Navigate to the contact form section
2. Fill out and submit
3. Check email inbox for notification
4. Verify submission in database: `npx prisma studio`

## 📁 Project Structure

```
src/
├── app/
│   ├── api/contact/route.ts      # Form submission endpoint
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── privacy/page.tsx          # Privacy policy
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── TechArsenal.tsx
│   ├── Services.tsx
│   ├── Stats.tsx
│   ├── ContactForm.tsx
│   └── Footer.tsx
├── lib/                          # Utilities
│   ├── api-utils.ts
│   ├── crypto.ts
│   ├── email.ts
│   ├── rate-limit.ts
│   ├── validation.ts
│   └── constants.ts
└── types/                        # TypeScript types
    ├── api.ts
    └── contact.ts
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Form validates email format
- [ ] Form requires minimum 10 characters in message
- [ ] Form rejects messages over 500 characters
- [ ] Honeypot field blocks spam (hidden, if filled → rejection)
- [ ] Rate limiting works (5 submissions per IP per 15 minutes)
- [ ] Email notification sent to OWNER_EMAIL
- [ ] Database records created correctly
- [ ] Responsive on mobile/tablet/desktop
- [ ] Lighthouse score > 80

### Run Linting

```bash
npm run lint
```

### Type Check

```bash
npm run type-check
```

### Build

```bash
npm run build
```

## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to https://vercel.com/new
3. Select repository
4. Add environment variables:
   - `DATABASE_URL` (production database)
   - `RESEND_API_KEY` or SMTP credentials
   - `OWNER_EMAIL`
   - `UPSTASH_REDIS_REST_URL` (optional)
   - `UPSTASH_REDIS_REST_TOKEN` (optional)
5. Click Deploy

### Database Setup

**Option A: Vercel Postgres**

- Create new database in Vercel dashboard
- Environment variables auto-populated

**Option B: Supabase**

- Create project at https://supabase.com
- Copy connection string to DATABASE_URL
- Run migrations: `npx prisma migrate deploy`

**Option C: Custom RDS/Cloud Database**

- Get connection string from provider
- Set DATABASE_URL environment variable
- Run migrations: `npx prisma migrate deploy`

### Run Migrations in Production

```bash
npx prisma migrate deploy
```

## 📧 Email Service Configuration

### Resend (Recommended)

1. Sign up at https://resend.com
2. Get API key
3. Set `RESEND_API_KEY=re_xxx` in .env

### Gmail SMTP

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=xxxx-xxxx-xxxx-xxxx  # 16-char app password (not main password)
OWNER_EMAIL=your-email@gmail.com
```

Generate app password: https://myaccount.google.com/apppasswords

### SendGrid SMTP

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxxx  # SendGrid API key
```

## 🔒 Security Features

- **Honeypot field**: Hidden field catches bots
- **Rate limiting**: Max 5 submissions per IP per 15 minutes
- **Input validation**: Zod schema + server-side checks
- **IP hashing**: No raw IP addresses stored
- **HTTPS**: Enforced in production
- **CSRF protection**: Built-in Next.js middleware
- **No hardcoded secrets**: All config via environment variables

## 📊 Monitoring

### Form Submissions

```bash
npx prisma studio
# Opens GUI at http://localhost:5555
```

Filter by:

- Recent submissions: sort by createdAt DESC
- Spam patterns: check ipHash frequency
- Status: "new", "read", "replied"

### Vercel Logs

- Dashboard → Deployments → Select → Logs
- Check for API errors, email failures

### Email Status

- Resend dashboard: https://dashboard.resend.dev
- SMTP logs: Check email provider's log

## 🎨 Customization

### Change Colors

Edit `tailwind.config.ts` colors section or `src/lib/constants.ts`

### Update Content

- Hero text: `src/components/Hero.tsx`
- Services: `src/lib/constants.ts` (SERVICES array)
- Tech stack: `src/lib/constants.ts` (TECH_ARSENAL array)

### Add/Remove Sections

Edit `src/app/page.tsx` to import/remove components

### Profile Image

1. Replace `/public/images/profile.jpg` with your image
2. Update alt text in `src/components/Hero.tsx`

## 🐛 Troubleshooting

### Database Connection Failed

```bash
# Verify DATABASE_URL is correct
echo $DATABASE_URL

# Test connection
npx prisma db execute --stdin < /dev/null
```

### Email Not Sending

- Check `RESEND_API_KEY` or SMTP credentials
- Verify `OWNER_EMAIL` is set
- Gmail: Use 16-char app password, not main password
- Check firewall allows outbound SMTP (port 587/465)

### Rate Limit Not Working

- Check Upstash credentials (if using Redis)
- Fallback in-memory limiter works without external service
- Clear browser cache/cookies if testing

### Prisma Errors

```bash
# Regenerate client
npx prisma generate

# Reset database (dev only!)
npx prisma migrate reset --force
```

## 📝 Documentation

Full documentation in `/docs`:

- `00-overview.md` - Project scope
- `01-requirements.md` - Functional specs
- `02-information-architecture.md` - Site structure
- `03-ui-spec.md` - Design tokens
- `04-api-spec.md` - API endpoint details
- `05-database-schema.md` - Database structure
- `06-env-config.md` - Environment setup
- `07-testing-plan.md` - Test checklist
- `08-deployment.md` - Deployment steps
- `09-phase2-structure-and-plan.md` - Build plan

## 📞 Support

For issues or questions:

1. Check `/docs` for detailed information
2. Review troubleshooting section above
3. Check error logs in Vercel dashboard
4. Review database with `npx prisma studio`

## 📄 License

All rights reserved. © 2024 MR X Studio.

## ✅ Checklist Before Going Live

- [ ] `.env.local` configured with all required variables
- [ ] PostgreSQL database created and migrated
- [ ] Contact form tested locally and works end-to-end
- [ ] Email notifications received successfully
- [ ] Rate limiting verified (5 per 15 min per IP)
- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes
- [ ] `npm run type-check` passes
- [ ] Lighthouse score > 80
- [ ] Mobile responsive tested
- [ ] Privacy policy page accessible
- [ ] Code committed to GitHub
- [ ] Vercel project created with env vars
- [ ] Production database set up
- [ ] Test submission in production received
- [ ] Monitoring/logging configured

---

**Built with Next.js, TypeScript, TailwindCSS, PostgreSQL, and Prisma.**
