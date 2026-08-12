# 05 — Design & Brand Direction

## The feeling to aim for

Calm, clean, credible. Not a clinic, not a mosque website template, not a health-supplement
sales page. Think of a well-run modern foundation that happens to be rooted in Islamic
tradition: generous white space, warm colours, real photographs of real people, and
restrained ornament.

**Avoid** the visual clichés that make Islamic organisational sites look dated: full-page
mosque-silhouette backgrounds, tiled arabesque wallpaper, gold gradient text, animated
crescents, autoplay nasheed. One well-chosen geometric motif used sparingly as a divider or
section accent does more than a page covered in pattern.

---

## Colour

A palette drawn from honey, olive and the natural world of the remedies themselves.

| Role | Colour | Hex | Use |
|---|---|---|---|
| Primary | Deep olive green | `#2F5D3A` | Header, headings, primary buttons |
| Secondary | Honey amber | `#D9A441` | Accents, donate button, highlights |
| Deep accent | Dark teal | `#123B35` | Footer, overlays |
| Neutral light | Warm sand | `#F7F3EA` | Page and section backgrounds |
| Neutral dark | Charcoal | `#2B2B2B` | Body text |
| Success / Error | `#2E7D32` / `#C62828` | — | Form states |

Sub-brand accents so each property feels related but distinct:
- **APMF** — olive green primary
- **Da'wah Institute** — deep teal primary, olive secondary
- **Honey Enterprise** — honey amber primary, olive secondary

Check every text-on-background pair against WCAG AA (4.5:1 for body text). Honey amber on
white fails badly — use it for large text and solid buttons with dark text, never for small
type on a light background.

---

## Typography

**Latin:** *Inter* or *Source Sans 3* for body — highly legible on cheap Android screens.
*Fraunces* or *Lora* for headings if you want warmth; *Inter* semibold if you want plainness.
**Arabic:** *Noto Naskh Arabic* for Qur'anic and hadith text — it renders diacritics
correctly, which most sans-serif Arabic fonts do not.

Scale: 16px body minimum (18px is better for older readers), 1.6 line height, headings at
roughly 1.25× steps. Self-host the fonts, subset to the characters you use.

**Qur'an and hadith quotations** deserve their own treatment: a bordered block, the Arabic
in Noto Naskh at a larger size, the translation beneath in italic, and the source citation
in small caps below. Get the diacritics right — errors here damage credibility with exactly
the audience you most want.

---

## Photography

This matters more than any design decision. The site lives or dies on whether the
photographs look real.

**Use:** the founder teaching and consulting · empowerment distributions in progress ·
beneficiaries with their tools or goods, photographed with dignity and consent · honey being
harvested and jarred · seminar audiences · the book in someone's hands.

**Don't use:** generic stock photos of smiling models · dark, blurry phone snaps · images
with other organisations' logos visible · beneficiary photos that emphasise pity rather than
dignity.

Practical advice: buy a cheap ring light and shoot honey products against a plain warm
background. Product photography is the single highest-return hour you can spend on the honey
subdomain. For events, assign one person to shoot horizontally in good light and take three
times more photos than you think you need.

**Consent:** get written permission before publishing any beneficiary's photo or story, and
keep the records. This is both an ethical requirement and an NDPA one.

---

## Layout principles

- 12-column grid, max content width 1200px, generous gutters
- Alternate section backgrounds between warm sand and white so long pages have rhythm
- Cards with subtle shadows rather than heavy borders
- One primary call to action per screen — competing buttons halve conversions
- Consistent 8px spacing scale

## Iconography

Lucide or Phosphor icons, outline style, consistent stroke weight. For remedies, consider
commissioning simple line illustrations of black seed, dates, honey, olive — this would
give the site a distinctive visual signature that no competitor has, at modest cost.

## Motion

Restrained. Fade and slide on scroll, 200–300ms, easing out. Respect
`prefers-reduced-motion`. No parallax, no counters that spin, no entrance animations on
every element.

---

## Accessibility (WCAG 2.1 AA)

- Contrast 4.5:1 for body text, 3:1 for large text and UI components
- Every image gets meaningful alt text
- Full keyboard navigation with a visible focus ring
- Form labels properly associated, errors announced
- Semantic headings in order, one `<h1>` per page
- Tap targets 44×44px minimum
- `lang="ar"` and `dir="rtl"` on Arabic passages

Older visitors seeking health guidance are a core audience. Larger default text and high
contrast serve them directly.

---

## Assets you need to commission or produce

- [ ] Logo for APMF in SVG (horizontal, stacked, and icon-only variants)
- [ ] Sub-logos or lockups for the Da'wah Institute and Honey Enterprise
- [ ] Favicon and app icons
- [ ] Open Graph share image, 1200×630
- [ ] Founder portrait, professionally lit
- [ ] 20–40 event and empowerment photographs
- [ ] Product photography for every honey SKU, four angles each
- [ ] Book cover, high resolution
- [ ] A one-page brand sheet so future materials stay consistent
