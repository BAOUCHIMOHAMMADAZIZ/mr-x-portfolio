# Testing Plan & QA Checklist

## Manual Testing Checklist (Phase 2)

### Homepage/Layout Testing

#### Navbar & Navigation

- [ ] Navbar appears at top of page on desktop
- [ ] Logo/branding visible on left
- [ ] Navigation links visible: About, Tech Stack, Services, Get in Touch
- [ ] "Get in Touch" link scrolls to contact form
- [ ] "Tech Stack" link scrolls to Technological Arsenal section
- [ ] "Services" link scrolls to What I Offer section
- [ ] Links are underlined or highlighted on hover
- [ ] Mobile hamburger menu appears on small screens (< 768px)

#### Hero Section

- [ ] Main headline displays: "Architecting Intelligent Systems"
- [ ] Word "Intelligent" is in teal/cyan color
- [ ] Subheading text is readable and positioned correctly
- [ ] Profile image loads and displays correctly
- [ ] "Mr X" name visible below image
- [ ] Location text "Based in San Francisco" visible
- [ ] Two CTA buttons present: "Start a Project" and "View Services"
- [ ] "Start a Project" button is primary color (cyan)
- [ ] "View Services" button is outlined/secondary style
- [ ] Buttons are clickable and scroll to correct sections
- [ ] On mobile, content stacks vertically (image below text)

#### Technology Arsenal Section

- [ ] Section title "Technological Arsenal" displays
- [ ] Subtitle text visible and readable
- [ ] Four cards display in 2x2 grid on desktop
- [ ] Cards display single column on mobile
- [ ] Each card has icon, title, and tech list:
  1. Frontend (React, Next.js, TypeScript, TailwindCSS)
  2. AI Engineering (LLMs, OpenAI, LangChain, Vector DBs)
  3. Automation (Python, Scripting, Cron Jobs)
  4. Backend (Node.js, PostgreSQL, Supabase, Redis)
- [ ] Card styling consistent (dark background, subtle border)
- [ ] Text is readable on dark background

#### What I Offer Section

- [ ] Section title "What I Offer" displays
- [ ] Two cards display in 1x2 grid on desktop
- [ ] Cards stack on mobile
- [ ] Card 1: "Business Automation" with features list
- [ ] Card 2: "Full-Stack SaaS" with features list
- [ ] All card text readable and properly formatted
- [ ] Icons/images in cards display correctly

#### Statistics Section

- [ ] Four stat items display side-by-side on desktop
- [ ] Stats display in 2x2 grid on mobile
- [ ] Stat 1: "5+" and "YEARS EXP."
- [ ] Stat 2: "30+" and "AI MODELS TRIED"
- [ ] Stat 3: "50+" and "PROJECTS SHIPPED"
- [ ] Stat 4: "100%" and "CLIENT SATISFACTION"
- [ ] Numbers are large and prominent
- [ ] Labels are gray and smaller

#### Contact Form Section

- [ ] Section title "Ready to build the future?" displays
- [ ] Subtitle text visible
- [ ] Form appears below text
- [ ] Form fields display correctly on desktop and mobile

### Contact Form Testing

#### Form Appearance

- [ ] Email input field visible with label "Email Address"
- [ ] Message textarea visible with label "Project Details"
- [ ] Honeypot field hidden (inspect element shows it, but not visible on page)
- [ ] Submit button visible and clickable: "Send Message"
- [ ] Form layout is responsive (full width on mobile)
- [ ] Form has appropriate padding and spacing

#### Form Validation - Client Side

##### Valid Submission

- [ ] Enter: email = "test@example.com", message = "This is my project idea"
- [ ] Click "Send Message"
- [ ] No error messages appear
- [ ] Form submits successfully
- [ ] Success message appears

##### Empty Email

- [ ] Leave email empty, fill message
- [ ] Click "Send Message"
- [ ] Error message appears: "Email is required" or similar
- [ ] Form does not submit

##### Invalid Email Format

- [ ] Enter email = "notanemail"
- [ ] Click "Send Message"
- [ ] Error message appears: "Invalid email address"
- [ ] Form does not submit

##### Empty Message

- [ ] Fill email, leave message empty
- [ ] Click "Send Message"
- [ ] Error message appears: "Message is required"
- [ ] Form does not submit

##### Message Too Short

- [ ] Enter email = "test@example.com", message = "short" (5 chars)
- [ ] Click "Send Message"
- [ ] Error message appears: "Message must be at least 10 characters"
- [ ] Form does not submit

##### Message Too Long

- [ ] Enter email = "test@example.com", message = "a" repeated 501 times
- [ ] Click "Send Message"
- [ ] Error message appears: "Message must be 500 characters or less"
- [ ] Form does not submit

##### Honeypot Field Filled

- [ ] Open browser DevTools (F12)
- [ ] In console: `document.querySelector('[name="website"]').style.display = 'block'`
- [ ] Fill the "website" field with any text
- [ ] Submit form
- [ ] Form either silently fails or shows generic error (no spam disclosure)
- [ ] Email is NOT sent to owner (spam detected)
- [ ] Database record is NOT created

