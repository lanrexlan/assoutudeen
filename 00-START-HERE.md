# APMF Website Project — Start Here

**Prepared for:** Assoutudeen Prophetic Medicine Foundation (APMF)
**Revised:** 12 August 2026 — updated with Habeeb's programme list, empowerment report and
the book PDF
**Build route:** self-build with Claude Code

---

## What's in this folder

| File | What it covers |
|---|---|
| `00-START-HERE.md` | This overview |
| `01-Discovery-Brief.md` | Confirmed facts, the seven programmes, the appeals model, the book |
| `02-Information-Architecture.md` | Sitemap, navigation, subdomain strategy |
| `03-Page-Content-Plan.md` | Page-by-page: what goes on every screen |
| `04-Technical-Specification.md` | Stack, CMS, payments, hosting, DNS, integrations |
| `05-Design-and-Brand.md` | Visual direction, typography, colour, imagery, Arabic support |
| `06-Compliance-and-Trust.md` | NDPA, NAFDAC (narrowed — honey only), donation transparency |
| `07-Budget-and-Roadmap.md` | Revised costs, 12-session self-build plan |
| `08-Content-Checklist.md` | What to gather before you start building |
| **`09-Claude-Code-Handover.md`** | **The build brief — give this to Claude Code** |
| **`10-Session-Prompts.md`** | **12 copy-paste prompts, one per build session** |
| **`11-Empowerment-Model-and-Forms.md`** | **The monthly fund, both form specs, impact data** |
| `12-GitHub-Guide.md` | What to commit, what never to commit, repo setup |
| **`CLAUDE.md`** | **Copy to the repo root; Claude Code reads it every session** |
| `Endless_Blessings_From_the_Creator.pdf` | The book — source for the Remedies Library |

---

## The one-paragraph summary

Build **assoutudeen.com** as one Next.js codebase on Vercel with Payload CMS, serving three
front doors: the foundation, **dawah.assoutudeen.com** for the seven recurring classes, and
**honey.assoutudeen.com** for the honey business and its ambassador programme. Paystack
handles the book, the honey and donations. Twelve Claude Code sessions, roughly three months
at a session or two a week. Launch the main site after session 8 rather than waiting for all
three.

Revised budget with you building it: **₦330,000–₦1,445,000** one-off (mostly photography,
legal and NAFDAC registration — no development cost), plus **₦150,000–₦400,000/year** to run.

---

## What changed in this revision

- **Domain confirmed:** `assoutudeen.com`, already registered
- **Founder corrected:** Imam Engr. **Abd'Waasi Tirmidhi A. (Abu Mubaashir)**. Osun State,
  not Kwara.
- **The Da'wah Institute is a class schedule, not a college.** Seven recurring programmes on
  rules like "last Monday" and "2nd Saturday" — so the site should *compute* the calendar and
  never go stale.
- **The empowerment programme is a fundraising appeal model.** Named cases, published targets
  and totals, honest shortfalls, annual accounting. That's now the flagship section, and it
  changes the whole architecture.
- **NAFDAC risk dropped sharply** — honey only, no herbal drugs. The herbal advertising
  regime doesn't apply to you. See doc 06.
- **The book is a major asset.** 175 pages, ~45 remedies, each with Qur'an, hadith citations
  and Ibn al-Qayyim commentary. Publish 10–15 chapters free — they become both your SEO
  engine and your best sales pitch.

---

## The three things worth doing first

**1. Automate the honey leaderboard.** You are currently updating it by hand every two days
on Facebook. That's the clearest immediate return on this whole project.

**2. Build the WhatsApp share button into every appeal.** Your distribution already runs on
rebroadcast — the site should feed that habit, not compete with it.

**3. Publish the 2023 accountability report as a web page.** Offering bank statements on
request is rare and it is your strongest differentiator. Right now it lives in a WhatsApp
broadcast that nobody can find.
