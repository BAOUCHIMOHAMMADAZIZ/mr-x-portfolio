# UI Design Specification

## Design Tokens

### Color Palette

- **Background**: `#0a0a0a` or `#111111` (near-black, dark)
- **Text Primary**: `#ffffff` or `#f5f5f5` (white/near-white)
- **Text Secondary**: `#a0a0a0` or `#999999` (light gray)
- **Accent (Primary)**: `#00d9ff` or `#0dd9e8` (teal/cyan, used for CTAs and highlights)
- **Accent (Secondary)**: `#1f2937` or `#2a2a3e` (dark gray for cards/sections)
- **Border**: `#333333` or `#404040` (subtle borders)
- **Success**: `#10b981` (green for success messages)
- **Error**: `#ef4444` (red for error messages)

### Typography Scale

- **H1 (Hero Headline)**
  - Font: 4rem - 5.5rem (responsive)
  - Weight: 700 bold
  - Line-height: 1.2
  - Color: White, with "Intelligent" in cyan
  - Example: "Architecting [Intelligent] Systems"

- **H2 (Section Titles)**
  - Font: 2.5rem - 3rem
  - Weight: 700 bold
  - Line-height: 1.3
  - Color: White
  - Example: "Technological Arsenal", "What I Offer"

- **H3 (Card Titles)**
  - Font: 1.25rem - 1.5rem
  - Weight: 600 semi-bold
  - Color: White

