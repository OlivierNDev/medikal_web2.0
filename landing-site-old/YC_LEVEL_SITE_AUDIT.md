# YC-Level Site Audit & Restructuring Plan  
## Medikal Africa – Investor-Ready Website

**Date:** 2024  
**Status:** Working system (integration-ready)  
**Goal:** Minimalist, professional, investor-ready site

***

## 1. Executive Summary

- Current footprint: ~29 HTML pages – far too many for a pre–Series A / YC-stage startup.  
- Target footprint: **5–7 core pages** optimized for clarity, conversion, and credibility.  
- Strategy: Remove premature/technical pages, consolidate content, and rewrite the homepage around:  
  1) Problem → 2) Solution → 3) Traction → 4) Team → 5) Single clear CTA ("Request demo").

***

## 2. Final Information Architecture

### 2.1 Pages to KEEP (5 core)

1. **Homepage – `index.html`**  
   Role: Primary narrative + conversion entry point.

2. **Solutions – `solutions.html`**  
   Role: Product deep dive (for serious buyers/investors).

3. **Request Demo – `early-access.html` → rename to `request-demo.html`**  
   Role: Main lead capture page.

4. **News – `news/index.html`**  
   Role: Central hub for press, recognitions, partnerships.

5. **Contact – `contact.html`**  
   Role: Secondary, general contact channel.

### 2.2 Pages to MERGE / CONSOLIDATE

**Merge these into existing pages instead of separate URLs:**

- `features.html` → Merge into **`solutions.html`** (as "Product capabilities" section).  
- `ai-diagnostics.html` → Merge into **`solutions.html`** (as "AI Diagnostics" module).  
- `amr-surveillance.html` → Merge into **`solutions.html`** (as "AMR Surveillance" module).  
- `about.html` → Pull the essential story into the **homepage** ("Team & mission" section).  
- `team.html` → Convert to a short **team block** on homepage or optional **About** page.  
- `impact.html` → Move numbers/metrics into **homepage "Impact"** section.

**Optional page:**  
6. **About – `about.html`**  
Only if you really need a dedicated investor/team page. Otherwise, keep this content on the homepage.

### 2.3 Pages to REMOVE (19+)

Remove or unpublish these from navigation and public IA (keep internally if needed):

- Product/feature overkill:  
  - `patient-portal.html` (too specific, not core to investor story)  
  - `clinical-guidelines.html`  
  - `amr-data.html`  

- Technical / premature resources:  
  - `api.html`  
  - `documentation.html`  
  - `training-materials.html`  
  - `help-center.html`  
  - `download.html`  
  - `regulatory-data-governance.html`  

- Redundant / fragmented news items:  
  - `news/nvidia-inception-program.html`  
  - `news/youth-digital-health-champion.html`  
  - `news/onpod-tv-interview.html`  
  - `news/zerox-amr-partnership.html`  
  - `news/cbot-robolabs-partnership.html`  
  - `news/outbreak-news-interview.html`  

- Misc duplicates (any extra "impact", "about", "features" variants).

**Redirect rule:**  
- Add **301 redirects** from these URLs to the closest relevant page (usually `/`, `/solutions`, or `/news`).  

***

## 3. Navigation: Before vs After

### 3.1 Current (too complex)

```text
Home | Solutions ▼ | Features | Resources ▼ | Team | Impact | News | Contact | Get Started
     ├─ AI Diagnostics          ├─ Documentation
     ├─ AMR Surveillance        ├─ API
     └─ Patient Portal          ├─ Clinical Guidelines
                                ├─ AMR Data
                                └─ Training Materials
```

### 3.2 Recommended (YC-level) ✅ IMPLEMENTED

```text
Home | Solutions | News | About | Contact | [Request Demo]
```

- No dropdowns.  
- One visually distinct **primary CTA**: "Request Demo".  
- On mobile, use the exact same simplified structure in the menu.

***

