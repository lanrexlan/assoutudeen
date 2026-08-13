# TODO — content and decisions still needed

Anything unknown is scaffolded as a clearly-marked placeholder rather than invented.
Add answers here as they are confirmed, then remove the item.

## Open from the handover (docs/09)

1. CAC registration number and incorporation date
2. Board of trustees — names and roles
3. Book price and formats (paperback / PDF / EPUB)
4. Honey price list, pack sizes, delivery zones and rates
5. Class times, venue or platform, and language for the seven programmes
6. 2024 and 2025 accountability reports
7. Photo and story consent status (nothing named is published without recorded consent)
8. Whether the ambassador contest becomes a permanent programme
9. Whether AHE profits fund APMF, and whether to state it publicly
10. Confirmation that Jaiz 0010939336 is the public donation account

## Raised by this scaffold (session 1)

11. ~~Honey hostname.~~ **Resolved: `farms.assoutudeen.com` is canonical.**
    `honey.assoutudeen.com` still resolves to the same site as an alias; set up a 301
    from it to `farms.` in DNS/Vercel before launch, and correct `docs/09`, which
    predates the decision.
12. **Logo and favicon.** `public/` has no brand assets yet; the header uses a text
    wordmark and `src/app/favicon.ico` is still the Next.js default.
13. **Homepage and placeholder copy.** Every page under the three route groups is
    scaffold text, written to be obviously provisional. Real copy comes from
    `docs/03-Page-Content-Plan.md` in sessions 3 onwards.
14. **Arabic quotations.** The only Arabic currently in the codebase is the basmala on
    the foundation homepage. Every further āyah or hadith must be copied verbatim from
    the source with diacritics intact — never retyped.
15. **Social/OG images and site verification codes** for metadata in session 8.

## Raised by the CMS (session 2)

16. **Neon and Cloudinary credentials.** `DATABASE_URI`, `PAYLOAD_SECRET` and the three
    `CLOUDINARY_*` values are needed in `.env.local` and in Vercel. Uploads stay on local
    disk until Cloudinary is configured.
17. ~~The 2023 surplus assistances.~~ **Resolved from docs/01**, which itemises all six
    (₦20,000 · ₦40,000 · ₦20,000 · ₦15,000 · ₦23,500 · ₦50,000 = ₦168,500). The seed now
    carries them as six separate lines and the report still reconciles.
18. **At-Tawbah 9:105 in Arabic.** The 2023 report seeds the reference and the English
    meaning; the Arabic field is deliberately empty until the text can be copied verbatim
    from the source with diacritics intact.
19. **Consent for the named 2023 beneficiaries.** The seeded appeal and report carry the
    names as APMF itself published them. Confirm the consent position before republishing
    them on the live site; everything else defaults to anonymous.
20. **Payload version pinning.** Payload 3.88 does not accept Next 15.5.x, so Next is
    pinned to exactly `15.4.11`. Revisit when Payload widens the peer range.

## Raised by the foundation pages (session 3)

Every one of these appears on a page as a visible `[TODO: …]` marker, so nothing can be
mistaken for a real value. Search the codebase for `<Todo>` to find them all.

### Blocking before launch
21. ~~CAC registration number and date of incorporation.~~ **Resolved from the
    certificate of incorporation:** CAC/IT/NO 139886, incorporated 28 November 2019 in
    Abuja. Now shown on About, Structure, Accountability, Privacy and in the footer of
    all three sites (`src/lib/organisation.ts`).
22. ~~Board of trustees.~~ **Resolved from the certificate:** Wasiu Tirimisiy Adeniyi
    (Chairman), Akande Olanrewaju Subair (Secretary), Taiwo Ridwan Ademola. Their
    personal phone numbers appear on the filed form but are deliberately **not**
    published. Still open: who holds the other constitutional offices (Financial
    Secretary, Treasurer, Auditor and the rest).
23. **Bank transfer details.** docs/01 gives Jaiz Bank 0010939336 marked "verify before
    publishing", so the Accountability page deliberately does **not** print it — a wrong
    digit on a public donations page misdirects a stranger's money. Confirm the bank,
    account name and number and it goes straight in.
24. **A named financial contact** — person, role and a direct email — for the
    Accountability page.
25. **Data protection contact** for the privacy policy, plus whether APMF meets the NDPC
    registration threshold and needs a DPO.

### Founder page (currently mostly placeholders)
26. Full biography, Islamic education and teachers, the engineering degree behind the
    "Engr." title, any health-related qualifications, years of practice, speaking
    engagements, and a portrait photograph.

### Structure page
27. Is AHE separately registered with the CAC? Do AHE profits fund APMF, and if so in
    what proportion? The page says plainly that it will state this once known.

### Addresses
28a. **Two addresses are now in play.** The CAC registered office is *No. 25, Agbonran
    Junction, Olowobida Agip Area, Ede*, while the operating address in docs/01 is
    *Assoutudeen Street, Zone 5, Fiwasaye Community, Ede*. Both are shown, labelled —
    registered office on the Accountability page, operating address everywhere else.
    Confirm that is correct, and that post reaches the operating address.

### Contact page
28. Office hours and whether visits need an appointment.
29. Social links — Facebook, WhatsApp community, YouTube, Instagram, TikTok.
30. **Exact office coordinates or plus code.** The map shows Ede town, not a pin: no
    street-level location was supplied and guessing one sends visitors to the wrong
    place.
31. **Departmental mailboxes.** Only `info@assoutudeen.com` is confirmed. The subject
    dropdown routes to consultation@, donations@, media@, sales@ and dawah@ — all
    currently falling back to info@ until those mailboxes exist
    (`src/lib/contact-routing.ts`).

### Legal pages (shells, drafted from docs/06)
32. All four need a lawyer's review before the site takes a payment. Specific gaps:
    legal-basis table and retention periods (privacy); VAT treatment, order acceptance,
    liability and jurisdiction (terms); delivery zones, rates and timeframes (delivery);
    returns windows and who pays return delivery (returns).
33. **Cookie decision.** If analytics are added, a cookie banner with a genuine decline
    option is required before it loads.

### Content
34. The āyāt and hadith for the About page's values section, to be copied verbatim with
    diacritics intact.
35. A photograph of the team or office for the About page.

## Raised by the redesign (session 4)

36. **Logo.** The header, footer and hero use an interim geometric mark
    (`components/site/brand-mark.tsx`) — an eight-point khatim star inside a mihrab
    arch. Swapping in the real logo is a one-component change.
37. **Hero photograph.** The arch beside the headline frames a placeholder. docs/03 asks
    for the founder teaching or a distribution in progress — not stock honey.
38. **Registered objects 5 and 6** mention distributing traditional herbal medicine,
    while APMF now sells honey only and makes no herbal-drug claims. The About page
    presents all twelve as the *registered constitution* rather than as current
    activity. Worth a compliance note before launch, and possibly a CAC amendment if
    the objects no longer describe the work.
39. **Certificate of incorporation as a downloadable PDF** for the Accountability page.
40. **Consent checkboxes are 24px controls** rather than 44px. Their labels are the tap
    target and toggle them, which meets the intent, but a custom control would satisfy
    the letter of the rule too.
