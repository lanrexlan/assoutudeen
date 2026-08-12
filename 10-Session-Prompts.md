# 10 — Claude Code Session Prompts

Copy-paste prompts, one per session. Run them in order.

**Hierarchy, so nothing gets confused:** the **main website is the foundation — APMF — on
`assoutudeen.com`**. The Da'wah Institute and the Honey Enterprise are subsidiaries living on
subdomains. Sessions 1–8 build the main site and ship it. Sessions 9–12 add the two
subsidiaries afterwards.

---

## Before session 1 — five minutes of setup

```bash
mkdir assoutudeen-web && cd assoutudeen-web
git init
```

Then copy two files into the project:

```
assoutudeen-web/
├── CLAUDE.md                        ← from this folder, to the repo ROOT
└── docs/
    ├── 09-Claude-Code-Handover.md
    ├── 02-Information-Architecture.md
    ├── 03-Page-Content-Plan.md
    ├── 04-Technical-Specification.md
    ├── 05-Design-and-Brand.md
    ├── 06-Compliance-and-Trust.md
    └── Endless_Blessings_From_the_Creator.pdf
```

Then run `claude` in that directory.

Accounts to have open (all free to start): **Neon** for Postgres, **Cloudinary** for media,
**Vercel** for hosting, **Paystack** for payments, **Resend** for email.

---

# SESSION 1 — Scaffold and subdomain routing

**Goal:** a running project where all three sites resolve to distinct shells, with the design
system in place. No content yet.

```
Read CLAUDE.md and docs/09-Claude-Code-Handover.md before starting.

Set up the Assoutudeen web platform scaffold. One Next.js codebase serving three
sites. The MAIN site is the foundation (APMF) on assoutudeen.com — the other two
are subsidiaries on subdomains.

1. Initialise Next.js 15 (App Router, TypeScript strict, ESLint, Tailwind,
   src/ dir, @/* alias). Set up shadcn/ui.

2. Design tokens in globals.css and the Tailwind config:
     --olive    #2F5D3A   foundation primary
     --amber    #D9A441   honey / donate accent
     --teal     #123B35   dawah primary, footers
     --sand     #F7F3EA   backgrounds
     --charcoal #2B2B2B   body text
   Fonts via next/font: Inter (body), Fraunces (headings), Noto Naskh Arabic
   (Qur'an and hadith). Self-hosted and subset.

3. middleware.ts — route by hostname into route groups:
     assoutudeen.com        -> (foundation)   [MAIN SITE]
     dawah.assoutudeen.com  -> (dawah)
     honey.assoutudeen.com  -> (honey)
   For local development, support these hosts:
     localhost:3000        -> foundation
     dawah.localhost:3000  -> dawah
     honey.localhost:3000  -> honey
   Also accept a ?_site=dawah query override so I can test without editing
   /etc/hosts. Exclude /api, /admin, /_next and static files from rewriting.

4. Three route groups, each with its own layout, header and footer:
   - (foundation): olive primary. Nav — About, Our Work, Prophetic Medicine,
     Shop, Media, Contact. A visually distinct Donate button that stays outside
     the mobile hamburger and is always visible.
   - (dawah): teal primary. Nav — Programmes, Schedule, Teachers, Library,
     About, Contact. Plus a "← Part of Assoutudeen Prophetic Medicine
     Foundation" link back to the main site.
   - (honey): amber primary. Nav — Shop, Our Honey, Ambassadors, About,
     Contact. Cart icon. Same link back to the foundation.

5. Shared components in components/ui: Container, Section, Button variants,
   Card, ArabicQuote (renders Arabic RTL in Noto Naskh with a translation and a
   source citation beneath), WhatsAppFloat (wa.me deep link to 08161882470 with
   a page-context-specific pre-filled message), Disclaimer.

6. A placeholder home page per site so I can verify routing, plus /health
   returning the resolved site name.

7. Mobile-first. Tap targets 44px minimum. No carousels. Respect
   prefers-reduced-motion.

Then tell me exactly how to test all three locally.
```

**Verify before moving on:** all three shells render with the right colours and nav;
`/health` reports the correct site for each host; the mobile hamburger works and Donate sits
outside it.

---

# SESSION 2 — Payload CMS

