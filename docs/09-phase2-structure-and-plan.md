# Phase 2: Project File Structure & Build Plan

## Proposed File Structure

```
portfolio/
├── docs/                              # Documentation (created in Phase 1)
│   ├── 00-overview.md
│   ├── 01-requirements.md
│   ├── 02-information-architecture.md
│   ├── 03-ui-spec.md
│   ├── 04-api-spec.md
│   ├── 05-database-schema.md
│   ├── 06-env-config.md
│   ├── 07-testing-plan.md
│   └── 08-deployment.md
│
├── public/                            # Static assets (images, icons, fonts)
│   ├── images/
│   │   ├── profile.jpg               # Mr X profile photo
│   │   ├── favicon.ico
│   │   └── og-image.jpg              # Open Graph image for social sharing
│   └── icons/
│       ├── frontend.svg              # Tech card icons
│       ├── ai.svg
│       ├── automation.svg
│       ├── backend.svg
│       ├── github.svg                # Social icons
│       ├── linkedin.svg
│       └── twitter.svg
│
├── src/
│   ├── app/                          # Next.js App Router (main app structure)
│   │   ├── layout.tsx                # Root layout (nav, global styles)
│   │   ├── page.tsx                  # Home page (landing page with all sections)
│   │   ├── privacy/
│   │   │   └── page.tsx              # Privacy policy page
│   │   │
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts          # POST /api/contact (form submission endpoint)
│   │   │
│   │   └── globals.css               # Global TailwindCSS styles
│   │
│   ├── components/                   # Reusable React components
│   │   ├── Navbar.tsx                # Header navigation
│   │   ├── Hero.tsx                  # Hero section with headline + profile
│   │   ├── TechArsenal.tsx           # Technology cards section
│   │   ├── Services.tsx              # Service offerings section
│   │   ├── Stats.tsx                 # Statistics bar section
│   │   ├── ContactForm.tsx           # Contact form component
│   │   ├── Footer.tsx                # Page footer
│   │   └── SectionContainer.tsx      # Wrapper for section spacing/layout
│   │
│   ├── lib/                          # Utility functions & helpers
│   │   ├── api-utils.ts              # API response helpers, error handling
│   │   ├── email.ts                  # Email service (Resend or SMTP)
│   │   ├── rate-limit.ts             # Rate limiting logic (IP-based)
│   │   ├── crypto.ts                 # IP hashing, security utilities
│   │   └── constants.ts              # App-wide constants (colors, limits, etc.)
│   │
│   ├── types/                        # TypeScript type definitions
│   │   ├── api.ts                    # API request/response types
│   │   ├── contact.ts                # Contact submission types
│   │   └── env.ts                    # Environment variable types
│   │
│   ├── styles/                       # Additional stylesheets (if needed beyond Tailwind)
│   │   └── animations.css            # CSS animations/keyframes (optional)
│   │
│   └── hooks/                        # Custom React hooks (if needed)
│       └── useFormSubmit.ts          # Form submission logic hook (optional)
│
├── prisma/                           # Prisma ORM configuration & migrations
│   ├── schema.prisma                 # Database schema definition
│   └── migrations/                   # Auto-generated migration history
│       └── [migration_name]/
│           └── migration.sql
│
├── .github/                          # GitHub configuration (optional)
│   └── workflows/
│       └── deploy.yml                # Optional: Auto-deploy on push
│
├── .vscode/                          # VS Code settings (optional)
│   └── settings.json                 # Format on save, TypeScript strict mode
│
├── .env.example                      # Template for environment variables (committed to git)
├── .env.local                        # Actual environment variables (ignored by git)
├── .gitignore                        # Git ignore rules
├── .eslintrc.json                    # ESLint configuration
├── .prettierrc.json                  # Prettier code formatting config
├── next.config.js                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── package.json                      # Project dependencies & scripts
├── package-lock.json                 # Locked dependency versions
├── README.md                         # Project documentation (setup & deployment)
└── vercel.json                       # Vercel deployment configuration (optional)
```

---

## Build Plan: Step-by-Step Implementation Order

### Phase 2A: Project Setup & Configuration

**Duration**: 30 minutes

1. **Initialize Next.js Project**
   - Create `package.json` with dependencies (Next.js, React, TailwindCSS, Prisma, TypeScript, ESLint, Prettier, Zod, etc.)
   - Run `npm install`

2. **Configure TypeScript**
   - Create `tsconfig.json` (strict mode)
   - Configure path aliases (@/components, @/lib, etc.)

