# UnTrap (untrap.io)

> Enterprise-grade digital subscription cancellation bypass platform, dark pattern registry, and client-side statutory legal notice engine.

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel Edge Ready](https://img.shields.io/badge/Vercel-Edge%20Ready-000000?logo=vercel)](https://vercel.com/)
[![Client-Side Privacy](https://img.shields.io/badge/Privacy-100%25%20Zero--Telemetry-emerald)](https://untrap.io/)

---

## 1. Architectural Overview

UnTrap addresses the systematic friction engineered into modern subscription cancellation flows ('dark patterns').
The platform combines three core engines:

1. **Direct Bypass Directory**: Curated directory of 50+ enterprise services (Streaming, Gyms, SaaS, Cloud, News Media) with verified deep-links that skip surveys, pause offers, and retention labyrinths.
2. **Programmatic SEO Engine**: Automated static page generation (`/cancel/[slug]`) with rich Schema.org (`HowTo` and `FAQPage`) microdata and dynamic XML sitemaps optimized for search engines and AI answer engines (GPTBot, ClaudeBot, PerplexityBot).
3. **Client-Side Legal Notice Generator**: In-browser document compiler using `jspdf` that renders statutory cancellation demand letters citing California Automatic Renewal Law (CARL, Cal. Bus. & Prof. Code § 17600), ROSCA (15 U.S.C. § 8401), and the FTC Negative Option Rule (16 CFR Part 425) with **100% zero-server telemetry**.

---

## 2. Directory Tree Blueprint

```
/untrap
├── /public
│   ├── /logos
│   └── /icons
├── /src
│   ├── /app
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── /cancel
│   │   │   ├── page.tsx
│   │   │   └── /[slug]
│   │   │       └── page.tsx
│   │   ├── /generator
│   │   │   └── page.tsx
│   │   ├── /report-pattern
│   │   │   └── page.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── /components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── SearchBar.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── DirectCancelButton.tsx
│   │   ├── DarkPatternFlowVisualizer.tsx
│   │   ├── LegalDemandGenerator.tsx
│   │   └── VirtualCardAffiliateBanner.tsx
│   ├── /data
│   │   └── services.json
│   ├── /lib
│   │   ├── legal-templates.ts
│   │   └── types.ts
│   └── /styles
│       └── globals.css
├── vercel.json
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── CHANGELOG.md
└── README.md
```

---

## 3. Local Development Setup

### Prerequisites
- Node.js 18.18+ or 20+
- npm 9+ or pnpm / yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/untrap/untrap.git
cd untrap

# Install pinned dependencies
npm install

# Start development server on localhost:3000
npm run dev
```

### Type Checking & Build Verification
```bash
# Execute strict TypeScript compiler validation
npm run typecheck

# Build optimized static and Edge runtime artifact
npm run build

# Preview production build locally
npm run start
```

---

## 4. Vercel Deployment Instructions

### One-Click Git Deployment
1. Push repository to GitHub/GitLab.
2. In the Vercel Dashboard, select **Add New Project** and import the repository.
3. Framework Preset: **Next.js**.
4. Root Directory: `./` (or `untrap`).
5. Click **Deploy**. Zero configuration required; `vercel.json` provides strict CSP and caching headers automatically.

---

## 5. Legal Defense Framework

The UnTrap legal demand engine cites governing federal and state statutes:
- **California Business and Professions Code §§ 17600–17606 (CARL)**: Strict mandate requiring online cancellation for any agreement accepted online without oral retention friction.
- **Restore Online Shoppers' Confidence Act (ROSCA, 15 U.S.C. §§ 8401–8405)**: Federal prohibition of deceptive negative option features.
- **FTC Negative Option Rule (16 CFR Part 425)**: 'Click-to-Cancel' federal rulemaking requiring equal ease of cancellation as sign-up.
- **Electronic Fund Transfer Act (EFTA, 15 U.S.C. § 1693e) & Reg E (12 CFR § 1005.10(c))**: Unconditional consumer right to revoke recurring debit authorization.

---

## 6. Directory Expansion Guide

To add new services, append records to `/src/data/services.json` adhering to the `ServiceRecord` interface defined in `/src/lib/types.ts`:

```typescript
export interface ServiceRecord {
  id: string;
  name: string;
  slug: string;
  category: 'Streaming' | 'Gyms' | 'SaaS' | 'Cloud' | 'News Media';
  difficultyRating: 1 | 2 | 3 | 4 | 5;
  darkPatternType: 'hidden_button' | 'phone_gate' | 'retention_maze' | 'delay_tactic';
  directBypassUrl: string;
  standardUrl: string;
  bypassSteps: string[];
  retentionOfferWorkaround: string;
  legalStatuteReference: string;
  averageCancellationTimeMinutes: number;
  phoneContactFallback?: string;
  faqs?: Array<{ question: string; answer: string }>;
}
```
All new services automatically compile into static pages at build time via `generateStaticParams()` and get included in `sitemap.ts`.

---

## 7. License
MIT License. Public consumer protection utility.