```
Add Payload CMS 3 running inside this Next.js app, with Postgres (Neon) and
Cloudinary for media.

Collections:

FOUNDATION (main site):
- Appeal: title, slug, beneficiaryName, isAnonymous (bool), anonymousLabel,
  category (medical|financial|shelter|project), needDescription (rich text),
  hospital, targetAmountKobo (int), raisedAmountKobo (int), status
  (active|closed|partially-met), openedDate, closedDate, photos, updates
  (array: date, title, body), closingReport (rich text), featured (bool)
- AnnualReport: fiscalYear, introduction (rich text), quranVerse (arabic,
  translation, reference), beneficiaries (array: name, date, need, hospital,
  raisedKobo, targetKobo), surplusAssistances (array: description, amountKobo),
  totalRaisedKobo, beneficiaryCount, closingNote, pdfUpload
- Remedy: name, arabicName, transliteration, slug, quranVerse group, hadiths
  (array: arabic, translation, source, gradingNote), ibnQayyimCommentary,
  composition, traditionalUses, precautions, isFree (bool), bookChapterRef,
  relatedProduct
- Article, Page, Testimonial, TeamMember, FAQ, Newsletter subscriber
- Donation: reference, amountKobo, purpose (appeal|zakat|sadaqah|general|
  dawah-scholarship), appealRef, donorName, donorEmail, isRecurring, status,
  paystackRef, isAnonymous
  IMPORTANT: zakat must be queryable as a fully separate ledger. Never pool it
  with general donations.

DAWAH (subsidiary):
- Programme: title, slug, teacher (rel), description, recurrenceRule (RRULE
  string), startTime, durationMinutes, venue, platform, language, isFree,
  recordings (array)
- Teacher: name, honorific, bio, credentials, photo

HONEY (subsidiary):
- Product: name, slug, description, volumeLitres, packSize, retailPriceKobo,
  wholesalePriceKobo, minWholesaleLitres, images, nafdacNumber, inStock
- Ambassador: name, phone, email, code (unique), registeredAt, status
- Order: reference, items, customer, isNewCustomer (bool), referralCode,
  totalKobo, deliveryZone, status, paystackRef

Roles: Admin, Editor, ShopManager. Editors must not see Donation or Order
financial data.

All money as integers in kobo — never floats. Dates stored UTC, displayed
Africa/Lagos. Seed one Appeal and one AnnualReport from docs/09 so I can see
real shapes.
```

---

# SESSION 3 — Foundation static pages

```
Build the foundation (MAIN site) static pages per docs/03-Page-Content-Plan.md.

- About / Who We Are
- The Founder — Imam Engr. Abd'Waasi Tirmidhi A. (Abu Mubaashir)
- Our Structure — APMF at the top, Assoutudeen Dawah Institute and Assoutudeen
  Honey Enterprise beneath. Make the parent/subsidiary relationship visually
  obvious. Link out to both subdomains.
- Accountability — CAC number, trustees, annual report links, how funds are
  used, bank transfer details, a named financial contact
- Contact — tap-to-call 08161882470, WhatsApp deep link, embedded map for
  Assoutudeen Street, Zone 5, Fiwasaye Community, Ede, Osun State, and a
  contact form with a subject dropdown that routes to different inboxes
- Newsletter capture component
- Legal shells: Privacy Policy, Terms, Delivery, Returns

Any fact I haven't supplied: use a clearly marked placeholder like
[TODO: CAC number] and append it to TODO-CONTENT.md at the repo root. Do not
invent CAC numbers, trustee names, or dates.
```

---

# SESSION 4 — Monthly Empowerment Fund, forms, impact reports

