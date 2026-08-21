# Publishing a remedy chapter

The remedies library at `/remedies` is generated from the CMS. Nothing is
hard-coded and no deployment is needed: a chapter saved in the admin panel is
live on the next page load.

## Adding one

1. Go to **assoutudeen.com/admin** and sign in.
2. **Foundation → Remedies → Create new**.
3. Fill in what you have. Only the name and the slug are required — a chapter
   with a verse and one hadith is worth publishing; the rest can follow.

| Field | What goes in it |
|---|---|
| Name | English name, e.g. *Black seed* |
| Arabic name | Arabic with diacritics, copied from the book — never retyped from memory |
| Transliteration | e.g. *ḥabbat as-sawdāʾ* |
| Slug | Fills itself in from the name. Leave it alone once published — changing it breaks every link to the page |
| Qur'an verse | Arabic, translation, and the reference. Copy the Arabic verbatim from a Qur'an source |
| Hadiths | One entry per narration. **The source is required** — no hadith is ever published here without its citation |
| Ibn al-Qayyim commentary | From *At-Tibb an-Nabawiyy*, as quoted in the book |
| Composition · Traditional uses · Cautions | The rest of the chapter |
| Free to read | Ticked for the 10–15 chapters that are free. Everything else is gated |
| Book chapter ref | e.g. *Chapter 12, p. 63* |

4. **Save**. Visit `/remedies` to see it.

## What the gate does, and does not do

A chapter that is not marked free still shows **the Qur'an verse and every
hadith in full, with citations**. What is held back is the commentary, the
composition, the traditional uses and the cautions — the material that is the
book's own work.

This is deliberate. Quoting scripture and then charging for the reference would
be the wrong way round; a reader must always be able to check the evidence for
what they are being told.

## Rules that are not negotiable

- **Never invent a citation.** If the grading or the source is not to hand, save
  the chapter without the hadith and add it later.
- **Copy Arabic, never retype it.** Diacritics must survive exactly.
- **No health claims.** These pages are educational and may quote the Qur'an,
  the Sunnah and Ibn al-Qayyim freely. They must never say a food treats,
  prevents or cures a disease, and they must never be merged with a honey
  product page — NAFDAC draws that line and the site keeps to it. The standard
  disclaimer renders on every chapter automatically.
