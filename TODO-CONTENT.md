# Content status

Every `[TODO: …]` marker has been removed from the site. Nothing on any page now
announces a gap: where a fact arrived it was used, where a decision was needed a
sensible default was written, and where something genuinely cannot be published
the page says what it *can* say instead.

This file is now a short record of what is settled and the handful of things
still worth a decision.

---

## Settled

**Registration** — CAC/IT/NO 139886, incorporated 28 November 2019 in Abuja.
Trustees: Wasiu Tirimisiy Adeniyi (Chairman), Akande Olanrewaju Subair
(Secretary), Taiwo Ridwan Ademola. Registered office No. 25, Agbonran Junction,
Olowobida Agip Area, Ede. All from the certificate; see `src/lib/organisation.ts`.

**Bank accounts** — Jaiz naira 0010939336 and Jaiz foreign 0011579597, SWIFT
JAIZNGLAXXX (`src/lib/banking.ts`), published on `/donate` and the accountability
page.

**The founder** — biography, credentials and teaching load in `src/lib/founder.ts`.

**The book** — *Treasure of the Prophetic Medicine* (`src/lib/book.ts`).

**The timetable** — Tafsir Fridays; Hadith and Prophetic Medicine on alternating
Saturdays; Fiqh, Virtues of the Companions and Qur'an and Modern Science on
Sundays; monthly seminar on the last Sunday; all between Maghrib and Isha
(`src/lib/programmes.ts`). Office hours Monday to Friday, 8:00–17:00.

**Logo** — the APMF emblem is inlined in `components/site/brand-mark.tsx` and set
alongside the wordmark in Montserrat, per `APMF_brand_guide.md`. The full asset
pack is served from `public/brand/` and linked as the press kit. The favicon is
`src/app/icon.svg`.

**Verses** — eight passages, each chosen for its page: the grain that grows seven
ears on the homepage, righteousness on About, spending night and day on Donate,
feeding the poor on Our Work, and the two healing verses on Prophetic Medicine.
All extracted verbatim from the Tanzil-derived `quran-json` dataset
(`src/lib/verses.ts`) — never retyped.

**Legal pages** — the placeholders are now written policy: legal bases, retention
periods, a 72-hour breach commitment, 30-day rights response, 48 hours to report
damage, 7 days to return a book, 7 working days to refund, Osun State
jurisdiction. They still say plainly that a Nigerian lawyer should review them
before the shop opens, which remains true.

**Requests for assistance** now run in rounds with a published deadline
(`src/lib/intake.ts`). The form only renders while a round is open, and the
server action refuses submissions outside one, so nothing lands in a queue
nobody is reading.

---

## Worth a decision, when you have a moment

1. **The empowerment gathering: monthly or quarterly?** Your note said both. The
   site currently says *last Saturday of the quarter*, Saturday mornings marked
   "proposed". One line to change either way.
2. **The intake round dates.** `CURRENT_ROUND` in `src/lib/intake.ts` is set to
   1–30 September 2026, decisions by 31 October. Set the real dates, or set it to
   `null` and the page says requests are closed and points to WhatsApp.
3. **Photographs.** Every image slot is original vector artwork, framed exactly as
   a photograph will be. Worth having: the founder's portrait, a teaching or
   distribution photograph for the hero, the book cover, and apiary shots for the
   honey site. The founder's slot is a deliberately featureless mannequin figure
   until his own portrait exists.
4. **Departmental mailboxes.** Only `info@assoutudeen.com` exists; the contact
   form's subject routing falls back to it (`src/lib/contact-routing.ts`).
5. **Testimonies.** Seven are published anonymously. Written consent from a sender
   is needed before any account can carry a name, and the disease-recovery
   accounts stay unpublished — see the reasoning in `src/lib/testimonies.ts`.
6. **The 2024 and 2025 report pages**, once those reports are written.
7. **Paystack.** `/donate` and `/empowerment/join` record intent and take
   transfers; card checkout needs the signed webhook work.
8. **Registered objects 5 and 6** mention distributing traditional herbal
   medicine, while the foundation sells honey only. Worth a compliance look, and
   possibly a CAC amendment.
