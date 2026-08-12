# 11 — The Monthly Empowerment Fund & Form Specifications

**Supersedes the Appeals model in earlier drafts.** Public appeals have stopped. Read this
before building anything in the "Our Work" section.

---

## What changed, and why it matters

The old model was **reactive**: a crisis appears, an appeal goes out, funds are raised for
one named person, the appeal closes. The 2023 report worked that way — 11 named
beneficiaries, ₦5,323,500.

The new model is **a standing monthly contribution circle**. From the founder's own message:

> *"I propose that we establish a monthly contribution fund dedicated to supporting them in
> their upkeep and maintenance… each member can donate any amount they deem convenient each
> month, ensuring we do not overburden ourselves."*

Three consequences for the website, all significant:

**1. The conversion goal changes from "donate once" to "join and pledge monthly."** A recurring
member at ₦5,000/month is worth ₦60,000 a year and costs nothing to re-acquire. Every design
decision on the main site should push toward membership, not a one-off gift.

**2. Beneficiary privacy is now the default.** Compare the reports: 2023 named Mr. Ayoola
Raheem, Yusuf Fatai Abolore and their diagnoses. 2024 and 2025 name nobody — they report
"4 blessed children", "a revert sister", "a kidnapped brother", by category. That is a
deliberate and correct shift. **Do not build named-beneficiary pages.** Report by category,
with permission-based exceptions only.

**3. Accountability moves from per-appeal to annual and monthly.** Transparency is still the
promise — *"the disbursement of funds will be conducted openly, with all contributors kept
informed"* — but it's delivered as periodic reporting to members, not as a public progress
bar.

The 2023 report stays online as historical record. Label it as the earlier model.

---

## Verified impact data

I checked the arithmetic on both reports. **Every category total sums exactly to the stated
annual figure** — 2024 to ₦3,838,500 and 2025 to ₦5,482,520, to the naira. That's unusual and
it's worth saying so publicly; most Nigerian NGO reports don't reconcile.

### Three-year total: ₦14,644,520

| Year | Total | Model |
|---|---|---|
| 2023 | ₦5,323,500 | Public appeals, 11 named beneficiaries |
| 2024 | ₦3,838,500 | Transition year |
| 2025 | ₦5,482,520 | Monthly fund, category reporting |

### 2024 — ₦3,838,500

| Category | Amount | Detail |
|---|---|---|
| Orphan support & education | ₦1,116,950 | ₦80,000/month feeding, books, welfare (= ₦960,000) + ₦156,950 school fees · 4 children in secondary school |
| Public da'wah outreach | ₦1,488,050 | Monthly empowerment programmes, Aug–Dec |
| Emergency medical assistance | ₦786,100 | C-section, hospital bills, major health crisis, support for a kidnapped brother |
| Emergency crisis support | ₦447,400 | Debt relief, vulnerable members, revert sister |

Highlight: orphan support expanded from 3 children to 4.

### 2025 — ₦5,482,520

| Category | Amount | Detail |
|---|---|---|
| Empowerment & equipment | ₦1,795,100 | Grinding machine, sewing machine, start-up equipment, training |
| Orphan support & education | ₦1,630,300 | Feeding, school and madrasah fees, welfare |
| Medical assistance & relief | ₦954,000 | Emergency bills, accident relief |
| Operational & logistics | ₦410,820 | Transport, fuel, event logistics |
| Public outreach | ₦322,300 | Ramadan Iftaar, tents, community outreach |
| Gadgets & infrastructure | ₦275,000 | Microphones, phones |
| Lectures & trainings | ₦95,000 | Guest fiqh and empowerment lecturers |

Note that 2025 **publishes its own overheads** — ₦410,820 operational, ₦275,000 gadgets.
Roughly 12.5% on running costs, disclosed voluntarily. Most organisations bury this. Show it
plainly on the report page with a one-line explanation; donors who notice will trust you
more, not less.

---

## Site structure for "Our Work"

```
/empowerment                    The Monthly Empowerment Fund — the flagship page
  /empowerment/join             Become a monthly contributor  ← primary conversion
  /empowerment/request          Request assistance            ← for those in need
  /empowerment/how-it-works     Verification, disbursement, reporting
/impact                         Impact reports index
  /impact/2025  /impact/2024  /impact/2023
```

