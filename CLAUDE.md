# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (Turbopack) on localhost:3000
npm run build    # Production build (static export)
npm run lint     # ESLint
```

No test framework is configured. If Turbopack panics ("Next.js package not found"), delete `.next/` and restart.

## Approach
- Read existing files before writing. Don't re-read unless changed.
- Thorough in reasoning, concise in output.
- Skip files over 100KB unless required.
- No sycophantic openers or closing fluff.
- No emojis or em-dashes.
- Do not guess APIs, versions, flags, commit SHAs, or package names. Verify by reading code or docs before asserting.

## Architecture

Single-page marketing site for Karakura Digital (based in Cordoba, Spain; international clients). Next.js 16 + React 19 + Tailwind CSS 4 + Framer Motion. Spanish language throughout.

**Stack:** Next.js 16.2.7, Tailwind v4 (uses `@theme inline` in globals.css, not tailwind.config), Framer Motion 12, Spline 3D (lazy loaded).

**Page flow** (src/app/page.tsx): Navbar, Hero, Interactive3D, LocalImpact, GapComparison, Services, Process, Results, Portfolio, FAQ, ContactCTA, Footer.

**Design system:** Material Design 3 color tokens defined as CSS custom properties in `globals.css` via `@theme inline`. Dark theme only. Two brand colors: orange (#ff7a00 / primary-container) and green (#4edea3 / secondary). Font: Plus Jakarta Sans.

**Utility classes in globals.css:** `.glass-panel`, `.glow-accent`, `.green-glow`, `.text-gradient`, `.text-gradient-primary`, `.bg-grid-pattern`, `.btn-shine`, `.aurora-blob`. Use these instead of recreating the patterns.

**Shared components:**
- `ScrollReveal`, `StaggerContainer`/`StaggerItem` for entrance animations
- `SectionHeader` for consistent section headings (overline, headline, subheadline)
- `GlassCard` for glass-morphism cards with spotlight hover
- `GradientBlob` for ambient background blobs (uses radial-gradient, not CSS blur)
- `VideoBackground` with IntersectionObserver lazy loading

**Performance constraints:** No `backdrop-filter: blur()` or CSS `filter: blur()` on animated elements. Use `radial-gradient` fading to transparent instead. All background animations must use `will-change: transform`, `contain: strict`, and `translate3d` for GPU compositing. Videos and Spline scenes lazy-load via IntersectionObserver.

**Path alias:** `@/*` maps to `./src/*`.

**Domain:** karakuradigital.es (configured in layout.tsx metadata, sitemap.ts, robots.ts).

**Contact:** Email only (two addresses) + WhatsApp. No contact form.
