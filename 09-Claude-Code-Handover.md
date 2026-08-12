# 09 — Handover Note for Claude Code

**Read this file first in any new Claude Code session on this project.**

Habeeb is building three websites himself using Claude Code. This document is the brief.
Everything here is confirmed with the client unless marked **[UNCONFIRMED]**.

---

## Before you start

Copy `CLAUDE.md` (in this folder) into the repository root. Claude Code reads it
automatically at the start of every session, so the project facts, conventions and
guardrails persist without being re-pasted.

Companion documents in this folder, all of which Claude Code should read on request:
`01-Discovery-Brief.md` (facts) · `02-Information-Architecture.md` (sitemap and navigation) ·
`03-Page-Content-Plan.md` (page-by-page) · `04-Technical-Specification.md` (stack) ·
`05-Design-and-Brand.md` (visual system) · `06-Compliance-and-Trust.md` (legal guardrails) ·
`Endless_Blessings_From_the_Creator.pdf` (the book — source content for the Remedies
Library).

---

## The project in one paragraph

Assoutudeen Prophetic Medicine Foundation (APMF) is a Nigerian Islamic charity in Ede, Osun
State, led by Imam Engr. Abd'Waasi Tirmidhi A. (Abu Mubaashir). It runs public fundraising
appeals for sick and vulnerable Muslims and publishes full annual accounts of what was
raised; it teaches seven recurring Islamic classes through the Assoutudeen Dawah Institute;
it sells honey wholesale through Assoutudeen Honey Enterprise; and it publishes a
175-page book of prophetic remedies. One Next.js codebase serves all three from
`assoutudeen.com`, `dawah.assoutudeen.com` and `honey.assoutudeen.com`.

---

## Stack (decided — do not re-litigate)

Next.js 15 App Router · TypeScript · Tailwind + shadcn/ui · Payload CMS 3 (self-hosted,
same process) · PostgreSQL on Neon · Cloudinary for media · Vercel hosting · Paystack for
payments · Resend for transactional email.

Subdomain routing via `middleware.ts` reading the request hostname and rewriting into route
groups `(foundation)`, `(dawah)`, `(honey)`. One repo, one deploy, three front doors.

---

## The four features that actually matter

Everything else is a standard content site. These four are where the project earns its keep,
and none of them is boilerplate. Build them properly.

### 1. The Appeals system — the heart of the site

APMF does not run a grants programme. It runs **named public appeals** for people in
medical or financial crisis, then publishes exactly what came in — including the shortfalls.

Real 2023 data to seed with:

| Beneficiary | Date | Need | Raised | Target |
|---|---|---|---|---|
| Mr. Ayoola Raheem | Feb 2023 | Cerebral angiography (brain injury), UCH Ibadan | ₦1,690,000 | ₦2,000,000 |
| A divorcee with 8 children | Aug 2023 | Financial stability empowerment | ₦340,000 | ₦500,000 |
| A revert sister | Sep 2023 | Malaria, jinn possession, shelter, clothing | ₦90,000 + clothing | — |
| Baba Jubril Kuye (marhum) | Dec 2023 | Borehole project | Family-funded, APMF-supervised | — |
| Yusuf Fatai Abolore | Dec 2023 | Kidney transplant, St. Nicholas Lagos | ₦3,035,000 | ₦22,000,000 |

Plus six smaller assistances from surplus funds (₦15,000–₦50,000 each). Total 2023:
**₦5,323,500 across 11 beneficiaries.**

Requirements:

- `Appeal` collection: title, slug, beneficiary name, `isAnonymous` flag, need description,
  category (medical / financial / shelter / project), hospital, target amount, raised amount,
  status (active / closed / partially-met), opened date, closed date, photos, updates array,
  closing report.
- Appeal page: progress bar showing raised vs target, inline donate widget, updates
  timeline, closing report.
- **A "Share on WhatsApp" button that generates a pre-formatted broadcast message** — with
  emoji field markers matching the format APMF already uses (👳🏻‍♂️ Name, 📅 Date, 🚑 Nature
  of illness, 🏥 Hospital, 💰 Amount raised), the appeal URL, and "Kindly Rebroadcast!".
  Their entire distribution model runs on WhatsApp rebroadcast. This one button will
  probably outperform every other feature on the site.
- **Do not hide shortfalls.** ₦3.035m against a ₦22m target must display honestly. The
  transparency is the value proposition, not an embarrassment to design around.
- `AnnualReport` collection rendering the fiscal-year page: the At-Tawbah 9:105 verse, the
  beneficiary table, surplus-fund assistances, totals, and the standing offer of bank
  statements on request.

### 2. The Dawah recurrence engine

Seven programmes, each defined by a **rule**, not a date:

