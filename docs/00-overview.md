# Project Overview: MR X Studio Portfolio Landing Page

## Project Intent

Build a single-page landing page portfolio for "MR X Studio" (an AI Systems Architect & Full-Stack Developer) with the ONLY business function being a working contact form to collect project inquiries.

## Strict Scope

- **In Scope**: Landing page matching the reference screenshot exactly, functional contact form with email notification, basic spam protection, privacy policy page
- **Out of Scope**: Blog, authentication, dashboards, payments, chatbots, newsletters, analytics, multiple portfolio projects, testimonials, case studies, downloadable CV

## What is Explicitly Excluded

- Any third-party analytics tools
- Authentication system
- Admin dashboard
- CMS or content management
- Newsletter signup (other than contact form)
- Chat widgets or real-time communication
- Multiple language support
- Advanced SEO features beyond basics (meta tags, sitemap, robots.txt for deployment)
- Payment integration
- User profiles or authentication

## Reference Design

- Dark, premium UI with teal/cyan accent color (#00D9FF or similar)
- Professional headshot image of Mr X
- Hero section with headline and CTA buttons
- Skill/service cards in grid layout
- Statistics section
- Contact form at bottom

## Success Criteria

1. Landing page layout matches screenshot pixel-perfectly (layout, spacing, hierarchy)
2. Contact form fully functional: validates, stores to database, sends email
3. All copy matches screenshot wording (sections, headings, descriptions)
4. Clean, production-ready code with TypeScript + linting
5. Security basics: honeypot, rate limiting, server-side validation
6. No broken links or 404s (except intentionally excluded pages)
7. Fast load time (Next.js optimization)
8. Accessibility standards met (WCAG basics)
