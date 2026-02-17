# Mobile-First Refactor Guide - Medikal Africa

## Overview
This document outlines the mobile-first refactor to make Medikal Africa's website production-ready with Stripe-level discipline.

## Completed Components

### 1. Shared Components Created
- ✅ `/components/header.html` - Unified header component
- ✅ `/components/footer.html` - Unified footer component  
- ✅ `/components/load-components.js` - Component loader script
- ✅ `/css/mobile-first.css` - Mobile-first stylesheet

### 2. Mobile-First CSS System
- ✅ Base: 390px (mobile-first)
- ✅ Breakpoints: 640px, 768px, 1024px
- ✅ Spacing system: 8px, 16px, 24px, 32px, 48px
- ✅ Typography system: H1 (32px), H2 (24px), H3 (18px), Body (16px), Small (14px)
- ✅ Clean, minimal design (black/white/gray)

## Implementation Steps

### Step 1: Update index.html
1. Add mobile-first CSS link in `<head>`:
   ```html
   <link rel="stylesheet" href="css/mobile-first.css">
   ```

2. Replace header section with:
   ```html
   <div id="header-placeholder"></div>
   ```

3. Replace footer section with:
   ```html
   <div id="footer-placeholder"></div>
   ```

4. Add component loader before closing `</body>`:
   ```html
   <script src="components/load-components.js" defer></script>
   ```

### Step 2: Apply to All Pages
Repeat Step 1 for all HTML pages in `/landing-site/`:
- about.html
- solutions.html
- features.html
- team.html
- impact.html
- contact.html
- early-access.html
- All news pages
- All resource pages

### Step 3: Refactor Hero Sections
For each page with a hero section:

**Mobile (390px+):**
- Padding: 48px 16px (var(--space-5) var(--space-2))
- H1: 32px, left-aligned
- Subtitle: 16px, left-aligned
- CTAs: Full width, stacked vertically
- Remove excessive whitespace

**Desktop (768px+):**
- CTAs: Side-by-side
- Increase font sizes gradually

### Step 4: Standardize Cards
All cards must use:
- Padding: 24px (var(--space-3))
- Border: 1px solid #e5e7eb
- Border-radius: 0 (square)
- Margin-bottom: 24px (var(--space-3))
- No shadows
- Hover: border-color changes to #000000

### Step 5: Fix Video Sections
- Aspect ratio: 16:9 (padding-bottom: 56.25%)
- Max width: 100%
- No decorative overlays
- Clean black background

### Step 6: Mobile Navigation Cleanup
Remove:
- Duplicate "Home" entries
- Icons from mobile nav (keep text only)
- Decorative elements

Keep:
- Clean list: Home, About, Solutions, Features, Impact, Team, News, Contact
- Simple hover states
- Full-width CTA at bottom

### Step 7: Footer Simplification
Mobile (390px+):
- Single column layout
- Smaller typography (14px)
- Tight spacing (16px gaps)
- Essential links only

Desktop (768px+):
- 2-4 column grid
- More links visible

### Step 8: Remove Over-Promising Copy
Search and replace across all pages:
- "70% AMR reduction" → Remove or replace with "Supports antibiotic stewardship"
- "95% AI accuracy" → Remove
- "54 countries" → "Designed for scalable deployment across African health systems"
- "HIPAA compliant" → "Built using internationally recognized data protection standards"
- "Cross-border medical records" → "Built with interoperable architecture"

### Step 9: Performance Optimization
1. Remove unused CSS from inline `<style>` blocks
2. Consolidate duplicate styles
3. Remove redundant scripts
4. Lazy load images/videos
5. Minify CSS/JS for production

## Typography Hierarchy

**Mobile (390px+):**
- H1: 32px, bold, line-height: 1.4
- H2: 24px, semibold, line-height: 1.4
- H3: 18px, semibold, line-height: 1.4
- Body: 16px, normal, line-height: 1.6
- Small: 14px, normal, line-height: 1.6

**Desktop (1024px+):**
- H1: 48px
- H2: 32px
- H3: 20px
- Body: 18px

## Spacing System

Use CSS variables consistently:
- `var(--space-1)` = 8px
- `var(--space-2)` = 16px
- `var(--space-3)` = 24px
- `var(--space-4)` = 32px
- `var(--space-5)` = 48px
- `var(--space-6)` = 64px

## Color System

- Primary: #000000 (black)
- Background: #ffffff (white)
- Text: #000000 (headings), #666666 (body)
- Borders: #e5e7eb (light gray)
- Footer: #000000 (black background, white text)

## Testing Checklist

- [ ] Mobile (390px): All sections readable, no horizontal scroll
- [ ] Tablet (640px): Layout adapts correctly
- [ ] Desktop (768px+): Navigation appears, layout expands
- [ ] All CTAs clickable on mobile (min 44x44px)
- [ ] No duplicate navigation items
- [ ] Consistent spacing throughout
- [ ] Typography hierarchy clear
- [ ] Cards standardized
- [ ] Video renders correctly
- [ ] Footer clean and minimal
- [ ] Lighthouse mobile score: 90+

## Next Steps

After mobile-first refactor is complete:
1. Homepage content rewrite (institutional tone)
2. Remove remaining hype language
3. Final performance audit
4. Cross-browser testing
5. Accessibility audit (WCAG 2.1 AA)
