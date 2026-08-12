# 01 — Discovery Brief *(revised 12 Aug 2026 with Habeeb's input)*

Supersedes the first draft. Facts below now come from you directly, from the book PDF, from
the AHE contest pack, and from the foundation's reference form — not from guesswork.

---

## Confirmed facts

| Field | Value |
|---|---|
| Organisation | Assoutudeen Prophetic Medicine Foundation (APMF) |
| Domain | **assoutudeen.com** — already registered ✅ |
| Address | Assoutudeen Street, Zone 5, Fiwasaye Community, Ede, Osun State |
| Phone / WhatsApp | 08161882470 |
| Bank | Jaiz Bank, 0010939336 *(verify before publishing)* |
| Founder / Author / Chief Instructor | **Imam Engr. Abd'Waasi Tirmidhi A. (Abu Mubaashir)** |
| Legacy site | thepropheticmedicine.com.ng — to be 301-redirected |

**Correction to the first draft:** the founder is Abd'Waasi Tirmidhi (Abu Mubaashir).
"Assoutudeen" is the organisation's name, not a personal name. The earlier reference to
Kwara State was wrong — you're in Osun State. And the `@gail.com` email typo on the old site
still needs fixing; move to `info@assoutudeen.com`.

**Still needed:** CAC registration number · date founded · trustees/board list · whether AHE
is separately registered · confirmation the Jaiz account is the public donation account.

---

## 1. The Da'wah Institute — seven recurring programmes

This is a **recurring class and lecture schedule**, not a semester-based college. That
materially changes the build: the Institute needs a **schedule and archive**, not an
admissions funnel.

| # | Programme | Teacher | Cadence |
|---|---|---|---|
| 1 | APMF Monthly Empowerment Programme & Special Lecture | — | Last Monday of each month |
| 2 | Monthly Special Fiqh Seminar | Shaykh Yaaqub Muhibullah Abd'hammed Olore | Last Sunday of each month |
| 3 | Weekly Tafsir Session | Imam Engr. Tirimidhi Abd'waasi | Every Friday |
| 4 | Fortnightly Hadith Session | Imam Engr. Tirimidhi Abd'waasi | 2nd Saturday |
| 5 | Fortnightly Tawheed Class | Imam Engr. Tirimidhi Abd'waasi | 2nd Sunday (not last Sunday) |
| 6 | Fortnightly Prophetic Medicine Class | Imam Engr. Tirimidhi Abd'waasi | 2nd Saturday |
| 7 | Fataawah Night / Q&A | Group of scholars | Quarterly |

**Design consequence:** build an **auto-generating recurring events calendar**. Because every
programme follows a rule ("last Monday", "2nd Saturday"), the site can compute the next
occurrence of all seven forever, with no manual data entry. This is the single highest-value
feature on the dawah subdomain — the page is never stale, and "What's on this week?" answers
itself.

Note that #4 and #6 both fall on 2nd Saturdays — confirm the times so they don't appear to
clash.

**Still needed:** start times, venue (physical, Zoom, WhatsApp, Facebook Live?), language of
instruction, whether attendance is free, and bios for Shaykh Yaaqub Muhibullah Abd'hammed
Olore and Imam Tirimidhi.

---

## 2. Products — honey only

Confirmed: **APMF/AHE sells honey. No herbal drugs.**

This substantially reduces regulatory exposure. NAFDAC herbal-medicine registration and
advertisement pre-approval do not apply to you. Honey is a food product — it still needs
NAFDAC food registration if sold packaged and commercially, and food-labelling rules still
prohibit disease claims, but the heavy herbal-medicine regime is off the table.

Doc 06 has been narrowed accordingly. The remaining rule is simple: **the book and the
articles may quote the Qur'an, the hadith and Ibn al-Qayyim freely; the honey product pages
may not claim to treat disease.** Keep education and commerce on separate pages.

### AHE's actual commercial model

From the Honey Ambassador Contest pack (July 2026):

- Honey sold **by volume in litres**, wholesale orientation, **5 L minimum qualifying order**
- Customers order by contacting AHE directly — currently no online checkout
- An **ambassador referral programme** using personal codes (`HONEY-KEMI`, `HONEY-LAGOS01`)
- A **live leaderboard** with volume-based prize tiers (₦120,000 first place at 350 L,
  ₦30,000 fourth, down to ₦2,000 tokens), updated manually every two days and published on
  a Facebook page
- Only *new* customers count toward a referral; one code per customer

**Design consequence:** the honey subdomain isn't a simple shop. It needs a referral-code
system, per-ambassador tracking, and an automated public leaderboard. You are currently
running that leaderboard by hand on Facebook — automating it is probably the highest
immediate ROI on the entire project.

**Still needed:** current price list per litre and per pack size, available sizes, delivery
zones and rates, courier, NAFDAC number if registered, whether the contest becomes a
permanent programme.

---

## 3. The empowerment programme — it's a medical appeal model

The 2023 fiscal-year report reframes this completely. APMF does not primarily hand out
grants. **It runs public fundraising appeals for sick and vulnerable Muslims, then publishes
a full accounting of what was raised.** Your credibility rests on radical transparency —
including publishing shortfalls.

### 2023 documented appeals

