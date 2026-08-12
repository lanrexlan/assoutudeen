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
17. **The 2023 surplus assistances.** docs/09 gives six assistances of ₦15,000–₦50,000
    each but not the individual amounts, so the seed records them as one reconciling line
    of ₦168,500. Supply the six figures and split the line.
18. **At-Tawbah 9:105 in Arabic.** The 2023 report seeds the reference and the English
    meaning; the Arabic field is deliberately empty until the text can be copied verbatim
    from the source with diacritics intact.
19. **Consent for the named 2023 beneficiaries.** The seeded appeal and report carry the
    names as APMF itself published them. Confirm the consent position before republishing
    them on the live site; everything else defaults to anonymous.
20. **Payload version pinning.** Payload 3.88 does not accept Next 15.5.x, so Next is
    pinned to exactly `15.4.11`. Revisit when Payload widens the peer range.