| Programme | Teacher | Rule |
|---|---|---|
| APMF Monthly Empowerment Programme & Special Lecture | — | Last Monday of month |
| Monthly Special Fiqh Seminar | Shaykh Yaaqub Muhibullah Abd'hammed Olore | Last Sunday of month |
| Weekly Tafsir Session | Imam Engr. Tirimidhi Abd'waasi | Every Friday |
| Fortnightly Hadith Session | Imam Engr. Tirimidhi Abd'waasi | 2nd Saturday |
| Fortnightly Tawheed Class | Imam Engr. Tirimidhi Abd'waasi | 2nd Sunday (never last Sunday) |
| Fortnightly Prophetic Medicine Class | Imam Engr. Tirimidhi Abd'waasi | 2nd Saturday |
| Fataawah Night / Q&A | Group of scholars | Quarterly |

Store the recurrence rule (RRULE-style) and compute occurrences with `rrule` or `date-fns`.
The schedule page then never goes stale and nobody has to maintain it. Ship an `.ics` feed
so attendees subscribe once from their phone.

Timezone is **Africa/Lagos (WAT, UTC+1, no DST)**. Handle "2nd Sunday except last Sunday"
explicitly — in a month where the 2nd Sunday *is* the last Sunday, the Tawheed class does not
run. Programmes 4 and 6 share 2nd Saturdays; render both without implying a clash.
**[UNCONFIRMED]** — start times, venue/platform, language, whether free.

### 3. The Honey Ambassador system

AHE ran a referral contest in July 2026 with a leaderboard updated **by hand every two days
on Facebook**. Automate it.

- `Ambassador` collection: name, phone, unique code (`HONEY-KEMI`, `HONEY-LAGOS01`),
  registration date, status.
- `Order` gains a `referralCode` field and an `isNewCustomer` boolean.
- Attribution rules, carried over from the existing contest terms: only customers with no
  prior confirmed purchase count · one code per customer, first confirmed code wins ·
  minimum qualifying order **5 litres** · only paid and confirmed orders count.
- Public leaderboard: rank, ambassador name, total litres, distance to next tier. Cache it;
  recompute on order confirmation.
- Ambassador dashboard behind login: my code, my referred orders, my volume, my rank.
- Prize tiers are configurable in the CMS — the 2026 contest ran ₦120,000 at 350 L down to
  ₦2,000 tokens, and thresholds may change between contests. Do not hard-code them.

Honey is sold **by volume in litres**, wholesale-oriented. **[UNCONFIRMED]** — current price
list, pack sizes, delivery zones and rates.

### 4. The Remedies Library, sourced from the book

`Endless_Blessings_From_the_Creator.pdf` (175 pages) contains ~45 chapters, one per remedy:
olive oil, black seed, honey, water, zamzam, rainwater, garlic, salt, vinegar, barley/talbīna,
dates, fenugreek, ambergris, lemongrass, mushroom, senna, parsley, musk, cucumber, warss,
ginger, aloe vera, arum, milk, fig, cress, henna, myrrh, pomegranate, kohl, sugarcane,
myrtle, banana, watermelon, celery, raisins, thyme, arak fruit, miswāk, beetroot, citron,
sidr, 'oud, butter, egg, bread, fish — plus ruqyah material.

Each chapter follows: Qur'anic verse → hadith with full source citation → Ibn al-Qayyim
commentary from *At-Tibb an-Nabawiyy* → composition → uses → footnotes.

- Publish 10–15 chapters free as the library; the rest sell the book.
- `Remedy` collection mirroring that structure, with an `isFree` flag.
- **Arabic rendering is not optional.** `dir="rtl"`, `lang="ar"`, Noto Naskh Arabic,
  diacritics preserved exactly as in the source. This audience will notice errors
  immediately, and a mangled āyah costs more credibility than a broken layout.
- These pages are the SEO engine: "black seed benefits in Islam", "zamzam water benefits",
  "benefits of miswāk", "talbina for grief".

---

## Hard guardrails

**Payments.** Never store card data. Use Paystack hosted/inline checkout. **Verify every
transaction server-side via signed webhook** before marking an order paid or incrementing an
appeal's raised total — never trust the browser callback. Also support bank transfer (Jaiz
Bank 0010939336 **[verify before publishing]**) with an "I've transferred" confirmation form,
because many Nigerian donors will not use a card.

**Zakat.** Must be tracked as a separate fund with its own ledger. Publish the policy: the
eight Qur'anic categories, how eligibility is verified, and that 100% of zakat reaches
eligible recipients with admin costs met elsewhere. Do not pool zakat with general donations
in the data model.

**NAFDAC.** APMF sells honey only — no herbal drugs — so the herbal advertisement regime
does not apply. But honey is a food product: **product pages may not claim to treat, prevent
or cure any disease.** Educational pages (the book, the Remedies Library, articles) may
quote Qur'an, hadith and Ibn al-Qayyim freely. Keep the two separate. Put the standard
disclaimer on every remedy page.

