# 12 — What to Upload to GitHub

Short answer: **the whole project folder, minus secrets, minus generated files, minus
anything with a real person's private information in it.** Git's job is to track your source
code. Everything else either regenerates itself or doesn't belong there.

---

## Set the repository to **private**

Not public. Even before you have secrets in it, the repo will contain the foundation's
internal planning, bank details, and eventually beneficiary-related schema. Make it private
at creation, and only consider public later if you deliberately decide to open-source the
code.

```bash
gh repo create assoutudeen-web --private --source=. --remote=origin
```

Create the repo under an **organisation account owned by APMF**, not your personal account.
If the site outlives your involvement, the foundation must still control it. This is the
single most common way small organisations lose their website.

---

## What goes in

✅ **Everything in the project source tree:**

```
/src or /app        all your Next.js code
/components         the design system
/lib                paystack, email, recurrence engine, utils
/payload            CMS collections and config
/public             logo, favicon, static images, og-image
middleware.ts       subdomain routing
package.json  package-lock.json
tsconfig.json  next.config.js  tailwind.config.ts  postcss.config.js
.eslintrc  .prettierrc
.gitignore
.env.example        ← variable NAMES only, no values
CLAUDE.md           ← so Claude Code has context in any clone
README.md
/docs               the planning documents from this folder
/tests
```

`package-lock.json` **does** get committed — it pins exact dependency versions so your
Vercel build matches what worked on your laptop. Don't gitignore it.

---

## What stays out

Create `.gitignore` at the repo root:

```gitignore
# dependencies
node_modules/
.pnp
.pnp.js

# next.js build output
.next/
out/
build/
dist/

# environment variables — NEVER COMMIT THESE
.env
.env.local
.env.development.local
.env.production.local
*.pem
*.key

# testing & coverage
coverage/
.nyc_output/

# vercel & typescript
.vercel
*.tsbuildinfo
next-env.d.ts

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# os files
.DS_Store
Thumbs.db
desktop.ini

# editor
.idea/
.vscode/*
!.vscode/extensions.json

# payload generated
/payload-types.ts

# uploads & user content — belongs in Cloudinary, not git
/public/uploads/
/media/

# database dumps
*.sql
*.dump
backups/

# large source assets
*.psd
*.ai
*.mp4
*.mov
```

### The three categories that matter

**1. Secrets — the one that will actually hurt you.**

Never commit: `DATABASE_URL` · `PAYLOAD_SECRET` · `PAYSTACK_SECRET_KEY` ·
`PAYSTACK_WEBHOOK_SECRET` · `CLOUDINARY_API_SECRET` · `RESEND_API_KEY` ·
`TURNSTILE_SECRET_KEY` · any bank or admin credential.

These live in `.env.local` (gitignored) and in Vercel's environment variables dashboard.
Commit `.env.example` instead:

```bash
# .env.example — names only, no real values
DATABASE_URL=
PAYLOAD_SECRET=
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=
PAYSTACK_SECRET_KEY=
PAYSTACK_WEBHOOK_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=https://assoutudeen.com
```

**If you ever commit a secret by accident:** rotate the key immediately at the provider.
Deleting the commit is not enough — git keeps history, and by the time you notice, a bot may
already have scraped it. Paystack keys in particular are scanned for continuously. Rotate
first, clean history second.

**2. Personal data — the one with legal consequences.**

Assistance requests contain health information, which is a special category under NDPA 2023.
Never commit: database dumps, exported form submissions, beneficiary photos, member contact
lists, or test fixtures containing real people's details. If you need seed data for
development, invent it. Committing a real beneficiary's diagnosis to a git repository is a
data breach even if the repo is private.

**3. Generated and heavy files.**

`node_modules/` rebuilds from `package-lock.json`. `.next/` rebuilds on every deploy.
Beneficiary and product photos belong in Cloudinary, where they get resized and served from a
CDN — putting them in git bloats the repo permanently, because git never forgets a large file
even after you delete it.

---

## The book PDF — a judgement call

`Endless_Blessings_From_the_Creator.pdf` is 5.7 MB and it's a commercial product you intend
to sell.

**Don't commit it.** Two reasons: a private repo is not a paywall — anyone with repo access,
now or in future, gets the full book free; and a 5.7 MB binary sits in your git history
forever.

Instead: keep it locally in `docs/` (gitignored), upload it to Cloudinary or private storage,
and serve the paid download through **signed, expiring URLs** generated after payment
verification. Add to `.gitignore`:

```gitignore
docs/*.pdf
```

The free sample chapter is different — that's marketing material, and it can live in
`/public` as a normal committed file.

---

## Should the planning docs go in?

**Yes, put `/docs` in the repo.** Committing `CLAUDE.md` and the numbered planning documents
means any clone — yours on another machine, or a future developer's — arrives with full
context. Claude Code picks up `CLAUDE.md` automatically, which is most of the value.

The exception is anything containing live credentials. The bank account number in doc 06 is
fine — it's published on your materials anyway — but review the docs once before the first
commit and strip anything you wouldn't want a future contractor reading.

---

## First commit

```bash
cd assoutudeen-web
git init

# create .gitignore FIRST, before adding anything
# (paste the block above into .gitignore, save)

git add .
git status                      # ← read this carefully before committing

# confirm .env.local and node_modules are NOT listed
git commit -m "chore: initial project scaffold"

gh repo create assoutudeen-web --private --source=. --remote=origin --push
```

**Read `git status` before that first commit.** It is far easier to fix now than after the
history exists.

---

## Ongoing workflow

Two branches is plenty:

- `main` — deploys to production
- `develop` — deploys to a Vercel preview URL

```bash
git checkout -b develop
# ... work, one Claude Code session ...
git add .
git commit -m "feat(empowerment): add monthly fund join form"
git push origin develop
# check the Vercel preview, then merge to main to go live
```

Conventional commit prefixes — `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:` —
make the history readable a year from now when you've forgotten everything.

**Commit at the end of every Claude Code session.** If a session goes wrong, `git reset
--hard` back to the last good commit costs you one session instead of a day of untangling.

---

## Protect the repo

In GitHub settings, worth ten minutes:

- **Branch protection** on `main` — require a pull request, no direct pushes
- **Secret scanning** and **push protection** — GitHub blocks commits containing recognised
  API key patterns before they land. Free on private repos. Turn it on.
- **Dependabot alerts** — flags vulnerable dependencies
- **Access:** the APMF organisation owns the repo. Give collaborators Write, never Admin,
  unless you intend them to be able to delete it.

---

## Quick reference

| File / folder | Commit? | Why |
|---|---|---|
| Source code, components, lib | ✅ | That's the point |
| `package-lock.json` | ✅ | Reproducible builds |
| `CLAUDE.md`, `/docs` | ✅ | Context travels with the code |
| `.env.example` | ✅ | Names only |
| `/public` logo, favicon, og-image | ✅ | Small, static, needed at build |
| Free sample chapter PDF | ✅ | Marketing material |
| `.env.local` | ❌ | **Secrets** |
| `node_modules/`, `.next/` | ❌ | Regenerates |
| Full book PDF | ❌ | Commercial product; use signed URLs |
| Beneficiary photos, form exports, DB dumps | ❌ | **NDPA — personal and health data** |
| Product photography, event albums | ❌ | Cloudinary |
| `.DS_Store`, `Thumbs.db` | ❌ | Noise |