3. **Configure Tailwind CSS**
   - Create `tailwind.config.ts`
   - Create `src/app/globals.css` with Tailwind imports

4. **Configure Next.js**
   - Create `next.config.js` (image optimization, etc.)

5. **Configure ESLint & Prettier**
   - Create `.eslintrc.json`
   - Create `.prettierrc.json`
   - Configure "format on save" in VS Code

6. **Set Up Git & Environment**
   - Create `.gitignore` (node_modules, .env.local, .next, etc.)
   - Create `.env.example` (template with dummy values)
   - Initialize git repository

---

### Phase 2B: Database & Data Layer

**Duration**: 20 minutes

7. **Set Up Prisma**
   - Create `prisma/schema.prisma`
   - Define `ContactSubmission` model (id, email, message, createdAt, ipHash, userAgent, status)
   - Create `.env` with DATABASE_URL (local PostgreSQL or Supabase)

8. **Generate Prisma Client**
   - Run `npx prisma migrate dev --name init`
   - Verify tables created in database

9. **Create Type Definitions**
   - Create `src/types/contact.ts` (ContactSubmission type matching Prisma model)
   - Create `src/types/api.ts` (request/response schemas)

---

### Phase 2C: API Layer (Backend)

**Duration**: 40 minutes

10. **Create Email Service**
    - Create `src/lib/email.ts`
    - Implement email sending via Resend API (primary) or nodemailer/SMTP (fallback)
    - Function: `sendContactNotification(email, message, submissionId)`

11. **Create Utility Functions**
    - Create `src/lib/crypto.ts`: IP hashing (SHA256)
    - Create `src/lib/api-utils.ts`: Response helpers, error handling
    - Create `src/lib/constants.ts`: Color palette, limits (5 requests, 15 min, etc.)
    - Create `src/lib/rate-limit.ts`: Rate limiting logic (per-IP, 5 per 15 minutes)

12. **Create Validation Schema**
    - Install Zod (`npm install zod`)
    - Create schema for email & message validation (min/max length, format)
    - Implement honeypot validation

13. **Create Contact API Endpoint**
    - Create `src/app/api/contact/route.ts`
    - Implement POST handler:
      - Extract IP address (req.headers['x-forwarded-for'])
      - Request body parsing & Zod validation
      - Honeypot check
      - Rate limiting check
      - Database insertion (Prisma)
      - Email notification sending (with error handling)
      - Response with submissionId
    - Implement error responses (400, 429, 500)

---

### Phase 2D: Frontend Components

**Duration**: 1.5 hours

14. **Create Layout & Navigation**
    - Create `src/app/layout.tsx` (root HTML template, fonts, meta tags)
    - Create `src/components/Navbar.tsx` (sticky header, nav links, mobile hamburger)
    - Configure font loading (e.g., Inter from Google Fonts or system fonts)
    - Meta tags: title, description, viewport, OG tags

15. **Create Hero Section**
    - Create `src/components/Hero.tsx`
    - Left column: headline (with "Intelligent" in cyan), subtext, two buttons
    - Right column: profile image card with name & location
    - Responsive: stack on mobile
    - Buttons link to /contact and /services sections (smooth scroll)

16. **Create Tech Arsenal Section**
    - Create `src/components/TechArsenal.tsx`
    - Create `src/components/cards/TechCard.tsx` (reusable card component)
    - 4 cards: Frontend, AI Engineering, Automation, Backend
    - Card content: icon, title, tech list
    - Grid: 2x2 desktop, 1x4 mobile

17. **Create Services Section**
    - Create `src/components/Services.tsx`
    - Create `src/components/cards/ServiceCard.tsx` (reusable card)
    - 3 cards: AI Agents, Business Automation, Full-Stack SaaS
    - Card content: icon, title, description, feature list
    - Grid: 1x3 desktop, 1 column mobile

18. **Create Stats Section**
    - Create `src/components/Stats.tsx`
    - 4 stat items: 5+ / 30+ / 50+ / 100%
    - Layout: flex, centered, responsive
    - Large numbers, small labels

19. **Create Contact Form Component**
    - Create `src/components/ContactForm.tsx`
    - Create `src/hooks/useFormSubmit.ts` (form state & submission logic)
    - Fields: email, message, honeypot (hidden)
    - Client-side validation (display error messages)
    - Loading state (button disabled during submission)
    - Success message (with submissionId)
    - Error message (generic, no internal details)
    - Accessibility: labels, focus states, keyboard nav