## 4. Page-by-Page Content Plan

### 4.1 Homepage (`index.html`) ✅ RESTRUCTURED

**Primary goal:** Convert visitors to **Request Demo** while telling a concise investor-grade story.

**Implemented sections (in order):**

1. **Hero** ✅
   - One-line value prop: "AI clinical intelligence to cut antibiotic misuse in African hospitals"
   - 1–2 line subheading explaining how (unified data + AI)
   - Primary CTA: "Request Demo"
   - Secondary CTA: "View Solutions" (text link)
   - ICP badge: "For: Hospitals, Ministries of Health, NGOs in Africa"
   - Metrics: 94-95% accuracy, 70% AMR reduction, 500+ hospitals, 2M+ lives

2. **Backed & Recognized** ✅
   - Logos: NVIDIA Inception, Africa CDC Youth Network, ONPOD TV

3. **Problem** ✅
   - 3 short bullets on AMR + data fragmentation
   - Data Fragmentation, Slow Stewardship, Manual Reporting

4. **Solution (High-level)** ✅
   - 3 cards for core modules:
     - Clinical Intelligence Layer
     - AI Stewardship Assistant
     - AMR Surveillance & Reporting
   - Each: 1–2 sentence description + key outcome bullet

5. **Impact / Metrics** ✅
   - 4 big numbers: 94-95% accuracy, 70% AMR reduction, 500+ hospitals, 2M+ lives

6. **Who It's For** ✅
   - 3 buyer segments:
     - Hospitals & Health Systems
     - Ministries & Public Health Agencies
     - NGOs & Health Partners
   - For each: main pain + what Medikal does

7. **Team & Mission** ✅
   - Founders: Olivier Niyonshima, Tresor Yubahwe
   - 1 short mission paragraph
   - Link to About page

8. **Partners** ✅
   - Logo carousel (simplified)

9. **Final CTA** ✅
   - "Ready to see Medikal for your hospital or program?"
   - Button: "Request Demo"

10. **News** ✅
    - Link to news page (carousel on homepage)

### 4.2 Solutions (`solutions.html`) ⏳ TODO

**Goal:** For people who care enough to go deeper (buyers, some investors, technical champions) – still simple and outcome-driven.

**Sections to implement:**

1. **Overview**  
   - Short intro, re-stating Medikal as a unified platform for AMR and antibiotic stewardship.

2. **Modules / Capabilities**  
   - Clinical Intelligence Layer  
   - AI Stewardship Assistant  
   - AMR Surveillance & Reporting  
   - Optional: Imaging / other clinical modules  
   - Optional: Multilingual support / local languages

3. **How it works**  
   - Simple 3-step workflow, e.g.:  
     1. Integrate data (labs, EHR, pharmacy).  
     2. Run AI clinical intelligence and stewardship rules.  
     3. Deliver insights to clinicians and ministries.

4. **Integrations & Technical Readiness (light)**  
   - High-level statements:  
     - Works with existing hospital systems  
     - Cloud/on-prem options  
     - Data security & compliance (1–2 bullets)  
   - No full API documentation or schema.

5. **Call to Action**  
   - End with "Request Demo".

**What not to put here:**

- Full documentation, all endpoints, integration diagrams.  
- Internal training or clinical guideline PDFs (link privately instead if needed).

### 4.3 Request Demo (`early-access.html`) ⏳ TODO

**Goal:** Maximize form completion.

**Form fields (ideal):**

- Name  
- Organization  
- Role / Title  
- Work email  
- Country  
- Message (optional short free text)

**Page content:**

- One short line restating value prop.  
- 3 points on what they get from a demo (e.g., "see dashboards, discuss integration path, get pilot plan").  
- Repeat core trust signals (logos).

**Avoid:**

- Long qualifying questionnaires.  
- Multi-step or wizard-style forms.

### 4.4 News (`news/index.html`) ⏳ TODO