- **Body Text**
  - Font: 1rem (16px)
  - Weight: 400 normal
  - Line-height: 1.6
  - Color: Light gray (#a0a0a0 or similar)

- **Body Small**
  - Font: 0.875rem (14px)
  - Weight: 400 normal
  - Line-height: 1.6
  - Color: Light gray

- **Label (Form labels)**
  - Font: 0.875rem
  - Weight: 500 medium
  - Color: Light gray
  - Text-transform: Capitalize

### Spacing Scale

- **xs**: 0.5rem (8px)
- **sm**: 1rem (16px)
- **md**: 1.5rem (24px)
- **lg**: 2rem (32px)
- **xl**: 3rem (48px)
- **2xl**: 4rem (64px)
- **3xl**: 6rem (96px)

### Border Radius

- **sm**: 0.375rem (6px)
- **md**: 0.5rem (8px)
- **lg**: 0.75rem (12px)
- **xl**: 1rem (16px)
- **2xl**: 1.5rem (24px)

### Shadows

- **sm**: `0 1px 2px 0 rgb(0 0 0 / 0.05)`
- **md**: `0 4px 6px -1px rgb(0 0 0 / 0.1)`
- **lg**: `0 10px 15px -3px rgb(0 0 0 / 0.1)`

---

## Component Inventory

### 1. **Navigation/Header**

- **Component**: `Navbar`
- **Props**: Current section (optional for highlighting)
- **Features**:
  - Fixed or sticky positioning (top: 0)
  - Logo/brand name on left
  - Navigation links: About, Tech Stack, Services, Get in Touch
  - Links scroll to sections (#about, #tech-stack, #services, #contact)
  - Mobile hamburger menu (optional, if responsive)
  - Background: semi-transparent dark with slight backdrop blur or solid dark
  - Spacing: padding 1rem vertically, 2rem horizontally

### 2. **Hero Section**

- **Component**: `Hero`
- **Structure**: 2-column flex layout (left text, right image)
- **Left Column**:
  - Main headline (H1)
    - Split "Intelligent" into teal color using `<span className="text-cyan-400">`
  - Subheading (Body text)
  - Two buttons side-by-side:
    - Primary: "Start a Project" (cyan background, white text, rounded)
    - Secondary: "View Services" (outlined, cyan border, transparent bg)
  - Responsive: Stack to single column on mobile

- **Right Column**:
  - Profile card (rounded border, subtle background)
    - Image: centered, rounded (profile photo of Mr X)
    - Name: "Mr X" (h3 size)
    - Location: "Based in San Francisco" (body small, gray)
  - Responsive: Move below text on mobile

### 3. **Card Component** (Generic)

- **Props**: icon, title, description, features (array of strings)
- **Layout**:
  - Padding: 1.5rem - 2rem
  - Background: `#1f2937` or slightly lighter dark
  - Border: 1px solid `#333333` (subtle)
  - Border-radius: 0.75rem - 1rem
  - Hover effect: slight background change or shadow lift
- **Content**:
  - Icon at top (32x32 or 40x40)
  - Title below icon (h3)
  - Description text (body)
  - Optional: bullet points for features

### 4. **Tech Arsenal Cards**

- **Component**: `TechCard`
- **Extends**: Card component
- **Grid**: 2x2 grid (4 cards total)
- **Responsive**: 1x4 on mobile, 2x2 on tablet/desktop
- **Card Content**:
  - Icon (tech-related symbol)
  - Title (Frontend, AI Engineering, etc.)
  - Tech list (comma-separated or inline text)

### 5. **Service Cards**

- **Component**: `ServiceCard`
- **Extends**: Card component
- **Grid**: 1x2 grid (2 cards total), centered
- **Max Width**: Constrained to 4xl for better proportions
- **Responsive**: 1 column on mobile, 2 columns on desktop
- **Card Content**:
  - Large icon (5xl-6xl)
  - Title (2xl-3xl)
  - Description
  - Feature list with cyan checkmarks
  - Animated glow on hover
- **Styling**:
  - Gradient background: slate-900 → gray-900 → black
  - Cyan accent borders and highlights
  - Smooth hover transitions with scale/shadow effects
  - Feature separator line above list

### 6. **Stats Section**

- **Component**: `StatsBar`
- **Layout**: 4 equal-width columns, flexbox
- **Responsive**: 2x2 grid on mobile, 1x4 on desktop
- **Stat Item**:
  - Large number (e.g., "5+") in cyan or white
  - Label below (e.g., "YEARS EXP.") in small text, gray
  - No card styling, just text centered

### 7. **Contact Form**

- **Component**: `ContactForm`
- **Fields**:
  - Email Address (input, type=email, required)
  - Project Details (textarea, required)
  - Honeypot field (input, type=text, hidden, name="website" or "phone")
  - Submit button (disabled if form invalid or submitting)

- **Styling**:
  - Input/textarea background: dark, slightly lighter than page
  - Border: 1px `#404040`
  - Focus ring: cyan/teal border
  - Padding: 0.75rem - 1rem
  - Border-radius: 0.5rem
  - Label: above each input, small, gray
  - Error message: red text below field (if validation fails)
  - Success message: green background, centered, visible after submit
  - Button: cyan background, white text, hover effect, cursor: pointer

### 8. **Footer**

- **Component**: `Footer`
- **Content**:
  - Social links (GitHub, LinkedIn, Twitter icons)
  - Copyright: "© 2024 MR X. All rights reserved."
  - Links to /privacy, /terms (if exists)
  - Spacing: padding 2rem top/bottom, gray text
  - Alignment: centered or left-aligned with flex wrapping

---

## Typography Rules

- Use system fonts or load from font service (e.g., Google Fonts: Inter, JetBrains Mono)
- Ensure WCAG AA contrast: white on dark bg, light gray on dark bg
- Line-height ≥ 1.5 for body text (readability)
- No decoration on body text unless necessary

## Component Spacing & Layout Rules

1. **Section Spacing**: 3rem - 4rem vertical space between sections
2. **Card Gaps**: 1.5rem - 2rem between cards in grids
3. **Form Spacing**: 1rem vertical gap between form fields
4. **Hero Padding**: 3rem - 4rem on left/right on desktop, 1.5rem on mobile
5. **Max Content Width**: 1200px or 1280px (center on large screens)

## Responsive Design

- **Mobile (< 768px)**:
  - Single column layout
  - Full-width cards
  - Reduced padding (1.5rem)
  - H1: 2.5rem
  - H2: 1.75rem

- **Tablet (768px - 1024px)**:
  - 2-column grid for tech cards
  - 2x2 card alt-row stagger (optional)
  - Medium padding (2rem)

- **Desktop (> 1024px)**:
  - Full layout as designed
  - Max content width 1200px-1280px
  - Full spacing

## Visual Hierarchy

1. **Hero headline** (largest, brightest) → draws eye first
2. **Section titles** (large, white) → secondary focus
3. **Card titles & descriptions** → tertiary
4. **Body text & labels** → supporting info
5. **Form labels & helper text** → minimal visual weight

## Animation/Motion (Optional, Minimal)

- Smooth scroll behavior for anchor links (browser default or CSS)
- Button hover state: slight shadow or background shift
- Input focus: cyan border glow (subtle)
- Form success: fade-in message
- Avoid heavy animations that impact accessibility or performance

---

## Dark Mode Only

- This design is dark-mode only; no light mode variant required
- All colors are chosen to ensure contrast on dark backgrounds

## Accessibility Notes

- Color should not be the only indicator (e.g., use icons + labels)
- Focus states on all interactive elements (buttons, inputs, links)
- Form labels associated with inputs (for="inputId")
- Error messages announced to screen readers
- No auto-playing media or animations
- Keyboard navigation fully functional
