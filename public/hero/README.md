# Hero photographs

Drop a file in this folder and the matching page picks it up on the next build.
No code change, no import, nothing to register.

    public/hero/<slot>.jpg      (or .webp, .avif, .png)

The slot names, what each one wants, and a suggested stock search are all in
`src/lib/imagery.ts` — that file is the single source of truth, and the page
components only refer to a slot name.

## Rules for choosing a picture

1. **No identifiable faces** of people who have not consented, and never a
   stranger's face standing in for a beneficiary. This is the whole reason the
   site ships with drawings instead of stock photography.
2. **Nothing that reads as costume.** No mosque silhouettes at sunset, no
   lantern-and-crescent stock Islam. Ordinary things photographed well.
3. **Landscape, and quiet in the middle** — text sits over the centre of the
   header image.
4. **At least 2000px wide**, and compress before committing: the homepage
   budget is 1 MB and most visitors are on mid-range Android over patchy data.
   `next/image` handles resizing and format from there.

## Credit

If a licence asks for attribution, fill in `credit` for that slot in
`src/lib/imagery.ts` and it renders in the corner of the hero. Unsplash does
not require it; crediting the photographer anyway is the decent thing.

## Until a file exists

The page keeps its ink header with the geometry behind it, and the homepage
keeps the drawn apiary in the seal. Nothing looks broken and nothing waits on a
photograph, so these can be added one at a time in any order.

## The slots

| file | what to look for |
|---|---|
| `home.jpg` | cupped hands light minimal — or open hands giving, no faces |
| `about.jpg` | open quran rehal wooden book stand daylight |
| `founder.jpg` | scholar desk books notebook pen warm daylight no people |
| `structure.jpg` | islamic geometric tile pattern muted plaster |
| `accountability.jpg` | ledger notebook accounts desk calculator overhead |
| `our-work.jpg` | nigerian market street traders daylight documentary |
| `empowerment.jpg` | small business workshop sewing machine tailor africa |
| `donate.jpg` | giving donation hands box charity no faces |
| `prophetic-medicine.jpg` | black seed nigella honey dates still life dark background |
| `shop.jpg` | stacked books minimal still life warm light |
| `media.jpg` | microphone lecture recording setup warm minimal |
| `contact.jpg` | ede osun nigeria street town daylight |
| `dawah-home.jpg` | study circle seated learning from behind, no faces |
| `programmes.jpg` | notebooks pens class desk overhead warm |
| `schedule.jpg` | dusk sky after sunset minimal gradient |
| `teachers.jpg` | hands holding open book reading no face |
| `library.jpg` | library shelves books rows warm |
| `honey-home.jpg` | honey pouring dipper jar macro warm |
| `our-honey.jpg` | beehives apiary field africa daylight |
| `ambassadors.jpg` | honey jars row shelf natural light |

## `book-cover` is not a hero

`book-cover.jpg` is the one slot here that is not a page background: it is the
cover of *Treasure of the Prophetic Medicine*, shown inside the seal on the
shop page, and it is rendered `object-contain` so the whole cover is visible
rather than cropped. Use the artwork the book was printed with — never a stock
photograph of a different book. Until the file exists the shop page falls back
to the drawn book, as every other slot does.
