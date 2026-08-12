# 02 — Information Architecture, Navigation & Subdomains

## Domain strategy

### Primary domain — decided

**`assoutudeen.com`** — already registered. ✅

Keep `thepropheticmedicine.com.ng` and 301-redirect every one of its URLs to the new site so
you don't lose existing search rankings or traffic from printed materials.

Optionally register defensively later (roughly ₦8,000–₦25,000/year each): `assoutudeen.com`,
`assoutudeen.com.ng`, `assoutudeen.ng`. Not urgent. If you later want the non-profit signal
of `.org.ng`, note that NiRA requires proof of not-for-profit status, so you'll need the CAC
certificate.

### Subdomain map

| Subdomain | Entity | Purpose |
|---|---|---|
| `assoutudeen.com` | APMF | Foundation home — mission, appeals, book, donations, articles |
| `dawah.assoutudeen.com` | Assoutudeen Dawah Institute | Programme schedule, lecture library, teachers |
| `honey.assoutudeen.com` | Assoutudeen Honey Enterprise | Product catalogue, ordering, ambassador programme |
| `mail.assoutudeen.com` | — | Zoho Mail or Google Workspace — replaces the `@gail.com` address |

**Subdomain vs subfolder — the honest trade-off.** Subfolders (`assoutudeen.com/dawah`)
consolidate SEO authority into one domain and are simpler to run. Subdomains are treated by
search engines as more separate, so each has to earn its own ranking. But you specifically
asked for a subdomain, and it's the right call here for three reasons: the Institute and the
Enterprise are distinct entities with distinct audiences, a commercial honey business under
a charity's main domain muddies both brands, and separation gives you a clean path to spin
either one out later. Mitigate the SEO cost by cross-linking heavily between the three and
keeping one shared header that makes the family relationship obvious.

**Build them as one codebase.** All three run from a single Next.js project using
middleware-based subdomain routing and one shared component library. One deploy, one design
system, one CMS, three front doors. Do not build three separate websites — that triples
maintenance for no benefit.

---

## Main site navigation (`assoutudeen.com`)

Keep the top bar to six items plus a donate button. More than seven and people stop reading
the menu.

```
[APMF logo]   About ▾   Our Work ▾   Prophetic Medicine ▾   Shop ▾   Media ▾   Contact
                                                             [ Donate ]  🔍  EN/AR
```

### About ▾
- Who We Are — mission, vision, values
- The Founder — Imam Engr. Abd'Waasi Tirmidhi (Abu Mubaashir) — story, credentials, teachers
- Our Structure — APMF, the Da'wah Institute, the Honey Enterprise, and how they relate
- Board of Trustees & Team
- Accountability — registration, annual report, how funds are used
- Partners & Affiliations

### Our Work ▾
- **Appeals** ← the flagship. Fundraising cases for sick and vulnerable Muslims.
  - Active Appeals (with target vs raised progress)
  - Closed Appeals (archive, with outcomes)
  - Request Assistance (apply)
  - How Appeals Work — verification, disbursement, reporting
- **Accountability Reports** — one per fiscal year: 2023, 2024, 2025…
- Monthly Empowerment Programme (last Monday of each month)
- Free Health Counselling
- Ruqyah & Spiritual Support
- Community Outreach

### Prophetic Medicine ▾
- What Is Prophetic Medicine — the foundational explainer
- Remedies Library — black seed, honey, hijama, senna, dates, zamzam, olive oil…
- Articles & Research
- Frequently Asked Questions
- Book a Consultation

### Shop ▾
- **The Book** — dedicated landing page, the main commercial goal on this domain
- Honey & Products → links out to `honey.assoutudeen.com`
- Course Enrolment → links out to `dawah.assoutudeen.com`
- My Orders

### Media ▾
- News & Announcements
- Photo Gallery
- Video & Lectures
- Events Calendar
- Newsletter Signup

### Persistent utility elements
- **Donate** button, visually distinct, present on every page including mobile
- Sticky WhatsApp button, bottom-right on mobile — in Nigeria this converts better than any
  contact form
- Language toggle (English / العربية) if you'll publish Arabic content
- Search

### Footer (four columns)
1. **About** — short mission statement, CAC registration number, logo
2. **Quick Links** — Empowerment, Donate, Book, Courses, Honey, Contact
3. **Contact** — address, phone, email, office hours, prayer-time-aware note if relevant
4. **Stay Connected** — newsletter form, Facebook / WhatsApp / YouTube / Instagram / TikTok

Footer bottom bar: © APMF 2026 · Privacy Policy · Terms · Refund & Shipping Policy ·
NDPA Compliance Statement

---

## Da'wah Institute navigation (`dawah.assoutudeen.com`)