**Goal:** Show traction and recognition without fragmenting into many pages.

**Layout:**

- Cards or tiles for each major item:  
  - NVIDIA Inception  
  - Africa CDC Youth Digital Health recognition  
  - ONPOD TV interview  
  - Key partnerships (labs, hospitals, NGOs)  
- Each card: title, 1–2 line summary, date, link (external or PDF if needed).

**Consolidation:**

- Remove individual HTML pages for each item.  
- If SEO is important, keep their content as sections on this single page rather than separate URLs.

### 4.5 Contact (`contact.html`)

**Goal:** Simple, credible backup to the Request Demo page.

- Short form (Name, Email, Subject, Message).  
- Display business email, and optionally phone and location.  
- Clarify use-cases: "Partnerships, media, general inquiries".

### 4.6 Optional About (`about.html`)

Use this only if:

- Investors want a direct "team" link, or  
- You need a URL to share for team background.

Content:

- 2–3 founder bios (with photos) + 1–3 key advisors.  
- One short paragraph on mission and vision.  
- Link back to "Request Demo".

***

## 5. Implementation Plan (Refined)

### Phase 1 – IA & Navigation ✅ COMPLETED

1. ✅ Simplified the top navigation to:  
   `Home | Solutions | News | About | Contact | [Request Demo]`  
2. ✅ Removed dropdowns.  
3. ✅ Updated mobile menu to mirror this structure.

### Phase 2 – Page Cleanup & Redirects ✅ COMPLETED

1. ✅ Created `.htaccess` with 301 redirects for removed pages
2. ⏳ Remove the 19+ non-core pages from nav and sitemap (files still exist, redirects in place)
3. ⏳ Update all internal links (buttons, footers, old blog references)

### Phase 3 – Content Rewrite ✅ PARTIALLY COMPLETED

1. ✅ Rewrote homepage with the new structure and tighter copy
2. ⏳ Restructure `solutions.html` into clear modules
3. ⏳ Simplify and re-style `request-demo.html`
4. ✅ Created "Impact / Metrics" section on homepage

### Phase 4 – Visual & UX Polish ⏳ TODO

1. ⏳ Standardize typography and spacing (consistent heading sizes, enough white space)
2. ⏳ Introduce a clear CTA style and color (same button style everywhere)
3. ⏳ Add a few product visuals (dashboard mockups, AMR map, clinician view)
4. ⏳ Optimize for mobile: font sizes, spacing, and button tap areas

***

## 6. Investor-Ready Checklist (Improved)

**Must be clearly visible across homepage + solutions + demo page:**

- ✅ Problem: AMR + data fragmentation in African hospitals
- ✅ Solution: Unified AI clinical intelligence platform
- ✅ Traction/metrics: accuracy, target hospitals/population, AMR reduction goal
- ✅ Social proof: top recognitions and partners
- ✅ Team: founders + credibility
- ✅ Single clear CTA: "Request Demo" (in hero, nav, and bottom of pages)
- ✅ Easy contact: email, form, basic location

**What to deliberately exclude or hide for now:**

- Full API docs and developer resources
- Detailed regulatory governance documents
- Help center, training libraries, end-user support structure
- Long-form essays on mission or AMR epidemiology

***

## 7. Implementation Status

### ✅ Completed:
- Navigation simplification (desktop + mobile)
- Homepage restructuring (YC-level structure)
- Redirects configuration (.htaccess)
- Team & Mission section on homepage
- Impact/Metrics section
- Who It's For section
- Final CTA section

### ⏳ In Progress / TODO:
- Consolidate Solutions page (merge features, AI diagnostics, AMR surveillance)
- Simplify Request Demo page
- Consolidate News page (merge all articles)
- Update sitemap.xml
- Remove actual page files (after redirects tested)
- Visual polish and mobile optimization

***

**Last Updated:** 2024  
**Status:** Phase 1-2 Complete, Phase 3 In Progress