```
Read docs/11-Empowerment-Model-and-Forms.md in full before starting.

IMPORTANT: APMF has STOPPED public appeals. Do not build per-beneficiary
appeal pages with progress bars. The model is now a standing MONTHLY
CONTRIBUTION FUND, and beneficiaries are reported by CATEGORY, anonymously.

1. /empowerment — the flagship page.
   - Lead with the founder's own appeal message (in docs/11, quoted from his
     voice note). Keep the Yoruba proverb "One tree does not make a forest".
   - What the fund does: orphan care and education, widow empowerment and
     trade facilitation, emergency medical relief, crisis support
   - Three-year proof: ₦14,644,520 across 2023–2025, year cards linking to
     full reports
   - How contribution works: any amount, monthly, no minimum
   - Two paths: "Join the Fund" (primary CTA) and "Request Assistance"
     (secondary but never hidden — people in need must find it easily)
   - Suggested monthly tiers with what each actually does

2. /empowerment/join — THE PRIMARY CONVERSION OF THE WHOLE SITE.
   Full field spec in docs/11. Key points:
   - Short form. Every extra field costs members.
   - Monthly amount chips: ₦2,000 / ₦5,000 / ₦10,000 / ₦25,000 / ₦50,000 /
     custom
   - Designation: general / orphan care / widow empowerment / medical relief /
     zakat
   - SUPPORT BOTH payment paths: Paystack subscription auto-debit AND manual
     monthly bank transfer with a recorded pledge. The founder's own model is
     relational — people reply with the amount they intend to give. Older and
     senior contributors will not use a card. Forcing one loses them.
   - Manual path: record pledge, show Jaiz Bank 0010939336 [TODO: confirm],
     schedule a monthly WhatsApp reminder
   - Zakat designation goes to a SEPARATE ledger, never pooled
   - Creates a Member record: pledge, method, designation, status
     (pending/active/lapsed/cancelled), start date, lifetime total

3. /empowerment/request — assistance intake. Full spec in docs/11.
   Design for someone in distress on a cheap phone with limited English:
   multi-step on mobile, progress saved to localStorage, large text, no jargon,
   no login, WhatsApp fallback offered at every step.
   - Consent checkboxes ALL UNTICKED by default (NDPA 2023)
   - Two SEPARATE optional consents: share my story with my name / share my
     story anonymously. Default to anonymous everywhere.
   - Health data is a special category: encrypt at rest, restrict admin access
     to named roles, set a retention period
   - Status workflow: new → under-review → verified → approved → assisted →
     declined, with internal reviewer notes never exposed publicly

4. /empowerment/how-it-works — verification, disbursement, reporting to
   contributors.

5. /impact and /impact/[year] — CMS-driven so future years need no code.
   Seed all three years from docs/11:
     2023 — ₦5,323,500 (legacy appeal model, label it as such)
     2024 — ₦3,838,500 across 4 categories
     2025 — ₦5,482,520 across 7 categories
   Every category total sums EXACTLY to the stated annual figure — preserve
   that precision, and show the reconciliation.
   Include: Bismillah, the Sahih Muslim hadith on relieving distress, headline
   total, category cards with detail lines, a category split chart, highlights,
   the verification note, and a Join the Fund CTA at the bottom.
   Show 2025's overheads honestly (₦410,820 operational, ₦275,000 gadgets) —
   voluntary disclosure builds more trust than hiding them.

6. ShareReportButton — pre-formatted WhatsApp message keeping APMF's existing
   emoji layout, ending with the contact number. These reports already
   circulate on WhatsApp; make the site the canonical link people forward.
   Copy-to-clipboard fallback on desktop.

7. Admin: a members view showing active count, total monthly committed, this
   month's collections against pledges, and lapsed members needing follow-up.
   The "pledged but not paid this month" list is the most useful screen here.

Keep the emoji formatting from their reports — it reads as warm and familiar to
this audience. Render it more restrained on web (emoji as section icons rather
than inline on every line) without stripping the character out.
```

---

# SESSION 5 — Donations and Paystack

```
Build the donation system for the main site.

1. /donate — preset amounts (₦1,000 / ₦5,000 / ₦25,000 / ₦100,000 / custom),
   one-time vs monthly toggle, purpose selector (Appeal, Zakat, Sadaqah
   Jariyah, General, Dawah Scholarships), optional anonymity, optional
   "cover the transaction fee".

2. Paystack: hosted/inline checkout for one-off; Paystack Subscriptions for
   recurring. NEVER touch card data.

3. /api/webhooks/paystack:
   - Verify the x-paystack-signature HMAC before anything else
   - Idempotent by event id — the same webhook delivered twice must not
     double-count
   - Only on verified webhook: mark the donation paid and increment the
     appeal's raisedAmountKobo
   - Never trust the browser callback
   - Log failures to Sentry

4. Zakat as a separate ledger — its own reporting view in admin, never pooled
   with general donations. Add a /zakat-policy page covering the eight Qur'anic
   categories, how eligibility is verified, and that 100% of zakat reaches
   eligible recipients with admin costs met elsewhere.

5. Bank transfer path: display Jaiz Bank 0010939336 [TODO: confirm], plus an
   "I have transferred" form capturing amount, date, depositor name and an
   optional receipt upload, which notifies admin and creates a pending
   donation.

6. Email receipts via Resend. Thank-you page with a WhatsApp community invite.

Write tests for webhook signature verification, idempotency, and failure paths.
```

---

# SESSION 6 — Remedies Library and Articles

