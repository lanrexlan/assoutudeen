# Assoutudeen web platform

One Next.js 15 codebase serving three sites:

| Hostname | Entity | Route group |
|---|---|---|
| `assoutudeen.com` | Assoutudeen Prophetic Medicine Foundation (APMF) — **main site** | `(foundation)` |
| `dawah.assoutudeen.com` | Assoutudeen Dawah Institute (ADI) | `(dawah)` |
| `honey.assoutudeen.com` | Assoutudeen Honey Enterprise (AHE) | `(honey)` |

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
| Honey Enterprise | http://honey.localhost:3000 |

If a host does not resolve on your machine, use the query override instead —
`http://localhost:3000/?_site=dawah` — which pins the site for that request and keeps
itself on every internal link.

`/health` reports the resolved site on each one:

```bash
curl localhost:3000/health
curl http://dawah.localhost:3000/health
curl http://honey.localhost:3000/health
curl "localhost:3000/health?_site=honey"
```

## Layout

```
src/
  app/
    (foundation)/      main site, served from /
    (dawah)/dawah/     rewritten from dawah.assoutudeen.com
    (honey)/honey/     rewritten from honey.assoutudeen.com
    layout.tsx         document shell and fonts
    globals.css        design tokens
  components/
    ui/                shared design system (Container, Section, Button, Card,
                       ArabicQuote, WhatsAppFloat, Disclaimer)
    site/              headers, footer, mobile nav
  lib/                 sites config, site context, fonts, health
  middleware.ts
```
