# Apex Decorating & Restoration

A responsive, high-performance, tradesman-grade website and admin management system built for **developer.itsmyapp.co.uk** under the UK GDPR, Data (Use and Access) Act (DUAA 2025), and Digital Markets, Competition and Consumers Act (DMCCA) compliance framework.

---

## 🎨 Architectural Overview

- **Framework:** Next.js 14 (App Router, Server & Client Components)
- **Styling:** Tailwind CSS with bespoke trade color system (`brand`, `trade-slate`, `trade-navy`, `trade-gold`)
- **Type Safety:** Strict TypeScript (zero implicit `any`, zero placeholders)
- **Content Management:** Dual-layer Outstatic CMS Git integration paired with a PIN-protected `/admin` client portal.
- **Client-Side Media Optimization:** HTML5 canvas compression for direct mobile & desktop photo uploads.
- **Compliance Overlay:** Equal prominence cookie consent layer, Zero Telemetry / Zero Surveillance architecture, full compliance documentation.

---

## 🚀 Key Routes & Features

### 1. Public Routes
- **`/` (Homepage & Showcase):**
  - High-converting hero headline with location coverage badge and click-to-call / WhatsApp direct links.
  - Interactive **Before & After Comparison Slider** with touch/mouse dragging and keyboard accessibility.
  - Core Services Grid: *Interior Decorating*, *Exterior Masonry & Silicate Systems*, *Sash Window Care & Bio-Resin Restoration*, *Wallpapering*, *Woodwork & Kitchen Spray Refinishing*, *Commercial Refits*.
  - Filterable Project Gallery with active before/after switches.
  - Verified 5-Star Testimonial carousel and cards.
  - Direct Quote Estimator & Inquiry form with photo upload attachment.
- **`/projects`:** Dedicated searchable and filterable portfolio with high-resolution responsive images.
- **`/reviews`:** Testimonials feed with verified review source badges (Facebook, Direct Quote, Google) and direct client submission modal.
- **`/contact`:** Direct contact channels, workshop address, coverage towns, and emergency timber rot / water damage assessment alerts.

### 2. Compliance Routes (COMPLIANCE MD Standard)
- **`/terms`:** Trade terms of service, quote validity (30 days), property access, paint specifications, 24-month craftsmanship warranty, and liability terms.
- **`/privacy`:** UK GDPR & DUAA certified privacy notice with principle of data minimization, lawful basis, Subject Access Request (SAR) procedures (30-day SLA), and the mandatory **Public Transparency Callout**.
- **`/cookies`:** Strictly necessary cookies and first-party local storage documentation with DUAA statutory exemptions.
- **`/accessibility`:** WCAG 2.1 Level AA statement, keyboard shortcuts, focus rings, and contrast assurances.

### 3. Dedicated Client Portal
- **`/admin`:**
  - **PIN Security Barrier:** Numeric PIN gate (default: `1234` or configured via `NEXT_PUBLIC_ADMIN_PIN`) with session persistence in `sessionStorage`.
  - **Project Uploader:** Title, category, location, before & after photos with automated client-side canvas compression, scope highlights, and homepage feature toggle.
  - **Testimonial Creator:** Add client reviews, star rating, project type, and verification source.
  - **Active Record Manager:** Delete, toggle featured status, or reset to seed defaults.

---

## 🔒 Mandatory Governance & Transparency
- **`INTERNAL_GOVERNANCE.md`**:
  - **LOG A:** Statutory Data Protection Officer (DPO) Need Assessment (confirming no mandatory DPO requirement under UK GDPR Article 37(1)).
  - **LOG B:** Voluntary Data Privacy Lead Formal Appointment mapped to `hello@itsmyapp.co.uk`.
- **Public Transparency Callout**:
  > **Data Privacy & Compliance Queries:**
  > For any questions regarding your data rights, or to submit an inquiry, please contact our Data Privacy Lead directly at [hello@itsmyapp.co.uk](mailto:hello@itsmyapp.co.uk). We formally acknowledge all compliance submissions within 30 days.

---

## 🛠️ Local Development & Deployment

### Run Locally:
```bash
npm install
npm run dev
# Open http://localhost:3000
# Admin portal: http://localhost:3000/admin (Default PIN: 1234)
```

### Production Build:
```bash
npm run build
npm run start
```

### Deploy to Vercel:
Connect the GitHub repository to Vercel. Set the following environment variables if enabling GitHub Outstatic sync:
```env
OST_GITHUB_ID=your_github_oauth_client_id
OST_GITHUB_SECRET=your_github_oauth_client_secret
OST_REPO_SLUG=your-org/apex-decorating-restoration
OST_REPO_BRANCH=main
NEXT_PUBLIC_ADMIN_PIN=1234
```
