# 🚀 Quick Start Guide

## Your Profile Image

The profile image you provided (profile.jpg) needs to be saved to:

```
public/images/profile.jpg
```

### How to Add Your Image:

1. The `public/images/` folder is already created
2. Save/copy your profile image as `profile.jpg` to that folder
3. The Hero component will automatically load it from that location

**Note**: The image must be:

- Named: `profile.jpg` (or update the path in `src/components/Hero.tsx` if using different filename)
- Format: JPG, PNG, or WebP (recommended: JPG for professional photos)
- Size: Recommended 400x500px or larger (Next.js Image component will optimize)

---

## ⚡ Next Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Then edit `.env.local` with:

```env
DATABASE_URL=postgresql://localhost/portfolio_db
RESEND_API_KEY=re_your_key OR use SMTP below

# For Gmail:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password

OWNER_EMAIL=your-email@example.com
```

### 3. Set Up Database

```bash
# Docker (easiest)
docker-compose up -d

# OR local PostgreSQL
createdb portfolio_db
```

### 4. Run Migrations

```bash
npx prisma migrate dev --name init
```

### 5. Start Development

```bash
npm run dev
```

Visit **http://localhost:3000**

---

## 🧪 Test the Form

1. Scroll to "Ready to build the future?" section
2. Fill out:
   - Email: your-email@example.com
   - Message: "Testing the contact form"
3. Click "Send Message"
4. Verify:
   - ✅ Success message appears
   - ✅ Email received in inbox (check spam folder)
   - ✅ Database record created: `npx prisma studio`

---

## 🎨 Customize Content

### Update Hero Headline

File: `src/components/Hero.tsx`

```tsx
// Change "Architecting Intelligent Systems" and bio text
```

### Update Services

File: `src/lib/constants.ts`

```tsx
export const SERVICES = [
  {
    id: 'ai-agents',
    title: 'Your Service Title',
    // ... modify here
  },
];
```

### Update Tech Stack

File: `src/lib/constants.ts`

```tsx
export const TECH_ARSENAL = [
  {
    id: 'frontend',
    title: 'Frontend',
    technologies: ['React', 'Next.js' /* ... */],
  },
];
```

### Update Stats

File: `src/lib/constants.ts`

```tsx
export const STATS = [
  { value: '5+', label: 'YEARS EXP.' },
  // ...
];
```

---

## 📧 Email Service Setup (Choose One)

### Option A: Resend (Recommended - 100 emails/month free)

1. Sign up: https://resend.com
2. Get API key
3. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_your_key_here
   ```

### Option B: Gmail SMTP

1. Enable 2-step verification: https://myaccount.google.com/security
2. Generate app password: https://myaccount.google.com/apppasswords
3. Add to `.env.local`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=xxxx-xxxx-xxxx-xxxx  # 16-char app password
   ```

### Option C: SendGrid SMTP

1. Create account: https://sendgrid.com
2. Create API key
3. Add to `.env.local`:
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=SG.your_sendgrid_api_key
   ```

---

## ✅ Build & Deploy Commands

```bash
# Lint (check code quality)
npm run lint

# Type check (find TypeScript errors)
npm run type-check

# Build for production
npm run build

# Start production server
npm start
```

---

## 🚢 Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy on Vercel

1. Go to https://vercel.com/new
2. Select your GitHub repository
3. Add environment variables:
   - `DATABASE_URL` (production database)
   - `RESEND_API_KEY` (or SMTP credentials)
   - `OWNER_EMAIL`
4. Click Deploy

### 3. Run Migrations

```bash
npx prisma migrate deploy
```

---

## 📁 Files Created

```
portfolio/
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── privacy/page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── TechArsenal.tsx
│   │   ├── Services.tsx
│   │   ├── Stats.tsx
│   │   ├── ContactForm.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── crypto.ts
│   │   ├── email.ts
│   │   ├── rate-limit.ts
│   │   ├── validation.ts
│   │   └── api-utils.ts
│   └── types/
│       ├── api.ts
│       └── contact.ts
├── public/
│   └── images/
│       └── [SAVE YOUR profile.jpg HERE]
├── prisma/
│   └── schema.prisma
├── docs/
│   ├── 00-overview.md
│   ├── 01-requirements.md
│   └── ... (8 more docs)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── .env.example
├── .gitignore
├── .eslintrc.json
├── .prettierrc.json
├── vercel.json
└── README.md
```

---

## 🔗 Important Links

- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **TailwindCSS**: https://tailwindcss.com/docs
- **Vercel Deploy**: https://vercel.com/new
- **Resend Email**: https://resend.com
- **Supabase Database**: https://supabase.com
- **TypeScript**: https://www.typescriptlang.org/docs

---

## 🐛 Common Issues

### Port 3000 Already In Use

```bash
npm run dev -- -p 3001
```

### Database Connection Failed

Check your DATABASE_URL in `.env.local`

### Email Not Sending

- Verify RESEND_API_KEY or SMTP credentials
- Gmail: Use 16-char app password, not main password
- Check spam folder

### Form Still Shows Errors

Check browser console (F12) and server logs for details

---

## 📞 Need Help?

1. Check `/docs/` folder for detailed documentation
2. See `README.md` for full setup guide
3. Check server logs: `npm run dev`
4. Check database: `npx prisma studio`

---

**Everything is ready! Add your profile image and you're good to go.** 🎉
