# Assoutudeen web platform

One Next.js 15 codebase serving three sites:

| Hostname | Entity | Route group |
|---|---|---|
| `assoutudeen.com` | Assoutudeen Prophetic Medicine Foundation (APMF) — **main site** | `(foundation)` |
| `dawah.assoutudeen.com` | Assoutudeen Dawah Institute (ADI) | `(dawah)` |
| `farms.assoutudeen.com` | Assoutudeen Honey Enterprise (AHE) | `(honey)` |

Project rules live in `CLAUDE.md`; the full brief is in `docs/`.

## Getting started

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_FOUNDATION_URL=http://localhost:3000
npm run dev
```

## How subdomain routing works

`src/middleware.ts` resolves the request to a site and rewrites into the route group:

- the **foundation owns the root** — no rewrite, `(foundation)/page.tsx` serves `/`
- dawah is rewritten to `/dawah/*`, honey to `/honey/*`

Those prefixes are internal only; visitors never see them. The resolved site is passed
down as the `x-assoutudeen-site` request header and read by `getSiteContext()`.

`/api`, `/admin`, `/_next` and any path with a file extension are excluded from rewriting.

## Testing all three sites locally

`*.localhost` resolves to 127.0.0.1 in Chrome, Firefox and Safari with no `/etc/hosts`
editing. With `npm run dev` running:

| Site | URL |
|---|---|
| Foundation (main) | http://localhost:3000 |
| Dawah Institute | http://dawah.localhost:3000 |
| Honey Enterprise | http://farms.localhost:3000 |

If a host does not resolve on your machine, use the query override instead —
`http://localhost:3000/?_site=dawah` — which pins the site for that request and keeps
itself on every internal link.

`/health` reports the resolved site on each one:

```bash
curl localhost:3000/health
curl http://dawah.localhost:3000/health
curl http://farms.localhost:3000/health
curl "localhost:3000/health?_site=honey"
```

## Payload CMS

Payload 3 runs in this same Next.js process. Admin panel at `/admin`, REST at `/api`,
GraphQL at `/api/graphql` — all excluded from the hostname rewrite, so the CMS is reachable
on whichever domain you are on.

```bash
# .env.local needs DATABASE_URI and PAYLOAD_SECRET
npm run dev                  # visit /admin and create the first admin user
npm run generate:types       # regenerate src/payload-types.ts after schema edits
npm run seed                 # 2023 appeal + 2023 annual report, real figures
```

Postgres is Neon (use the **pooled** connection string on Vercel). Media goes to
Cloudinary; leave the three `CLOUDINARY_*` variables blank and uploads stay on local disk,
which is usually what you want while developing.

Each site's collections are grouped in the admin sidebar — Foundation, Dawah Institute,
Honey Enterprise, Finance, Content, Administration.

### Roles

| Role | Sees |
|---|---|
| **Admin** | Everything, including donations and orders |
| **Editor** | Content only. **No** access to Donation, and no access to Order |
| **Shop manager** | Products, Orders, Ambassadors, Media |

### Two rules the schema enforces

- **Zakat is a separate ledger.** `Donation.purpose` distinguishes it, it is indexed, and
  it must always be queried on its own. Never produce a total that pools zakat with
  sadaqah or general donations.
- **Money is integer kobo.** ₦1,690,000 is stored as `169000000`. `koboField()` rejects
  floats and negatives; `formatKobo()` renders for display. Dates are stored UTC and
  displayed in Africa/Lagos.

`AnnualReport` additionally refuses to save if the line items do not add up to
`totalRaisedKobo` — the published totals reconcile to the naira, and the CMS keeps it
that way.

## Layout

```
src/
  app/
    (foundation)/      main site, served from /   (root layout + globals.css)
    (dawah)/dawah/     rewritten from dawah.assoutudeen.com
    (honey)/honey/     rewritten from farms.assoutudeen.com
    (payload)/         admin panel and REST/GraphQL API
    globals.css        design tokens
  components/
    ui/                shared design system (Container, Section, Button, Card,
                       ArabicQuote, WhatsAppFloat, Disclaimer)
    site/              headers, footer, mobile nav
  lib/                 sites config, site context, fonts, health
  payload/
    collections/       one file per collection
    access/            role helpers
    fields/            koboField, slugField, statusField
    storage/           Cloudinary adapter
    seed.ts
  payload.config.ts
  middleware.ts
```

Each of the three sites has its **own root layout** rather than sharing
`src/app/layout.tsx`. Payload's admin renders its own `<html>`, so a shared root layout
would nest documents.