```
Build the Remedies Library — the main site's SEO engine — sourced from
docs/Endless_Blessings_From_the_Creator.pdf (175 pages, ~45 chapters by
Abd'Waasi Tirmidhi A.).

1. /remedies — filterable index
2. /remedies/[slug] — following the book's own structure: Arabic name and
   transliteration, Qur'anic verse, hadith with full source citation, Ibn
   al-Qayyim commentary from At-Tibb an-Nabawiyy, composition, traditional
   uses, precautions, disclaimer, links to the book and to the honey shop
   where relevant
3. /prophetic-medicine — the explainer. Must state plainly that APMF does not
   advise anyone to abandon prescribed medical treatment.
4. /articles + /articles/[slug], /faq

ARABIC IS CRITICAL: dir="rtl", lang="ar", Noto Naskh Arabic, diacritics
preserved EXACTLY as in the source. Copy Qur'anic text verbatim from the PDF —
never retype or "clean up" an āyah. This audience notices immediately.

Extract 12 chapters from the PDF and seed them as isFree: true — start with
honey, black seed, olive oil, dates, zamzam, talbīna, miswāk, garlic, ginger,
figs, milk, and sidr. Preserve every footnote citation. Flag anything you
cannot extract cleanly rather than paraphrasing it.

Disclaimer component on every remedy page: educational content describing
prophetic medicine and Islamic teaching, not medical advice, not intended to
diagnose treat cure or prevent disease, consult a qualified practitioner.
```

---

# SESSION 7 — The book

```
Build the book sales page on the main site.

/book — "Endless Blessings From The Creator" by Abd'Waasi Tirmidhi A.
(Abu Mubaashir), 175 pages, ~45 remedies.

- Cover, title, the pitch, what the reader learns
- The FULL table of contents (all ~45 remedies — it's genuinely impressive)
- Free sample chapter behind an email capture (double opt-in)
- About the author, endorsements slot, reviews
- Price [TODO], formats (paperback / PDF / EPUB) [TODO]
- Delivery zones and costs [TODO], sticky mobile Buy Now bar
- Bulk Order Enquiry for masjids and Islamic schools
- Checkout via Paystack, reusing session 5's webhook verification
- Digital delivery: signed expiring download links, not public URLs

Cross-link every free Remedy page to the book, and the book's TOC to the free
remedy pages.
```

---

# SESSION 8 — Homepage, SEO, LAUNCH the main site

```
Assemble the foundation homepage and ship assoutudeen.com.

Homepage sections per docs/03: hero, trust bar (real numbers only), What We Do
(four cards), featured Appeal with live progress, the book, latest articles,
"Our Family" (APMF as parent with the Dawah Institute and Honey Enterprise as
subsidiaries), testimonials, newsletter + WhatsApp, footer.

SEO and launch:
- Per-page title and meta description, Open Graph images
- JSON-LD: NGO/Organization, Book, Article, FAQPage
- sitemap.xml, robots.txt, canonicals
- 301 redirect map from thepropheticmedicine.com.ng — its old pages covered
  the four services (preparation of prophetic medicine, guidance and
  counselling, jinn/ruqyah assistance, seminars and workshops) and honey
- Cookie consent (Turnstile, not reCAPTCHA), NDPA-compliant privacy policy
- Sentry, GA4, Vercel Analytics
- Verify: Lighthouse mobile ≥ 90, homepage < 1 MB, LCP < 2.5s on 4G

Then walk me through deploying to Vercel and pointing the assoutudeen.com DNS,
including adding the dawah and honey subdomains now so they're ready.
```

**Ship here.** A live foundation site earning trust beats a perfect three-site platform
still on your laptop.

---

# SESSION 9 — Dawah: the recurrence engine

```
Build dawah.assoutudeen.com — the Institute is a recurring class schedule, not
a college, so the calendar computes itself.

Seven programmes:
1. APMF Monthly Empowerment Programme & Special Lecture — last Monday
2. Monthly Special Fiqh Seminar (Shaykh Yaaqub Muhibullah Abd'hammed Olore) —
   last Sunday
3. Weekly Tafsir Session (Imam Engr. Tirimidhi Abd'waasi) — every Friday
4. Fortnightly Hadith Session (Tirimidhi) — 2nd Saturday
5. Fortnightly Tawheed Class (Tirimidhi) — 2nd Sunday, EXCEPT when the 2nd
   Sunday is also the last Sunday of the month, in which case it does not run
6. Fortnightly Prophetic Medicine Class (Tirimidhi) — 2nd Saturday
7. Fataawah Night / Q&A (group of scholars) — quarterly

Build lib/recurrence.ts using rrule, computing occurrences in Africa/Lagos
(UTC+1, no DST).

- /schedule — This Week / This Month views, all seven programmes
- /schedule/subscribe.ics — an iCal feed so people subscribe once from their
  phone and never miss a class
- /programmes/[slug] — one page each: what it covers, teacher, recurrence in
  plain English ("every second Saturday"), time, venue, language, whether free,
  past recordings, add-to-calendar
- A "Next class" widget for the dawah homepage

Programmes 4 and 6 both fall on 2nd Saturdays — render both clearly without
implying a clash.

Unit-test all seven rules across a full year: the "2nd Sunday is also the last
Sunday" case, months with five Mondays, and quarter boundaries.
```

