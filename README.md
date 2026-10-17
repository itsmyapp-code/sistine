# Sistine Professional Decorators — Dartmouth, Devon

A responsive, high-performance, tradesman-grade website and custom content management admin portal built for **Sistine Professional Decorators** (`sistine.itsmyapp.co.uk`) serving Dartmouth and the wider South Hams.

---

## 🎨 Architectural Overview

- **Framework:** Next.js 14 (App Router, React 18, Server & Client Components)
- **Styling:** Vanilla CSS & Tailwind CSS with bespoke coastal trade palette (`amber`, `slate`, `warm neutral #faf9f5`)
- **Typography:** Google Fonts (`Playfair Display` serif headlines + `Inter` sans-serif copy)
- **Data & Content Management:** Hybrid architecture pairing client-side local storage with automatic GitHub API backend sync (`src/data/projects.json`, `src/data/heroSlides.json`, `src/data/testimonials.json`)
- **Admin Security:** PIN-protected `/admin` management portal with session storage authentication
- **Image Optimization:** In-browser Canvas JPEG compression for fast mobile & desktop photo uploads
- **Interactive Showcases:** Ken Burns Hero Carousel, Touch-enabled Split-Screen Before & After Slider, and high-resolution Photo Gallery Modal with Zoom & Pan controls

---

## 🌐 Site Map & Page Breakdown

### 1. Public Pages
- **`/` (Home Page):**
  - Full-width Ken Burns auto-advancing hero carousel showcasing Dartmouth projects.
  - Headline: **"Welcome to Sistine Professional Decorators"** with Tagline: **"Decorate • Restore • Refurbish"**.
  - Localized Dartmouth and South Hams introductory narrative and story.
  - Core Service Showcase cards: *Interior Painting & Decorating* and *Exterior Painting & Facades*.
  - Call to Action with click-to-call direct dialling and message link.
  - Local Business JSON-LD Schema for Dartmouth SEO.
- **`/projects` (Portfolio & Work Gallery):**
  - Category filter tabs (*All, Interior, Exterior*).
  - Responsive project grid displaying cover images, photo counts, location, description, and **Decorating Suppliers & Paints Used** badges.
  - Interactive **Project Gallery Modal** featuring multi-image carousel, pinch/click zoom (up to 300%), pan navigation, and optional Before/After split comparison.
- **`/reviews` (Client Testimonials & Feedback):**
  - 5-Star verified client reviews with source tags (Facebook, Direct Quote, Google).
  - Interactive **"Leave a Review"** submission modal with instant client feedback and pending moderation workflow.
- **`/contact` (Inquiries & Estimates):**
  - Direct telephone, WhatsApp, and email links.
  - Service coverage breakdown for Dartmouth, Kingswear, Totnes, and South Hams.
  - Interactive estimate inquiry form.

### 2. Legal & Governance Pages
- **`/terms`:** Trade terms of service, quotation validity, property access, paint specifications, warranty, and liability terms.
- **`/privacy`:** UK GDPR and Data (Use and Access) Act (DUAA 2025) compliant privacy notice with 30-day SAR SLA.
- **`/cookies`:** Cookie Policy outlining strictly necessary cookies and local storage usage with statutory exemptions.
- **`/accessibility`:** WCAG 2.1 Level AA accessibility statement, keyboard navigation, focus rings, and contrast assurances.

---

## 🛠️ How the Admin Portal Works (`/admin`)

The Admin Portal is accessed at `/admin` (Default PIN: `1234`).

### 1. Job Galleries & Projects Tab
- **Add New Job / Edit Job:**
  - **Title, Category & Location:** Select between *Interior* and *Exterior*.
  - **Paint Manufacturers & Decorating Suppliers:** Interactive checklist populated with quality UK paint brands (*Dulux Trade, Farrow & Ball, Little Greene, Johnstone's Trade, Crown Trade, Zinsser, Mylands, Paint & Paper Library, Benjamin Moore, Tikkurila, Leyland Trade, Bedec, Sadolin, Sikkens, Osmo, Hammerite*), plus custom brand input. Only selected brands are displayed on public cards.
  - **Multi-Photo Uploads:** Upload multiple high-resolution photos at once; images are compressed in-browser for optimal page load speed.
  - **Cover Photo Selection:** Click **Set as Cover** on any photo to designate the primary showcase image.
  - **Before & After Slider:** Optionally assign both a Before and After photo to activate the interactive split-screen comparison slider.
  - **Active Job Management:** Click **Edit** on any job to modify details/suppliers, or **Delete** to remove.

### 2. Hero Carousel Slides Tab
- **Homepage Showcase Manager:** Add, preview, or remove the full-width slides displayed at the top of the homepage.
- **Slide Reordering:** Use **▲ Move Up** and **▼ Move Down** buttons to change slide sequence.

### 3. Client Reviews Tab
- **Review Moderation:** Public submissions arrive with a **Pending** status. Click **Approve** to publish them live.
- **Direct Review Entry:** Add reviews received verbally, via text message, or email.

### 4. Global Live Publishing (`Update the Website`)
- Clicking the dark **Update the Website** button pushes all current projects, hero slides, and reviews to the GitHub repository (`itsmyapp-code/sistine`) via the GitHub REST API (`/api/cms`), automatically triggering production deployment across all devices.

---

## 💻 Local Development & Deployment

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Open http://localhost:3000

# Build for production
npm run build
npm run start
```
