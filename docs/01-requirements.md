# Functional & Non-Functional Requirements

## Functional Requirements

### F1: Landing Page Display

- Display single-page portfolio with all sections visible or scrollable
- Header navigation with links: About, Tech Stack, Services, Get in Touch
- Hero section with headline, subtext, and two CTA buttons
- Profile card with image and bio
- Four technology arsenal cards
- Three service offering cards
- Statistics section with 4 key metrics
- Contact form section at bottom

### F2: Contact Form (PRIMARY BUSINESS FUNCTION)

- Form fields:
  - Email Address (required, valid email format)
  - Project Details (required, min 10 characters, max 500 characters)
  - Honeypot field (hidden from users, flagged if filled)
- Submit button: "Send Message"
- Client-side validation: show inline error messages
- Server-side validation: reject invalid payloads
- Success state: confirmation message displayed
- Error state: user-friendly error message
- Submit action:
  - Store in PostgreSQL database
  - Send notification email to OWNER_EMAIL
  - Return success response to client

### F3: Privacy Policy Page

- Located at `/privacy`
- Explain contact form data collection and usage
- GDPR/privacy compliance basics

### F4: Basic Anti-Spam Protection

- Honeypot field in form (hidden, flagged if completed)
- Rate limiting: max 5 submissions per IP per 15 minutes
- Server-side validation: reject payloads with obvious spam indicators

## Non-Functional Requirements

### NF1: Security

- HTTPS (enforced in production)
- Input sanitization + validation (Zod)
- CSRF protection (Next.js built-in)
- Honeypot + rate limiting
- No sensitive data in client-side code
- Environment variables for secrets

### NF2: Performance

- Page load < 3s on 4G
- Lighthouse score > 80
- Optimized images (Next.js Image component)
- Minimal JavaScript bundle

### NF3: Accessibility

- WCAG 2.1 Level AA compliance
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus states on form inputs
- Color contrast ratios met

### NF4: Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile: iOS Safari, Chrome Mobile

### NF5: Code Quality

- TypeScript (strict mode)
- ESLint + Prettier configured
- Environment variables managed (.env.local, .env.example)
- No console errors or warnings in production build
- Comments on complex logic only

### NF6: Deployment

- Vercel-ready (Next.js App Router)
- PostgreSQL database (managed service or local for dev)
- Email service: Resend API (fallback: nodemailer/SMTP)
- One-click deployment to Vercel with env setup

## Acceptance Criteria Checklist

### Design Acceptance

- [ ] Layout matches screenshot (hero section, card grids, section spacing)
- [ ] Color scheme: dark background, teal accents, white/light text
- [ ] Typography: clear hierarchy (h1 hero, h2 sections, body text readable)
- [ ] Responsive on mobile, tablet, desktop (no layout breaks)
- [ ] Images load correctly (profile image, card icons)

### Functionality Acceptance

- [ ] Navigation links scroll to sections or enable navigation
- [ ] Form appears at bottom of page
- [ ] Form validation works: shows errors for invalid input
- [ ] Form submission: data saved to database, email sent to owner
- [ ] Success message displays after submission
- [ ] Honeypot field blocks obvious spam
- [ ] Rate limiting prevents form spam (e.g., 5 per IP per 15 min)
- [ ] Privacy policy page accessible and readable

### Code Quality Acceptance

- [ ] No TypeScript errors (`tsc --noEmit` passes)
- [ ] No ESLint errors (`eslint .` passes)
- [ ] All environment variables documented in .env.example
- [ ] No hardcoded secrets in code
- [ ] Database migrations run successfully
- [ ] Email notification received when form submitted

### Security Acceptance

- [ ] Honeypot field present and functional
- [ ] Rate limiting active
- [ ] Server-side validation rejects invalid data
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities (proper escaping)

### Deployment Acceptance

- [ ] Local dev setup: npm run dev works
- [ ] Build succeeds: npm run build
- [ ] Environment variables required for production documented
- [ ] Deployable to Vercel (Next.js compatible)
- [ ] Database connection works in production

## Out of Scope (Explicitly Not Required)

- Multi-language support
- Admin panel or CMS
- Advanced analytics
- User authentication
- Blog or article system
- Payment processing
- Real-time chat or messaging
- Social media feed integration
- Complex animations or transitions (must not compromise accessibility)
