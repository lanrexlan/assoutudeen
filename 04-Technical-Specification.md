# 04 — Technical Specification

## Recommended stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15+ (App Router), TypeScript** | Fast, SEO-friendly server rendering, excellent image optimisation — which matters a great deal on Nigerian mobile data |
| Styling | **Tailwind CSS + shadcn/ui** | Fast to build, consistent, small output |
| CMS | **Payload CMS 3** (self-hosted, runs inside the Next.js app) | Purpose-built for Next.js, no monthly SaaS fee, full control of your data, good admin UI for non-technical staff |
| Database | **PostgreSQL** (Neon or Supabase free/low tier) | Reliable, generous free tiers |
| Media | **Cloudinary** or **UploadThing** | Automatic WebP/AVIF conversion and resizing; critical for page weight |
| Hosting | **Vercel** (Pro tier when traffic grows) | Zero-config Next.js deploys, global CDN, free SSL, easy subdomain wildcards |
| Payments | **Paystack** primary; Flutterwave as fallback | See below |
| Email (transactional) | **Resend** or **Brevo** | Order receipts, donation receipts, form notifications |
| Email (marketing) | **Brevo** or **MailerLite** | Newsletter; both have workable free tiers |
| Business email | **Zoho Mail** (free for a few users) or Google Workspace | Fixes the current `@gail.com` problem — use `info@assoutudeen.com` |
| Analytics | **Google Analytics 4** + **Vercel Analytics** | Free, sufficient |
| Search Console | Google Search Console | Non-negotiable for SEO |
| Error tracking | Sentry (free tier) | Catches checkout failures you'd otherwise never hear about |

### Why Payload over Sanity or Strapi

Payload runs in the same Next.js process, stores content in your own Postgres database, and
costs nothing beyond hosting. Sanity is excellent but adds a separate service, a query
language (GROQ) your future maintainer must learn, and pricing that scales with usage.
Strapi is a reasonable alternative if your developer already knows it. For a small
foundation that wants to avoid recurring SaaS bills and keep everything in one repository,
Payload is the cleanest fit.

**If you cannot secure an ongoing developer**, reconsider WordPress with WooCommerce. It is
technically inferior but any Nigerian web freelancer can maintain it for ₦20,000. Next.js
without someone who can run `npm install` becomes a stranded asset. Be honest about which
situation you're in.

---

## Subdomain routing in one codebase

Use Next.js middleware to read the request hostname and rewrite to the correct route group:

```
middleware.ts
  ├─ host = assoutudeen.com        → /(foundation)/*
  ├─ host = dawah.assoutudeen.com  → /(dawah)/*
  └─ host = honey.assoutudeen.com  → /(honey)/*
```

Each route group has its own layout, header, footer and theme accent colour, while sharing
the component library, the CMS, the auth system and the checkout. In Vercel, add all three
domains to the same project — no extra hosting cost.

---

## Payments

**Use Paystack as the primary gateway.** Fees are 1.5% + ₦100 on local transactions, capped
at ₦2,000, and 3.9% + ₦100 international. Flutterwave is marginally cheaper at 1.4% local
(capped at ₦2,000) and 3.8% international, but Paystack has the better developer experience,
the more reliable settlement record, and the smoother mobile checkout — which matters more
than a 0.1% fee difference. Keep Flutterwave configured as a fallback if you take
significant diaspora payments, where its currency coverage is stronger.

*Verify current rates directly with each provider before signing — published fees change.*

**Three payment contexts, one integration:**

1. **Donations** — one-off and recurring. Paystack Subscriptions handles monthly giving.
   Requires a CAC-registered account to receive settlements.
2. **Book and honey sales** — standard checkout with shipping calculation.
3. **Course fees** — including instalment plans via Paystack Payment Plans.

**Also offer bank transfer.** A meaningful share of Nigerian donors, especially older ones,
will not use a card. Display account details clearly and provide a "I've transferred"
confirmation form that notifies your admin.

**Never store card details.** Redirect or use Paystack's hosted inline checkout so card data
never touches your server. Verify every transaction server-side via webhook before marking
an order paid — do not trust the browser callback alone. This is the single most common
security failure in Nigerian e-commerce builds.

---

## Shipping and fulfilment

For physical books and honey you need delivery zones and rates. Common Nigerian options:
GIG Logistics, Kwik, Sendbox, Fez Delivery. Sendbox and Fez both offer APIs if you want
live rates; otherwise a simple zone table is fine at launch:

| Zone | Example | Rate |
|---|---|---|
| Same state | Osun | ₦___ |
| South-West | Lagos, Oyo, Ogun | ₦___ |
| Other states | — | ₦___ |
| International | — | quote on request |

Honey is a liquid and heavy — confirm your courier accepts it and factor leak-proof packaging
into the price.

---

## Key integrations

- **WhatsApp Business** — a floating button using `wa.me` deep links with pre-filled
  messages that differ by page context ("I'd like to order the book" vs "I need a
  consultation"). Expect this to outperform every form on the site.
- **Google Maps embed** on Contact.
- **YouTube embeds** using a lite-embed wrapper so the page doesn't load YouTube's full
  player on every visit.
- **Structured data (JSON-LD)** — `Organization`, `NGO`, `Book`, `Product`, `Event`,
  `Course`, `FAQPage`. This is what earns rich results in Google and it is cheap to add.
- **Prayer times widget** *(optional)* — Aladhan API, if you want a daily-return reason.

---

## Performance targets

| Metric | Target |
|---|---|
| Lighthouse Performance (mobile) | ≥ 90 |
| Largest Contentful Paint | < 2.5s on 4G |
| Total homepage weight | < 1 MB |
| Time to Interactive on throttled 3G | < 5s |

Practical measures: `next/image` everywhere with explicit dimensions · static generation for
all content pages with incremental revalidation · self-hosted fonts subset to the characters
used · no carousel libraries · defer all third-party scripts.

---

## Security and reliability

- HTTPS enforced, HSTS enabled
- Rate-limit every public form; add hCaptcha or Cloudflare Turnstile (not Google reCAPTCHA,
  which is slow on Nigerian connections)
- Environment variables for all secrets — never committed to the repository
- Paystack webhook signature verification
- Role-based CMS access: Admin, Editor, Shop Manager, Course Manager
- Automated daily database backups with a tested restore procedure
- Uptime monitoring (UptimeRobot free tier)

---

## SEO foundations

- One clear `<title>` and meta description per page, written by a human
- Open Graph and Twitter card images for every shareable page
- `sitemap.xml` generated automatically, `robots.txt` configured
- Canonical URLs; hreflang tags if you publish Arabic
- 301 redirects from every old `thepropheticmedicine.com.ng` URL to its new equivalent —
  map these before launch, not after
- Google Business Profile for the physical office; this drives local search
- Target long-tail queries you can realistically win: "black seed benefits in Islam",
  "how to identify original honey in Nigeria", "prophetic medicine for [condition]",
  "ruqyah practitioner Nigeria", "original honey Osun"

---

## Repository and workflow

```
/apmf-web
├── /app
│   ├── /(foundation)
│   ├── /(dawah)
│   └── /(honey)
├── /components/ui        shared design system
├── /lib                  paystack, email, utils
├── /payload              CMS collections & config
├── middleware.ts         subdomain routing
└── /public
```

GitHub repository, `main` deploys to production, `develop` to a preview URL. Every pull
request gets its own preview deployment on Vercel — this is how you review content changes
before they go live.
