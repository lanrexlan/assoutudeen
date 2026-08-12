# 07 — Budget & Launch Roadmap

*All figures are August 2026 estimates. Naira amounts assume roughly ₦1,500/$1 — verify the
current rate. Confirm all vendor pricing directly before committing.*

---

## One-off setup costs

**You've chosen to build it yourself with Claude Code**, which removes the largest line item
entirely. Revised costs:

| Item | Low | High | Notes |
|---|---|---|---|
| Domain `assoutudeen.com` | — | — | ✅ already registered |
| Defensive domains (.org, .ng, .org.ng) | ₦0 | ₦75,000 | Optional, per year |
| Logo & brand identity | ₦0 | ₦250,000 | Skip if you have a usable logo |
| Photography (founder, honey, appeals) | ₦50,000 | ₦200,000 | Highest-return spend on this list |
| Legal — terms, privacy, ambassador agreement | ₦80,000 | ₦300,000 | |
| NAFDAC food registration (honey) | ₦150,000 | ₦500,000 | Confirm directly with NAFDAC |
| CAC registration, if not yet done | ₦50,000 | ₦120,000 | |
| **Development** | **₦0** | **₦0** | Your time + a Claude subscription |
| **Total** | **~₦330,000** | **~₦1,445,000** | |

With the build cost gone, spend the saved money on **photography and legal**. Bad photos
cannot be fixed later by good code, and a badly drafted ambassador agreement will cost you
more than a developer would have.

---

## Recurring annual costs

| Item | Low | High |
|---|---|---|
| Domain renewals | ₦18,000 | ₦120,000 |
| Vercel (free tier initially, Pro at scale) | ₦0 | ₦360,000 |
| Database — Neon/Supabase | ₦0 | ₦180,000 |
| Cloudinary media | ₦0 | ₦150,000 |
| Business email (Zoho free → Google Workspace) | ₦0 | ₦120,000 |
| Email sending (Resend/Brevo) | ₦0 | ₦90,000 |
| Maintenance retainer | ₦120,000 | ₦600,000 |
| **Total** | **~₦138,000** | **~₦1,620,000** |

A realistic first year, running lean on free tiers: **₦150,000–₦400,000**.

**Transaction fees** are separate: Paystack takes 1.5% + ₦100 per local transaction, capped
at ₦2,000. On ₦1,000,000 of donations and sales in a year, expect roughly ₦20,000–₦25,000 in
fees. Budget for it, and consider offering donors the option to cover the fee.

---

## Self-build roadmap with Claude Code

Full session-by-session instructions are in **`09-Claude-Code-Handover.md`**. Summary:

### Phase 0 — Preparation · *before you open Claude Code*

- [ ] Point `assoutudeen.com` DNS at Vercel; add the `dawah` and `honey` subdomains
- [ ] Set up `info@assoutudeen.com` — retire the `@gail.com` address
- [ ] Open a Paystack business account (needs CAC documents and a corporate bank account)
- [ ] Create a free Neon Postgres database and a Cloudinary account
- [ ] Gather content per `08-Content-Checklist.md` — this is the real bottleneck
- [ ] Commission photography
- [ ] Brief a lawyer on terms, privacy and the ambassador agreement
- [ ] Begin NAFDAC food registration for the honey

### Build sequence — 12 Claude Code sessions

| Session | Deliverable |
|---|---|
| 1 | Project scaffold, subdomain middleware, design system, three shells |
| 2 | Payload CMS collections and admin |
| 3 | Foundation static pages — About, Founder, Structure, Accountability, Contact |
| 4 | **Appeals system** — index, appeal template, progress bars, WhatsApp share |
| 5 | **Donations** — Paystack, one-off + recurring, zakat, bank-transfer confirmation |
| 6 | Remedies Library + articles, with correct Arabic rendering |
| 7 | Book sales page + checkout + sample-chapter email gate |
| 8 | Homepage assembly, SEO, structured data, 301 redirects → **launch the main site** |
| 9 | Dawah subdomain — recurrence engine, schedule, `.ics` feed, programme pages |
| 10 | Dawah library and teacher pages → **launch dawah** |
| 11 | Honey shop — products, cart, checkout, delivery zones |
| 12 | **Ambassador system** — codes, referral attribution, automated leaderboard → **launch honey** |

At a session or two per week alongside your other work, that's roughly **three months**.
Launch the main site after session 8 rather than waiting for all three — a live site earning
trust beats a perfect one still in a folder.

### Ongoing

Two articles a month · appeal updates published as they happen · an accountability report
every fiscal year · monthly newsletter · quarterly analytics review.

---

## What success looks like — measure these

| Metric | 3 months | 12 months |
|---|---|---|
| Monthly unique visitors | 500 | 5,000 |
| Newsletter subscribers | 100 | 1,000 |
| Books sold | 30 | 400 |
| Recurring monthly donors | 5 | 50 |
| Honey orders per month | 20 | 200 |
| Course enrolments | 10 | 150 |
| Empowerment applications received | 50 | 500 |
| Organic search share of traffic | 20% | 50% |

Adjust these to your own ambition — the point is to set targets before launch so you can
tell whether the investment worked.

---

## The main risks, and what to do about them

| Risk | Mitigation |
|---|---|
| Content never gets written and the project stalls | Assign one named person to content, with weekly deadlines. This kills more website projects than any technical problem. |
| NAFDAC action over health claims | Follow doc 06 strictly; get legal review before launch |
| Developer disappears mid-build | Staged payments tied to deliverables; insist on a GitHub repo owned by APMF from day one, not the developer's account |
| Site launches and nobody visits | Budget time for promotion: announce on Facebook, WhatsApp broadcast, at seminars, print the URL on every book and honey jar |
| Payment failures lose sales silently | Sentry error tracking plus webhook verification; test checkout monthly |
| Nobody can update the site after launch | Train two staff members on the CMS during Week 8 and record the session |

---

## Sources

- [Paystack vs Flutterwave 2026 comparison](https://kudicompass.com/paystack-vs-flutterwave-nigeria-payment-gateway-comparison-2026/)
- [Best payment gateways for Nigerian businesses 2026](https://smartsmssolutions.com/resources/blog/ng/ng03-s02-payment-gateways)
- [.org.ng domain pricing — TLD-List](https://tld-list.com/tld/org.ng)
- [Official .ng domain pricing guide](https://ngdomain.ng/content/blog-detail/ng-domain-pricing-extensions-guide-2026)
- [Best headless CMS for Next.js 2026](https://prismic.io/blog/best-nextjs-headless-cms-platforms)