20. **Create Footer**
    - Create `src/components/Footer.tsx`
    - Social links: GitHub, LinkedIn, Twitter
    - Links to /privacy and /terms (if exists)
    - Copyright text

21. **Create Helper Components**
    - Create `src/components/SectionContainer.tsx` (wrapper for section spacing)
    - Create `src/components/Button.tsx` (reusable button with variants)

---

### Phase 2E: Main Pages

**Duration**: 30 minutes

22. **Create Landing Page**
    - Create `src/app/page.tsx`
    - Import and render all sections: Navbar, Hero, TechArsenal, Services, Stats, ContactForm, Footer
    - Add section IDs for anchor navigation
    - Set page title & meta tags

23. **Create Privacy Policy Page**
    - Create `src/app/privacy/page.tsx`
    - Content: explain data collection, retention, GDPR basics
    - Keep simple and readable (no legal jargon)
    - Link back to home

24. **Configure Global Styles**
    - Create `src/app/globals.css`
    - Tailwind imports, base styles, color variables
    - Responsive typography
    - Dark mode only (no light mode)

---

### Phase 2F: Polish & Testing

**Duration**: 1 hour

25. **Add Accessibility**
    - Verify all interactive elements have labels
    - Test keyboard navigation (Tab, Enter, Escape)
    - Test screen reader (NVDA, VoiceOver, JAWS)
    - Verify color contrast (WCAG AA)
    - Add skip-to-main-content link (optional)

26. **Add Unit Tests** (Optional, can skip for MVP)
    - Jest + React Testing Library
    - Test form validation functions
    - Test rate limiting logic
    - Test Zod schema

27. **Performance Optimization**
    - Use `next/image` for images (automatic optimization)
    - Lazy load below-fold components (next/dynamic)
    - Minify CSS/JS (built-in to Next.js)
    - Test Lighthouse score

28. **Error Handling & Logging**
    - Add try-catch blocks in API routes
    - Console.error for debugging (removed in production)
    - Graceful error messages to users (no stack traces)

29. **Code Quality Checks**
    - Run `npm run lint` (ESLint)
    - Run `npm run build` (TypeScript check)
    - Fix any warnings/errors
    - Code review own work

30. **Documentation**
    - Create `README.md` with:
      - Project overview
      - Tech stack
      - Local setup steps
      - Deployment instructions
      - Environment variables
    - Add comments to complex code
    - Keep docs/xxx.md files updated

---

### Phase 2G: Deployment Preparation

**Duration**: 30 minutes

31. **Pre-Deployment Testing**
    - Full manual test: form validation, submission, email, database
    - Test on mobile (Chrome DevTools emulation + real device)
    - Test with accessibility tools
    - Test Lighthouse score (target > 80)

32. **Prepare for Production**
    - Verify `.env.example` has all required variables
    - Verify `.gitignore` excludes .env.local
    - Update `next.config.js` for production (disable console logs)
    - Create `vercel.json` (optional, for automatic migrations)

33. **Deploy to Vercel**
    - Push code to GitHub
    - Create Vercel project from GitHub repo
    - Add environment variables in Vercel dashboard
    - Run database migrations against production DB
    - Test form submission on production URL

34. **Post-Deployment Verification**
    - Visit production URL
    - Test form with real data
    - Verify email received
    - Check database records
    - Monitor Vercel logs for errors

---

## Summary

**Total Estimated Time**: 4-5 hours (one developer)

### Breakdown:

- Project Setup: 30 min
- Database & Data Layer: 20 min
- API Layer: 40 min
- Frontend Components: 90 min
- Main Pages: 30 min
- Polish & Testing: 60 min
- Deployment: 30 min

### Dependencies (npm packages to install):

```
Next.js 14+
React 18+
TypeScript
TailwindCSS
Prisma
@prisma/client
Zod
Resend (or nodemailer for SMTP)
ESLint
Prettier
```

### Critical Milestones:

1. ✅ Phase 1 Complete: Documentation (already done)
2. Awaiting: **Single word "START"** to begin Phase 2

---

## Notes for Phase 2 Execution

- Follow this plan in order (no skipping)
- Test each section after creation (don't wait until end)
- Commit to git after each major step (checkpoints)
- If stuck on a step, refer to corresponding docs
- Keep component files <300 lines (split if needed)
- Use TypeScript strict mode (catches errors early)
- Handle all errors gracefully (no crashes)
- Test on mobile + desktop
- No hardcoded values (use constants/env vars)