| Beneficiary | Date | Need | Raised | Target |
|---|---|---|---|---|
| Mr. Ayoola Raheem | Feb 2023 | Cerebral angiography, brain injury — UCH Ibadan | ₦1,690,000 | ₦2,000,000 |
| A divorcee with 8 children | Aug 2023 | Financial stability empowerment | ₦340,000 | ₦500,000 |
| A revert sister | Sep 2023 | Malaria, jinn possession, shelter, clothing — Muslim Hospital Ede + ruqyah | ₦90,000 + clothing, jilbab, niqab | — |
| Baba Jubril Kuye (marhum) | Dec 2023 | Borehole project | Family-funded, APMF-supervised | — |
| Yusuf Fatai Abolore | Dec 2023 | Kidney transplant — St. Nicholas, Lagos | ₦3,035,000 | ₦22,000,000 |

Plus, from surplus funds: ₦20,000 vulnerable sister · ₦40,000 revert sister · ₦20,000 child's
leg surgery · ₦15,000 caesarean delivery · ₦23,500 brother's debts · ₦50,000 struggling
brother.

**Total documented for 2023: roughly ₦5,323,500 across 11 beneficiaries.**

And the line that matters most: *"For anyone interested in bank statements of the foundation
for the past calendar year, kindly message us, we will provide you with that."* Offering
open books is rare and it is your strongest differentiator. The website should say it
loudly.

### Design consequences

1. **Appeals are the core content type**, not blog posts. Each needs its own page with:
   beneficiary name (or "a sister who wishes to remain anonymous"), date opened, need,
   hospital or purpose, **target amount, amount raised, a progress bar**, status
   (Active / Closed / Partially Met), how funds were disbursed, and an outcome update.
2. **Publish shortfalls honestly.** ₦3.035m raised against a ₦22m kidney transplant target
   is not a failure to hide — it is proof you report reality. Donors trust organisations
   that show the gap.
3. **Annual Accountability Reports** as a first-class section: 2023, 2024, 2025, 2026, each
   in the format of your existing broadcast, with the totals and the beneficiary table.
4. **Islamic framing throughout** — the Surah At-Tawbah 9:105 verse you use, the du'a for
   donors, and the "Kindly Rebroadcast" instinct. Build a **share-to-WhatsApp button** on
   every appeal that pre-fills a formatted broadcast message. Your distribution already runs
   on WhatsApp broadcast; the site should feed it, not compete with it.

**Still needed:** 2024 and 2025 reports if they exist · which appeals are currently open ·
photo consent status for named beneficiaries · your policy on anonymity.

---

## 4. The book — *Endless Blessings From The Creator*

Read from the PDF you supplied.

| Field | Value |
|---|---|
| Title | **Endless Blessings From The Creator** |
| Author | Abd'Waasi Tirmidhi A. (Abu Mubaashir) |
| Length | 175 pages |
| First produced | August 2023 |
| Structure | ~45 chapters, one per natural remedy |
| Method per chapter | Qur'anic verse → hadith with source citation → Ibn al-Qayyim / *At-Tibb an-Nabawiyy* commentary → nutritional composition → traditional uses → footnoted references |

**Contents:** olive oil (zaitūn) · black seed (habbatus saudā) · **honey (al-'asal)** · water ·
zamzam · rainwater (ghayth) · garlic · salt · vinegar · barley/talbīna · dates · fenugreek ·
ambergris · lemongrass · mushroom · senna · parsley · musk · cucumber · warss · ginger ·
aloe vera · arum · milk · fig · cress · henna · myrrh · pomegranate · kohl (ithmid) ·
sugarcane · myrtle/basil · banana · watermelon · celery · raisins · thyme · arak fruit ·
miswāk · beetroot · citron · lote tree (sidr) · agarwood ('oud) · butter · egg · bread ·
fish. Plus ruqyah material toward the end (Sūrah al-Jinn and others).

**Two things this unlocks:**

- **The book is the Remedies Library.** Each chapter becomes a web page. That's ~45 pages of
  genuinely authoritative, well-referenced, long-tail SEO content that nobody else in
  Nigeria has. "Black seed benefits in Islam", "zamzam water benefits", "benefits of miswāk"
  — these are searched constantly. Publish 10–15 chapters free as the library, keep the rest
  behind the purchase. The free chapters sell the book better than any sales copy.
- **The honey chapter is your product page's foundation.** An-Nahl 16:68–69 and *"Hold onto
  the two cures: honey and the Qur'an"* are the strongest possible framing for AHE — and
  they're educational quotation, not a product health claim. Put them on the honey
  subdomain's "Our Honey" page, not on the buy button.

**Still needed:** price in ₦ · formats (paperback / PDF / EPUB) · cover image file · ISBN if
any · who fulfils physical orders · which chapters to publish free · whether an English-only
edition or also Yoruba/Arabic.

---

## 5. Open questions still blocking the build

1. CAC registration number and date of incorporation
2. Board of trustees — names and roles
3. Book price and format
4. Honey price list and pack sizes
5. Programme times and venue/platform for the seven classes
6. Whether the ambassador contest becomes permanent
7. Which appeals are open right now
8. 2024 and 2025 accountability reports
9. Photo and story consent for named beneficiaries
10. Who besides you will update the site