### `/empowerment` — the flagship page

Sections in order:

1. **The founder's appeal, in his own words.** The voice-note message is the best copy on
   this project. Publish it as prose, keeping the Yoruba proverb — *"One tree does not make
   a forest"* — and the framing that people are drifting from the deen because they cannot
   meet basic needs. If you have the audio, embed it too; a voice note in the Imam's own
   voice will convert better than anything a copywriter could write.
2. **What the fund does** — orphan care and education, widow empowerment and trade
   facilitation, emergency medical relief, crisis support.
3. **Three-year proof** — ₦14,644,520 across 2023–2025, with the year cards linking to full
   reports.
4. **How contribution works** — any amount, monthly, no minimum, no obligation to overburden
   yourself, open disbursement, contributors kept informed.
5. **Two clear paths:** `Join the Fund` (primary) and `Request Assistance` (secondary but
   never hidden — the people who need it must find it easily).
6. **Suggested monthly tiers**, framed by what they actually do:
   - ₦2,000 — contributes to a child's monthly feeding
   - ₦5,000 — supports school materials
   - ₦10,000 — a share of one orphan's monthly upkeep (the fund spent ₦80,000/month on four
     children in 2024)
   - ₦25,000 — helps fund trade equipment for a widow
   - Custom — any amount
7. **The transparency promise**, stated plainly, with a link to the reports.

---

# Form 1 — Request Assistance

**Path:** `/empowerment/request` · **Purpose:** intake for people who need aid.

Design it for someone in distress, on a cheap phone, possibly with limited English and
limited literacy. That means: short, one question per screen on mobile, large text, no
jargon, WhatsApp as a fallback at every step, and no login.

### Section 1 — About you
| Field | Type | Required |
|---|---|---|
| Full name | text | ✅ |
| Phone number | tel, NG format | ✅ |
| WhatsApp number | tel, with "same as phone" checkbox | ✅ |
| Gender | select | ✅ |
| Age | number | |
| Marital status | select: married / widowed / divorced / single | ✅ |
| Number of dependants | number | ✅ |
| State | select | ✅ |
| LGA | text | ✅ |
| Town / area | text | |

### Section 2 — Your need
| Field | Type | Required |
|---|---|---|
| Category | select: orphan support / widow empowerment / medical / education / trade or business start-up / debt relief / food / shelter / other | ✅ |
| Describe your situation | textarea, min 50 chars, with a plain-language prompt | ✅ |
| Urgency | select: emergency (within days) / urgent (within a month) / ongoing need | ✅ |
| Amount or item needed | text — accepts "a sewing machine" as readily as a figure | ✅ |
| Have you received help from APMF before? | yes/no | ✅ |

### Section 3 — Supporting information
| Field | Type | Required |
|---|---|---|
| Documents | file upload, multiple, max 5 MB each — hospital bill, diagnosis, death certificate, school fee notice | |
| Referee name | text — an imam, community leader or someone who can vouch | ✅ |
| Referee phone | tel | ✅ |
| Referee relationship | text | ✅ |

### Section 4 — Consent (all unticked by default, NDPA requirement)
- ☐ I confirm the information I have given is true *(required)*
- ☐ I consent to APMF storing my information to assess this request *(required)*
- ☐ I agree APMF may contact my referee to verify *(required)*
- ☐ I am willing for my story to be shared publicly to encourage donors — **name shown**
- ☐ I am willing for my story to be shared **anonymously** (no name, no photo)

Those last two must be genuinely optional. Default to anonymity in every published report;
2024 and 2025 already do this and it's the right instinct.

### Behaviour
- Saves to a `AssistanceRequest` collection with status: `new → under-review → verified →
  approved → assisted → declined`, plus internal reviewer notes never exposed publicly
- Email and WhatsApp notification to admin on submission
- Confirmation screen: *"We have received your request. Someone will contact you within
  [X] days. If your situation is an emergency, call 08161882470."*
- Rate-limited, Turnstile-protected
- **Health data is a special category under NDPA 2023** — encrypt at rest, restrict admin
  access to named roles, define a retention period and honour it