```
[ADI logo]   Programmes   Schedule   Teachers   Library   About   Contact
                                    [ Join a Class ]   [ ← Back to Foundation ]
```

This is a **recurring class schedule**, not a degree college — so the architecture is a
calendar plus an archive, not an admissions funnel.

- **Programmes** — one page per programme, seven in total:
  1. APMF Monthly Empowerment Programme & Special Lecture — last Monday
  2. Monthly Special Fiqh Seminar (Shaykh Yaaqub Muhibullah Abd'hammed Olore) — last Sunday
  3. Weekly Tafsir Session (Imam Engr. Tirimidhi Abd'waasi) — Fridays
  4. Fortnightly Hadith Session — 2nd Saturday
  5. Fortnightly Tawheed Class — 2nd Sunday
  6. Fortnightly Prophetic Medicine Class — 2nd Saturday
  7. Fataawah Night / Q&A with a group of scholars — quarterly

  Each page: what it covers, teacher, day rule, time, venue or platform, language, whether
  it's free, past recordings, and a "Remind me" / WhatsApp group join button.

- **Schedule** — the centrepiece. A **generated calendar** that computes the next occurrence
  of every programme from its recurrence rule, so it is never out of date. Show "This week",
  "This month", and a downloadable `.ics` subscription so people can add the whole schedule
  to their phone calendar once and never miss a class.
- **Teachers** — Imam Engr. Abd'Waasi Tirmidhi (Abu Mubaashir) and Shaykh Yaaqub Muhibullah
  Abd'hammed Olore, with full bios, credentials and photographs.
- **Library** — recorded lectures grouped by programme and date, notes, reading list.
  Over time this becomes the Institute's most valuable asset.
- **About** — mandate, history, how it sits under APMF.
- Prominent **"← Part of Assoutudeen Prophetic Medicine Foundation"** link back.

*Note: programmes 4 and 6 both fall on 2nd Saturdays. Confirm the times so the calendar
doesn't display an apparent clash.*

---

## Honey Enterprise navigation (`honey.assoutudeen.com`)

```
[AHE logo]   Shop   Our Honey ▾   Ambassadors ▾   About   Contact
                                    [ 🛒 Cart ]   [ ← Back to Foundation ]
```

- **Shop** — pack sizes and litre volumes, retail and wholesale pricing, bulk enquiry.
  Note the existing model: wholesale by the litre, **5 L minimum qualifying order**.
- **Our Honey** — sourcing and apiaries · purity and testing · **How to Identify Fake Honey**
  (very high search volume in Nigeria, and it directly supports your "100% original" claim) ·
  storage and usage · the An-Nahl 16:68–69 framing drawn from the book
- **Ambassadors** — the referral programme, formalised from the July 2026 contest:
  - How It Works — get a code, share it, earn
  - **Live Leaderboard** — automated, replacing the manual Facebook updates
  - Register as an Ambassador (form)
  - Ambassador Login — personal dashboard: my code, referred orders, volume, rank
  - Rules & Terms
- **About** — relationship to the foundation, and a plain statement of how honey profits
  support the appeals work
- Product pages need: photos from several angles, size and price, NAFDAC number if
  registered, ingredients, shelf life, delivery estimate, reviews

---

## User journeys the architecture must serve

Design each of these as a deliberate path, not an accident:

| Visitor | Their goal | Path the site should offer |
|---|---|---|
| Sick person seeking help | Find a remedy or book a consultation | Home → Prophetic Medicine → Remedies or Book Consultation → WhatsApp/form |
| Potential donor | Verify legitimacy, then give | Home → Empowerment → Beneficiary Stories → Accountability → Donate |
| Book buyer | Read a sample, buy | Home or ad → Book page → sample chapter → Paystack checkout |
| Prospective student | Compare courses, enrol | Home → Courses → dawah subdomain → course page → enrol |
| Honey customer | Confirm purity, order | Home or ad → honey subdomain → product → cart → Paystack |
| Aspiring distributor | Understand margins, apply | honey subdomain → Become a Distributor → application form |
| Empowerment applicant | Check eligibility, apply | Home → Empowerment → How It Works → Apply |
| Journalist or partner | Get facts and contacts | About → Accountability → Media/Press → Contact |

---

## Mobile-first is not optional

The overwhelming majority of your traffic will be Nigerian users on mid-range Android phones
over patchy mobile data. That has hard consequences for the build:

- Design the mobile layout first, then scale up to desktop
- Total page weight budget: under 1 MB for the homepage
- Every image served as WebP/AVIF, lazy-loaded, correctly sized
- Hamburger menu with the Donate button *outside* it, always visible
- Tap targets 44×44px minimum
- Test on a throttled 3G connection before launch, not after
