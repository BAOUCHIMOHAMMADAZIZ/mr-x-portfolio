# Information Architecture & Navigation

## Page Structure

### Single Landing Page (/)

All content is on one scrollable page with anchor navigation.

### Section Anchors

- `#about` → About/Bio section (or directly hero)
- `#tech-stack` → Technological Arsenal section
- `#services` → What I Offer section
- `#contact` → Contact form section (footer area)

### Additional Pages

- `/` — Landing page (primary single page)
- `/privacy` — Privacy policy (required for GDPR/contact data handling)

## Header / Navigation

### Top Navigation Bar

- Logo / Branding: "MR X" (left)
- Links: About | Tech Stack | Services | Get in Touch (right)
- Get in Touch → scrolls to #contact or navigates to contact section
- Sticky or normal (match screenshot behavior)
- Mobile: hamburger menu collapsing to mobile-friendly nav (if needed for small screens)

### Navigation Behavior

- Clicking "Get in Touch" scrolls to contact form
- Other nav links scroll to corresponding sections
- Links highlight current section (optional but nice-to-have)

## Page Sections (Top to Bottom)

### 1. Header/Navigation

- Fixed or sticky top
- Logo on left, nav links on right

### 2. Hero Section (#about)

- **Left Column**:
  - Main headline: "Architecting Intelligent Systems"
  - Subheading color: "Intelligent" in teal/cyan
  - Description text: "AI Systems Architect & Full-Stack Developer bridging the gap between cutting-edge artificial intelligence and scalable business automation."
  - **CTA Buttons**:
    - "Start a Project" (primary, cyan) → scrolls to #contact
    - "View Services" (secondary, outlined) → scrolls to #services

- **Right Column**:
  - Profile card containing:
    - Profile image (Mr X headshot)
    - Name: "Mr X"
    - Location: "Based in San Francisco"

### 3. Technological Arsenal Section (#tech-stack)

- **Section Title**: "Technological Arsenal"
- **Subtitle**: "Leveraging the most powerful tools in modern development to build autonomous agents and scalable applications."
- **Grid Layout**: 4 cards in 2x2 grid (responsive: 1 column on mobile)
- **Cards** (each with icon + title + technologies):
  1. **Frontend**
     - Icon: code brackets or similar
     - Tech: React, Next.js, TypeScript, TailwindCSS
  2. **AI Engineering**
     - Icon: brain or neural network
     - Tech: LLMs, OpenAI, LangChain, Vector DBs
  3. **Automation**
     - Icon: cog or automation symbol
     - Tech: Python, Scripting, Cron Jobs
  4. **Backend**
     - Icon: database or server
     - Tech: Node.js, PostgreSQL, Supabase, Redis

### 4. What I Offer Section (#services)

- **Section Title**: "What I Offer"
- **Grid Layout**: 3 cards in 1x3 row (responsive)
- **Card Styling**: Premium gradient backgrounds, cyan accents, smooth hover animations
- **Cards**:
  1. **Business Automation**
     - Description: "Automate repetitive tasks by connecting your favorite apps, building workflow that eliminates manual labor, powered by modern automation tools."
     - Features (with checkmarks):
       - n8n Integrations
       - API Integrations
       - Automated Reporting
  2. **Full-Stack SaaS**
     - Description: "Full-featured, production-ready SaaS applications. From database architecture to responsive design, I build complete solutions."
     - Features (with checkmarks):
       - Next.js Applications
       - API Development
       - Database Architecture

### 5. Stats Bar Section

- **Layout**: 4 equal columns
- **Stats** (copy from screenshot):
  1. "5+" | "YEARS EXP."
  2. "30+" | "AI MODELS TRIED"
  3. "50+" | "PROJECTS SHIPPED"
  4. "100%" | "CLIENT SATISFACTION"

### 6. Contact CTA & Form Section (#contact)

- **Headline**: "Ready to build the future?"
- **Subtext**: "Whether you need to automate a workflow, build an AI agent, or architect a full-stack platform, I'm here to help you scale."
- **Form**:
  - Email Address (input type=email, required)
  - Project Details (textarea, required)
  - Honeypot field (hidden, name="website" or similar)
  - Submit button: "Send Message"
  - Success message: displays after submission
  - Error message: displays if validation fails

### 7. Footer

- Social links (GitHub, LinkedIn, Twitter) - optional but shown in screenshot
- Copyright line
- Links to /privacy and /terms (if /terms exists)

## Responsive Behavior

- **Desktop**: Full layout as shown in screenshot
- **Tablet**: Cards may stack 2x2, 2x1+1, adjust spacing
- **Mobile**: Single column stack, hamburger nav, form fields full width

## Key Navigation Features

1. Smooth scroll to anchors (#tech-stack, #services, #contact, #about)
2. Primary CTAs ("Start a Project", "Get in Touch") → #contact
3. Secondary CTA ("View Services") → #services
4. Mobile-friendly nav (burger menu if needed)

## No Additional Pages Required

- No blog, portfolio detail pages, or service pages needed
- Contact form is the only interactive business feature
- Privacy policy is static text only
