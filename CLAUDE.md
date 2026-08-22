# CLAUDE.md — Assoutudeen Web Platform

Copy this file to the repository root. Claude Code reads it automatically each session.

## Project

One Next.js codebase serving three sites for a Nigerian Islamic charity:

| Domain | Entity | Role |
|---|---|---|
| `assoutudeen.com` | **Assoutudeen Prophetic Medicine Foundation (APMF)** | **MAIN SITE — the parent charity** |
| `dawah.assoutudeen.com` | Assoutudeen Dawah Institute (ADI) | Subsidiary — education arm |
| `farms.assoutudeen.com` | Assoutudeen Honey Enterprise (AHE) | Subsidiary — commercial arm |

**The foundation is the primary site.** ADI and AHE sit under it. When a decision affects
prominence, defaults, shared components or ambiguity about "the website", the foundation
wins. Both subdomains carry a visible "← Part of Assoutudeen Prophetic Medicine Foundation"
link home.

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
--oxblood  #6B2233  foundation primary
--sage     #7E8B7A  dawah primary (text grade: --sage-dark #55614F)
--apricot  #E0A06A  honey / donate accent
--chalk    #F4F1EC  backgrounds
--ink      #24101A  hero and footer ground
--charcoal #2B2529  body text
```

Deliberately not olive-and-gold — every other charity site is. Do not reintroduce them.

Fonts: Manrope (body) · Petrona (headings) · Montserrat (logo wordmark only, per the brand
guide) · **Noto Naskh Arabic** (Qur'an/hadith), all self-hosted and subset. WCAG 2.1 AA —
apricot fails contrast on white for small text; use it only for solid buttons with dark
text, hairlines and focus rings. Sage is likewise too light for body copy; sage-dark is the
text grade.

Signature shape: **the seal** — an eight-sided cut-corner frame taken from the khatim star
(`.seal` in globals.css). It replaced the mihrab arch. clip-path cuts a border away at the
diagonals, so a bordered seal is a 1px parent behind an inset child.

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

**Beneficiary privacy is the default.** The 2024 and 2025 reports name nobody. Report by
category ("4 children in secondary school", "a revert sister"). Publish a name or photo only
with separate, explicit, recorded consent. Never build named-beneficiary pages by default.

**Transparency.** Category totals must reconcile exactly to the stated annual figure — they
currently do, to the naira. Publish overheads (2025: ₦410,820 operational, ₦275,000 gadgets)
rather than burying them.

## Four features that carry the project

1. **Monthly Empowerment Fund** — a standing contribution circle, NOT public appeals.
   Public appeals have stopped; do not build per-beneficiary progress bars. Primary
   conversion is `/empowerment/join` (recurring pledge, Paystack subscription *or* manual
   monthly transfer — support both). Two intake forms: Join the Fund, and Request
   Assistance. Impact reported **by category, anonymously** — see `docs/11`. Annual impact
   reports at `/impact/[year]`, with WhatsApp share keeping APMF's emoji format.
   Verified total across seven years: **₦21,635,439.29** (2019 ₦560,918.28 ·
   2020 ₦1,640,755.03 · 2021 ₦2,176,400.98 · 2022 ₦2,612,845 · 2023 ₦5,323,500 ·
   2024 ₦3,838,500 · 2025 ₦5,482,520). The total is derived by summing
   `YEAR_TOTALS` in `src/lib/impact.ts` — never type it by hand — and a test
   asserts the reconciliation.
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