**NDPA 2023.** Appeal applicants submit health data — a special category. Unticked consent
checkboxes on every form, never pre-ticked. Separate explicit written consent before
publishing any beneficiary's name, photo or story; store the consent record. Encrypt at
rest, restrict admin access, publish a privacy policy.

**Performance.** The audience is on mid-range Android over patchy mobile data. Mobile-first,
homepage under 1 MB, Lighthouse mobile ≥ 90, every image through `next/image`, no carousel
libraries, third-party scripts deferred. Test throttled before shipping.

---

## Design tokens

```
--olive:   #2F5D3A   foundation primary
--amber:   #D9A441   honey / donate accent
--teal:    #123B35   dawah primary, footers
--sand:    #F7F3EA   backgrounds
--charcoal:#2B2B2B   body text
```

Fonts: Inter (UI/body) · Fraunces or Lora (headings) · **Noto Naskh Arabic** (Qur'an and
hadith). Self-host, subset. No mosque-silhouette backgrounds, no gold gradient text, no
tiled arabesque wallpaper, no autoplay audio. Restrained motion, `prefers-reduced-motion`
respected. WCAG 2.1 AA — note that amber on white fails contrast for small text; use it for
solid buttons with dark text only.

---

## Suggested session sequence

Twelve sessions. Commit at the end of each; keep them scoped.

| # | Scope |
|---|---|
| 1 | Scaffold: Next.js + TS + Tailwind + shadcn, `middleware.ts` subdomain routing, design tokens, three layout shells with headers and footers, a `/health` route to prove routing works |
| 2 | Payload CMS: collections for Appeal, AnnualReport, Remedy, Article, Programme, Teacher, Product, Ambassador, Order, Donation, Page. Roles: Admin, Editor, ShopManager |
| 3 | Foundation static pages: About, Founder, Our Structure, Accountability, Contact, WhatsApp float, newsletter capture |
| 4 | **Appeals**: index with active/closed tabs, appeal template, progress bars, updates timeline, WhatsApp share generator, Request Assistance form with file upload, annual report template seeded with 2023 |
| 5 | **Donations**: Paystack one-off and recurring, purpose selector, separate zakat ledger, webhook verification, bank-transfer confirmation flow, email receipts via Resend |
| 6 | Remedies Library + Articles: collection, index with filters, remedy template, Arabic RTL rendering, disclaimer component. Import 10–15 chapters from the book PDF |
| 7 | Book sales page: full TOC, sample-chapter email gate, Paystack checkout, delivery zones, bulk enquiry |
| 8 | Homepage assembly, metadata, JSON-LD (`NGO`, `Book`, `Product`, `Event`, `Course`, `FAQPage`), sitemap, robots, 301 map from `thepropheticmedicine.com.ng`, cookie consent, legal pages → **deploy `assoutudeen.com`** |
| 9 | Dawah: recurrence engine with tests for all seven rules, schedule page, `.ics` feed, seven programme pages |
| 10 | Dawah: teachers, lecture library, about, contact → **deploy `dawah.assoutudeen.com`** |
| 11 | Honey: products, litre-based pricing with retail/wholesale tiers, cart, Paystack checkout, delivery zones, Our Honey pages including "How to Identify Fake Honey" |
| 12 | **Ambassador system**: registration, code generation, referral attribution with the new-customer rule, automated leaderboard, ambassador dashboard, configurable prize tiers → **deploy `honey.assoutudeen.com`** |

Ship after session 8. A live site earning trust beats a perfect one still on a laptop.

---

## Testing worth writing

Most of this site doesn't need heavy tests. Three parts do, because they're the ones that
lose money or embarrass you silently:

1. **The recurrence engine** — unit tests for all seven rules across a full year, including
   the "2nd Sunday is also the last Sunday" edge case and months with five Mondays.
2. **Paystack webhook handling** — signature verification, idempotency (the same webhook
   delivered twice must not double-count a donation), and failure paths.
3. **Referral attribution** — new-customer detection, first-code-wins on conflicts, the 5 L
   minimum, and leaderboard recomputation.

Add Sentry early. A silently failing checkout is worse than a visibly broken one.

---

## What is still unconfirmed

Ask Habeeb rather than inventing values:

1. CAC registration number and incorporation date
2. Board of trustees — names and roles
3. Book price and formats (paperback / PDF / EPUB)
4. Honey price list, pack sizes, delivery zones and rates
5. Class times, venue or platform, language for the seven programmes
6. Which appeals are currently open
7. 2024 and 2025 accountability reports
8. Photo and story consent status for named beneficiaries
9. Whether the ambassador contest becomes a permanent programme
10. Whether AHE profits fund APMF, and whether to state it publicly
11. Confirmation that Jaiz 0010939336 is the public donation account

Where a value is missing, scaffold with a clearly-marked placeholder and add it to a
`TODO-CONTENT.md` at the repo root. Do not invent Nigerian prices, hadith citations, or
beneficiary details.