---

# SESSION 10 — Dawah: teachers, library, ship

```
Finish dawah.assoutudeen.com.

- /teachers and /teachers/[slug] — Imam Engr. Abd'Waasi Tirmidhi A. (Abu
  Mubaashir) and Shaykh Yaaqub Muhibullah Abd'hammed Olore
- /library — recorded lectures grouped by programme and date, with notes and
  reading lists. Lite YouTube embeds only — never load the full player on page
  load.
- /about, /contact, dawah homepage with the Next Class widget
- Course/Event JSON-LD, sitemap, metadata
- Prominent link back to the foundation on every page

Then deploy the subdomain.
```

---

# SESSION 11 — Honey: shop

```
Build honey.assoutudeen.com's shop.

- /shop and /shop/[slug] — honey sold BY VOLUME IN LITRES, wholesale-oriented.
  Show retail and wholesale tiers; existing wholesale minimum is 5 litres.
  NAFDAC number displayed when available.
- Cart and Paystack checkout, reusing session 5's verified webhook
- Delivery zones and rates [TODO], leak-proof packaging note
- /our-honey — sourcing, apiaries, purity and testing
- /our-honey/identify-fake-honey — a proper long-form SEO page; high Nigerian
  search volume and it substantiates the "100% original" claim
- /our-honey/sunnah — the An-Nahl 16:68-69 framing and "Hold onto the two
  cures: honey and the Qur'an" drawn from the book

NAFDAC BOUNDARY: educational pages may quote Qur'an, hadith and Ibn al-Qayyim
freely. PRODUCT pages must not claim to treat, prevent or cure any disease.
Keep them on separate pages — never put the healing hadith on the buy button.

Product JSON-LD, /delivery, /returns.
```

---

# SESSION 12 — Honey: ambassador system, ship

```
Build the Ambassador system — this replaces a leaderboard AHE currently updates
by hand every two days on Facebook. Automating it is the highest-ROI single
feature on the platform.

1. /ambassadors — how it works, prize tiers pulled from the CMS (never
   hard-coded; the July 2026 contest ran ₦120,000 at 350 L down to ₦2,000
   tokens, and thresholds change between contests)
2. /ambassadors/register — creates an Ambassador with a unique code in the
   HONEY-NAME format (e.g. HONEY-KEMI, HONEY-LAGOS01)
3. /ambassadors/leaderboard — automated. Rank, name, total litres, distance to
   the next tier. Cached, recomputed on order confirmation.
4. /ambassadors/dashboard — login-gated: my code, my referred orders, my
   volume, my rank
5. Attribution rules, carried over from the existing contest terms:
   - Only customers with NO prior confirmed purchase count as new
   - One code per customer; first confirmed code wins on conflict
   - Minimum qualifying order 5 litres
   - Only paid and confirmed orders count
   - Employees and their immediate family are ineligible
6. Admin view: confirm orders, resolve attribution disputes, export results
7. /ambassadors/terms

Unit-test attribution: new-customer detection, first-code-wins conflicts, the
5-litre minimum, and leaderboard recomputation.

Then deploy honey.assoutudeen.com — and give me a post-launch checklist.
```

---

## Working notes

**Keep sessions scoped.** If Claude Code starts drifting into the next session's work, stop
it. Commit at the end of each session with a conventional commit message.

**When it asks for a fact you don't have**, say "use a placeholder and add it to
TODO-CONTENT.md". Never let it invent a CAC number, a price, a hadith citation, or a
beneficiary's name.

**Test on a real phone over mobile data** before each deploy, not just in a desktop browser
at 100 Mbps. That's what your audience is using.

**If a session goes badly**, `git reset --hard` to the last commit and re-run the prompt with
a note about what went wrong. Cheaper than trying to untangle it.
