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

11. **Honey hostname.** The brief says `honey.assoutudeen.com`; the session-1 request
    said `farms.assoutudeen.com`. Both currently resolve to the honey site
    (`src/lib/sites.ts`, `hostMatches`). Confirm which one is canonical, then drop the
    other or 301 it.
12. **Logo and favicon.** `public/` has no brand assets yet; the header uses a text
    wordmark and `src/app/favicon.ico` is still the Next.js default.
13. **Homepage and placeholder copy.** Every page under the three route groups is
    scaffold text, written to be obviously provisional. Real copy comes from
    `docs/03-Page-Content-Plan.md` in sessions 3 onwards.
14. **Arabic quotations.** The only Arabic currently in the codebase is the basmala on
    the foundation homepage. Every further āyah or hadith must be copied verbatim from
    the source with diacritics intact — never retyped.
15. **Social/OG images and site verification codes** for metadata in session 8.
