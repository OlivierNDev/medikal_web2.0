# Medikal Africa Website - PRD

## Project Overview
**Product:** Medikal Africa Website
**Date:** March 2026
**Status:** Active Development (React.js SPA)

## Original Problem Statement
Redesign Medikal Africa website from 27 static HTML pages into a minimalist, technical, data-driven platform presentation site. The site should convey the sophistication of the Medikal AI platform for AMR detection across Africa with creative animations and interactive visualizations.

### Core Design Principles
- **Colors:** #5EC4D5 (primary), #979797 (gray), #000000 (black)
- **Aesthetic:** Minimalist, clinical, technical — not startup marketing
- **Animations:** Coded SVG/Framer Motion visualizations (no stock media)
- **Logo:** Actual MedikalAfrica branded logo + NVIDIA partner logo

## User Personas
1. **Global Health Institutions** — WHO, Africa CDC decision makers
2. **Government Health Ministries** — Policy makers and health system administrators
3. **Research Organizations** — AMR researchers and academics
4. **Hospital Systems** — Clinicians and healthcare administrators
5. **Investors/Partners** — Potential partners and funding organizations

## Tech Stack
- **Frontend:** React.js, React Router, Framer Motion, Recharts
- **Styling:** Vanilla CSS with CSS variables
- **No backend** — frontend-only SPA with hardcoded data

## Page Architecture (7 pages)
1. **Home** (`/`) — Hero, Pipeline Animation, Stats, Features, Partners, CTA
2. **Platform** (`/platform`) — Architecture, Core Systems
3. **How It Works** (`/how-it-works`) — 5-step interactive pipeline walkthrough
4. **AMR** (`/amr`) — Crisis stats, Detection flow, Stewardship
5. **Team** (`/team`) — Founders, Mission, Advisors, Join
6. **Research** (`/research`) — Partners, Collaborations
7. **Request Demo** (`/request-demo`) — Contact form

## What's Been Implemented

### March 2026 — New Pages & Chart Enhancement
- [x] "How It Works" page with 5-step interactive pipeline walkthrough
- [x] SVG animated visualizations for each pipeline step
- [x] Team page with 3 founders, mission section, 3 advisors, join section
- [x] Time-series chart (Recharts) — click country hotspot to see 12-month resistance trends
- [x] Redesigned footer with status bar, social icons, updated links
- [x] Updated navigation with How It Works and Team links
- [x] Mobile navigation updated with all new pages

### January 2026 — Interactive Map & Pipeline Animation
- [x] Multi-scene animated pipeline visualization (Framer Motion)
- [x] Interactive Africa map with 5 country hotspots
- [x] Hover tooltips with detailed AMR data per country
- [x] Neural network visualization
- [x] Live metrics panel
- [x] Site migrated from 27 static HTML pages to React SPA
- [x] Strict 3-color palette, minimalist dark theme for pipeline section
- [x] Partner logos: NVIDIA, Africa CDC, AMR Initiative, RoboLabs
- [x] Responsive design across all pages
- [x] All testing passed (100% frontend)

## Backlog

### P1 (High Priority)
- [ ] Connect AMR visualization to a live data API
- [ ] Expand interactive map with more African countries
- [ ] Add form submission backend (Formspree or similar)

### P2 (Medium Priority)
- [ ] Add Google Analytics tracking
- [ ] Blog/news section
- [ ] Case studies page
- [ ] Cookie consent banner

### P3 (Low Priority)
- [ ] Language switcher (EN/FR)
- [ ] Dark mode toggle
- [ ] Animated 3D globe visualization
- [ ] Video testimonials

## Key Files
- `/app/frontend/src/App.js` — Routes
- `/app/frontend/src/components/Navbar.js` — Navigation
- `/app/frontend/src/components/Footer.js` — Footer
- `/app/frontend/src/components/MedikalPipeline.js` — Pipeline animation + chart
- `/app/frontend/src/pages/Home.js` — Homepage
- `/app/frontend/src/pages/HowItWorks.js` — How It Works page
- `/app/frontend/src/pages/Team.js` — Team page
- `/app/frontend/src/pages/Platform.js` — Platform page
- `/app/frontend/src/pages/AMR.js` — AMR page
- `/app/frontend/src/pages/Research.js` — Research page
- `/app/frontend/src/pages/RequestDemo.js` — Request Demo page
