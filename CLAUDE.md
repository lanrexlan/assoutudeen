# CLAUDE.md — Assoutudeen Web Platform

Copy this file to the repository root. Claude Code reads it automatically each session.

## Project

One Next.js codebase serving three sites for a Nigerian Islamic charity:

| Domain | Entity |
|---|---|
| `assoutudeen.com` | Assoutudeen Prophetic Medicine Foundation (APMF) |
| `dawah.assoutudeen.com` | Assoutudeen Dawah Institute (ADI) |
| `honey.assoutudeen.com` | Assoutudeen Honey Enterprise (AHE) |

Full brief: `docs/09-Claude-Code-Handover.md`. Read it before non-trivial work.

## Facts

- Founder / author / chief instructor: **Imam Engr. Abd'Waasi Tirmidhi A. (Abu Mubaashir)**
- Second teacher: Shaykh Yaaqub Muhibullah Abd'hammed Olore (monthly Fiqh seminar)
- Address: Assoutudeen Street, Zone 5, Fiwasaye Community, Ede, Osun State, Nigeria
- Phone / WhatsApp: 08161882470 · Email: `info@assoutudeen.com`
- Book: *Endless Blessings From The Creator*, 175 pages, ~45 prophetic remedies
- Legacy site to 301-redirect: `thepropheticmedicine.com.ng`
- Timezone: **Africa/Lagos**, UTC+1, no DST. Currency: **NGN (₦)**. Locale: `en-NG`.

Spell these exactly. Never invent hadith citations, Arabic text, prices, or beneficiary names.

## Stack — decided, don't re-litigate

Next.js 15 App Router · TypeScript strict · Tailwind + shadcn/ui · Payload CMS 3 (same
process) · PostgreSQL (Neon) · Cloudinary · Vercel · Paystack · Resend.

Subdomain routing: `middleware.ts` reads the hostname, rewrites into route groups
`(foundation)` / `(dawah)` / `(honey)`. Shared components in `components/ui`.

```
/app
  /(foundation)  /(dawah)  /(honey)
/components/ui   shared design system
/lib             paystack, email, recurrence, utils
/payload         CMS collections & config
middleware.ts
```

## Design tokens

```
--olive #2F5D3A  foundation primary
--amber #D9A441  honey / donate accent
--teal  #123B35  dawah primary, footers
--sand  #F7F3EA  backgrounds
--charcoal #2B2B2B  body text
```

Fonts: Inter (body) · Fraunces or Lora (headings) · **Noto Naskh Arabic** (Qur'an/hadith),
self-hosted and subset. WCAG 2.1 AA — amber fails contrast on white for small text; use it
only for solid buttons with dark text.

Never: mosque-silhouette backgrounds, gold gradient text, tiled arabesque wallpaper,
autoplay audio, carousels.

## Non-negotiables

**Payments.** No card data stored, ever. Paystack hosted/inline checkout only. Verify every
transaction via **signed server-side webhook** before marking paid or incrementing an
appeal total. Webhooks must be idempotent. Support bank transfer with a manual confirmation
flow.

**Zakat** is a separate fund with its own ledger. Never pool it with general donations.

**NAFDAC.** Honey only, no herbal drugs. Product pages must not claim to treat, prevent or
cure disease. Educational pages may quote Qur'an, hadith and Ibn al-Qayyim freely. Keep them
separate. Standard disclaimer on every remedy page.

**NDPA 2023.** Appeal applicants submit health data. Consent checkboxes unticked by default.
Separate written consent before publishing any beneficiary name, photo or story.

**Arabic.** `dir="rtl"`, `lang="ar"`, Noto Naskh, diacritics preserved exactly. Copy Qur'anic
text verbatim from source — never retype or "clean up" an āyah.

**Performance.** Mobile-first for mid-range Android on patchy data. Homepage < 1 MB.
Lighthouse mobile ≥ 90. `next/image` always. Defer third-party scripts.

**Transparency.** Appeals display shortfalls honestly. A ₦3,035,000 raise against a
₦22,000,000 target renders as-is. Never round up, hide, or design around a gap.

## Four features that carry the project

1. **Appeals** — named fundraising cases with target/raised progress, updates timeline,
   annual accountability reports, and a WhatsApp share button that generates a pre-formatted
   broadcast in APMF's existing emoji format ending "Kindly Rebroadcast!"
2. **Dawah recurrence engine** — seven programmes stored as RRULE-style rules, occurrences
   computed, `.ics` feed. Edge case: Tawheed class is 2nd Sunday *except* when that is also
   the last Sunday.
3. **Honey ambassador system** — referral codes, new-customer-only attribution, first code
   wins, 5 L minimum qualifying order, automated public leaderboard, CMS-configurable prize
   tiers.
4. **Remedies Library** — ~45 chapters from the book; 10–15 free, rest gated. Primary SEO
   asset.

## Conventions

- TypeScript strict, no `any`
- Server Components by default; `"use client"` only when genuinely needed
- Zod for all form and API validation
- Server Actions for mutations
- Money in **kobo as integers**, never floats
- Dates stored UTC, displayed Africa/Lagos
- Conventional commits
- No secrets in the repo — `.env.local` and Vercel env vars only

## Tests worth writing

Only three areas need real coverage: the recurrence engine (all seven rules across a year,
including edge cases), Paystack webhook handling (signature, idempotency, failure paths),
and referral attribution (new-customer rule, code conflicts, 5 L minimum).

## When something is unknown

Do not invent it. Scaffold a clearly-marked placeholder and append the question to
`TODO-CONTENT.md` at the repo root. Currently unknown: CAC number, trustees, book price,
honey price list, class times and venues, open appeals, 2024–2025 reports, consent status.