#### Form Submission - Server Side

##### Successful Submission

- [ ] Fill form with valid data
- [ ] Click "Send Message"
- [ ] Success message appears on page (e.g., "Message received! We'll get back to you soon.")
- [ ] Success message includes a reference/confirmation ID (optional but nice)
- [ ] User's email inbox: Email notification received from owner address
- [ ] Email contains user's message and email address
- [ ] Database check: New record in `contact_submissions` table
  - [ ] `email` field matches form input
  - [ ] `message` field matches form input
  - [ ] `createdAt` is recent timestamp
  - [ ] `ipHash` is populated (hashed)
  - [ ] `userAgent` contains browser string
  - [ ] `status` is "new"

##### Email Content Verification

- [ ] Email "To" field is correct (OWNER_EMAIL)
- [ ] Email "From" field is valid (Resend or SMTP configured)
- [ ] Subject line includes user email: "New Contact Form Submission from test@example.com"
- [ ] Email body contains:
  - User's email address
  - Complete message text
  - Submission timestamp or date
- [ ] Email is plain text or HTML (designed properly)
- [ ] No sensitive data leaked in email headers

##### Server Validation

- [ ] Use API testing tool (Postman, curl, or browser DevTools)
- [ ] Send POST to `/api/contact` with invalid data
  - [ ] Missing email: returns 400 error with email validation message
  - [ ] Invalid email format: returns 400 error
  - [ ] Missing message: returns 400 error with message validation message
  - [ ] Message < 10 chars: returns 400 error
  - [ ] Message > 500 chars: returns 400 error
  - [ ] Honeypot filled: returns 400 or 200 (generic error), no email sent
- [ ] Send POST with valid data:
  - [ ] Returns 200 success response with `submissionId`
  - [ ] Email is sent
  - [ ] Database record created

#### Rate Limiting

##### Single IP - Multiple Submissions

- [ ] Submit form 5 times rapidly with valid data
- [ ] All 5 success
- [ ] 6th submission: returns 429 "Too many requests"
- [ ] Error message: "Please try again later"
- [ ] Database: Only 5 records created for this IP

##### Rate Limit Reset

- [ ] Submit form 5 times (limit reached)
- [ ] Wait 15 minutes
- [ ] Submit form again
- [ ] 6th submission succeeds (rate limit reset)

##### Multiple IPs

- [ ] Submit from different IP/VPN/device (if possible)
- [ ] Each IP gets its own rate limit (5 per 15 min)
- [ ] Submissions from different IPs don't interfere

#### Form State Management

##### Keyboard Navigation

- [ ] Tab key moves focus through form fields: Email → Message → Submit
- [ ] Shift+Tab moves focus backward
- [ ] Enter key while in Submit button triggers form submission
- [ ] Focus visible on each field (blue outline or ring)

##### Visual Feedback

- [ ] Form field borders change color on focus (e.g., cyan/teal glow)
- [ ] Submit button is disabled during submission (shows loading state or disabled appearance)
- [ ] Submit button is re-enabled after response
- [ ] Success message is visible and not overlaid
- [ ] Success message fades or closes after reasonable time (optional)

##### Error Handling

- [ ] If email service fails: user sees "Thank you for your message. We'll get back to you soon." (graceful degradation)
- [ ] If database fails: user sees error message, can retry
- [ ] No stack traces or internal errors exposed to user

### Privacy Policy Page

#### /privacy Page Accessibility

- [ ] Navigate to `/privacy` URL
- [ ] Page loads successfully
- [ ] Title mentions privacy or data handling
- [ ] Content is readable and formatted cleanly

#### Privacy Policy Content

- [ ] Explains what data is collected: email, message, IP hash, user-agent
- [ ] Explains how data is used: to respond to contact, spam prevention
- [ ] States retention period (recommended: 30-90 days)
- [ ] Mentions GDPR/privacy rights (if applicable)
- [ ] Provides way to request data deletion (link to email or form)
- [ ] No legal advice, just clear explanation of practices

### Responsive Design Testing

#### Desktop (1200px+)

- [ ] All layout intact
- [ ] Text readable without zooming
- [ ] Images scaled appropriately
- [ ] Cards in proper grid layout
- [ ] Form fields sized appropriately
- [ ] No horizontal scrolling

#### Tablet (768px - 1200px)

- [ ] Layout adapts: hero may stack, cards 2 per row
- [ ] Text still readable
- [ ] Form fields full width
- [ ] Navigation hamburger menu or responsive
- [ ] No horizontal scrolling

#### Mobile (< 768px)

- [ ] Single column layout
- [ ] Hero text and image stack vertically
- [ ] Cards single column (or 2 if space allows)
- [ ] Form fields full width
- [ ] Navigation hamburger menu with open/close
- [ ] Text sizes readable without zooming
- [ ] No horizontal scrolling

#### Mobile Landscape (< 768px height)

- [ ] Content doesn't overflow
- [ ] Text still legible
- [ ] Form still usable

### Browser Compatibility

#### Desktop Browsers