- Multi-step on mobile with progress saved to `localStorage` so a dropped connection doesn't
  lose everything
- Prominent alternative: *"Prefer to speak to someone? Message us on WhatsApp"*

---

# Form 2 — Join the Monthly Fund

**Path:** `/empowerment/join` · **Purpose:** the site's primary conversion.

Keep it short. Every extra field costs you members.

### Section 1 — Your details
| Field | Type | Required |
|---|---|---|
| Full name | text | ✅ |
| Phone / WhatsApp | tel, international format for diaspora | ✅ |
| Email | email | ✅ |
| Country | select, default Nigeria | ✅ |
| City / State | text | |

### Section 2 — Your contribution
| Field | Type | Required |
|---|---|---|
| Monthly amount | preset chips ₦2,000 / ₦5,000 / ₦10,000 / ₦25,000 / ₦50,000 / custom | ✅ |
| Payment method | Paystack auto-debit **or** manual monthly transfer | ✅ |
| Preferred start | this month / next month | ✅ |
| Designation | select: general fund / orphan care / widow empowerment / medical relief / zakat | ✅ |
| Anonymous giving | checkbox | |

**Support both payment paths.** Paystack subscriptions retain far better, but the founder's
own message asks people to *reply with the amount they intend to contribute* — a relational,
trust-based flow. Some contributors, especially older and senior community members, will
want to transfer manually and be thanked personally. Forcing a card on them will lose them.
For manual givers, record the pledge and send a WhatsApp reminder each month.

### Section 3 — Communication
- ☐ Add me to the APMF contributors WhatsApp group
- ☐ Send me the monthly disbursement report
- ☐ Send me the annual impact report
- ☐ I consent to APMF storing my details *(required)*

### Behaviour
- Creates a `Member` record: pledge amount, method, designation, status
  (`pending → active → lapsed → cancelled`), start date, lifetime total
- Paystack path → subscription created, first charge, receipt emailed
- Manual path → bank details shown (Jaiz Bank 0010939336 **[confirm]**), pledge recorded,
  monthly WhatsApp reminder scheduled
- Welcome email plus a WhatsApp group invite link
- **Zakat designation goes to a separate ledger** — never pooled
- Member dashboard *(phase 2)*: my pledge, my giving history, my receipts, update or pause

### Admin needs
A members view showing active count, total monthly committed, this month's collections
against pledges, lapsed members needing follow-up, and a WhatsApp broadcast export. The
"pledged but not yet paid this month" list is the single most useful screen you'll build —
it turns a vague sense that collections are down into a specific list of five people to
message.

---

# Impact report pages

`/impact/[year]`, generated from a CMS collection so future years need no code.

Structure, following your existing format:

- Bismillah, salaam, and the Sahih Muslim hadith about relieving a believer's distress
- **Headline total** for the year
- **Category cards** — amount, icon, description, and the detail lines
- A chart showing the category split
- Highlights list
- The verification note: *"All figures reflect verified expenditures recorded from January
  to December."*
- Overheads shown honestly where they exist (2025: ₦410,820 operational, ₦275,000 gadgets)
- Closing du'a and the contact line
- **Share on WhatsApp** — pre-formatted, keeping your emoji layout, ending with the contact
  number. These reports already circulate on WhatsApp; make the site the canonical link
  people forward.
- `Join the Fund` call to action at the bottom of every report

The `/impact` index shows all years, the three-year cumulative total, and a simple line
chart of annual impact.

**Keep the emoji formatting.** It reads as warm and familiar to your audience on WhatsApp.
Render it a little more restrained on the web — the emoji as section icons rather than
inline in every line — but don't strip the character out of it.

---

## Naming — needs your confirmation

The voice note opens: *"I am Tirimidhi Assoutudeen Abu Mubaashir, known by many as
Assoutudeen."* The book's title page reads **Abd'Waasi Tirmidhi A. (Abu Mubaashir)**, and
your programme list says **Imam Engr. Tirimidhi Abd'waasi**.

So "Assoutudeen" is part of his name as well as the organisation's — my earlier correction
was wrong. Please give me the exact form to use everywhere, including how the honorifics
(Imam, Engr.) should be ordered. Consistency across the site, the book page and the
programme listings matters for both credibility and search.