- [ ] Chrome (latest version): Full functionality
- [ ] Firefox (latest version): Full functionality
- [ ] Safari (latest version): Full functionality
- [ ] Edge (latest version): Full functionality

#### Mobile Browsers

- [ ] Safari Mobile (iOS): Form works, touch targets large enough
- [ ] Chrome Mobile (Android): Form works, animations smooth
- [ ] Edge Mobile: Basic functionality works

### Performance Testing

#### Page Load

- [ ] Homepage loads in < 3 seconds on 4G
- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1

#### Lighthouse Audit

- [ ] Performance score > 80
- [ ] Accessibility score > 90
- [ ] Best Practices > 85
- [ ] SEO score > 90

#### Accessibility

##### Keyboard Navigation

- [ ] Tab through all elements (nav, buttons, form fields)
- [ ] Focus order is logical (left-to-right, top-to-bottom)
- [ ] Skip-to-main-content link (optional but recommended)
- [ ] No keyboard traps

##### Screen Reader Testing (NVDA, JAWS, VoiceOver)

- [ ] Page title announced correctly
- [ ] Headings read as headings (h1, h2, h3)
- [ ] Links read as links with descriptive text
- [ ] Form labels associated with inputs
- [ ] Button text clear and descriptive
- [ ] Error messages announced
- [ ] Success message announced

##### Color Contrast

- [ ] All text ≥ 4.5:1 contrast ratio (white on dark)
- [ ] Form labels readable
- [ ] Links distinguishable from regular text (not by color alone)
- [ ] Icons paired with text labels

### Security Testing

#### Input Sanitization

- [ ] Submit form with HTML: `<script>alert('xss')</script>`
- [ ] No JavaScript executed
- [ ] Message displays safely (escaped)

#### Honeypot Verification

- [ ] Inspect element shows honeypot field in HTML
- [ ] Field is hidden via CSS (display: none or visibility: hidden)
- [ ] Field not visible in screenshot
- [ ] Filling honeypot prevents submission

#### Rate Limiting

- [ ] Rapid-fire submissions are blocked
- [ ] Error message doesn't reveal internal details
- [ ] IP hash prevents user enumeration

#### No Exposed Secrets

- [ ] Network tab (DevTools → Network): No API keys in requests
- [ ] No database URLs in HTML
- [ ] No OWNER_EMAIL hardcoded in client code
- [ ] Environment variables only in API routes

### SEO & Metadata

#### Meta Tags

- [ ] `<title>` tag is descriptive (e.g., "MR X - AI Systems Architect & Full-Stack Developer")
- [ ] `<meta name="description">` present and descriptive
- [ ] `<meta name="viewport">` set for mobile responsiveness
- [ ] Open Graph tags present (optional for social sharing)

#### Links

- [ ] All internal links work (no 404s)
- [ ] Navigation links scroll to correct sections
- [ ] No broken images
- [ ] `/privacy` page accessible and linked

### Build & Deployment

#### Local Build

- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes (no ESLint errors)
- [ ] `npm run dev` starts dev server successfully
- [ ] No TypeScript errors (`tsc --noEmit`)

#### Production Build

- [ ] Build artifact size is reasonable (< 1MB JavaScript)
- [ ] No console errors in production build
- [ ] Environment variables required for production are documented

#### Vercel Deployment

- [ ] Code pushed to GitHub
- [ ] Vercel deployment succeeds
- [ ] Environment variables configured in Vercel dashboard
- [ ] Database migrations run automatically (or manually)
- [ ] Contact form works on Vercel preview URL
- [ ] Email sent successfully from production
- [ ] Form submissions stored in production database

---

## Automated Testing (Optional, Not Phase 1)

### Unit Tests

- Form validation functions (Zod schema)
- Rate limiting logic
- IP hashing function

### Integration Tests

- Contact form submission end-to-end
- Database insertion
- Email sending via Resend or SMTP

### E2E Tests (Cypress/Playwright)

- User fills form and submits
- Success message appears
- Database record created
- Email received

---

## Test Environment Setup

### Local Testing

- Use `.env.local` with test database and test email (Gmail with app password)
- Use Resend free tier API key (100 emails/month)
- Use in-memory rate limiter (no Upstash needed)

### Staging Testing

- Use staging database (separate from production)
- Use staging email recipient (your test email)
- Use Upstash Redis for rate limiting testing
- Use Vercel preview deployment

### Production Testing

- 1-2 test submissions after deployment
- Monitor first 24 hours for errors in logs
- Check email delivery success rate

---

## Known Limitations & Edge Cases

### Edge Cases to Test

- Very long email addresses (254 chars max)
- Unicode/emoji in message
- Repeated newline characters in message
- Multiple form submissions with same email in quick succession
- Browser back button after successful submission
- Form submission while offline → reconnect → resubmit
- Form submission with aggressive adblock/filter enabled
- Zoom in/out at extreme levels (200%+)

### Known Limitations

- No email delivery guarantee (email service downtime possible)
- Rate limiting is per-IP (VPN/shared network will share limit)
- No captcha or advanced anti-spam (honeypot + rate limit only)
- No email verification (form accepts any email format)
- No two-factor authentication
- Single admin email (no team inbox)
