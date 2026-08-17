# Hero image provenance

These hero photographs were selected from Unsplash-oriented image searches using the prompts in [`src/lib/imagery.ts`](../../src/lib/imagery.ts). The images are stored locally under this directory as compressed JPEGs. Unsplash does not require attribution under its standard license, but the search pages are recorded here for provenance and future photographer-credit updates.

| Slot | File | Source search | Selection note |
|---|---|---|---|
| Home | `home.jpg` | [cupped hands](https://unsplash.com/s/photos/cupped-hands) | Hands only, light background, no face |
| About | `about.jpg` | [open Qur'an on wooden stand](https://unsplash.com/s/photos/quran-rehal) | Book and rehal, no people |
| Founder | `founder.jpg` | [scholar desk books notebook pen](https://unsplash.com/s/photos/books-notebook-pen-desk) | Quiet desk still life |
| Structure | `structure.jpg` | [Islamic geometric pattern](https://unsplash.com/s/photos/islamic-geometric-pattern) | Muted geometric tile texture |
| Accountability | `accountability.jpg` | [ledger notebook calculator](https://unsplash.com/s/photos/ledger-notebook-calculator) | Overhead desk still life |
| Our work | `our-work.jpg` | [African market street](https://unsplash.com/s/photos/african-market-street) | Wide market street with no close face |
| Empowerment | `empowerment.jpg` | [sewing machine hands workshop](https://unsplash.com/s/photos/sewing-machine-workshop) | Machine, fabric, and hands; no face |
| Donate | `donate.jpg` | [charitable giving](https://unsplash.com/s/photos/charitable-giving) | Hands holding a donation message and coins |
| Prophetic medicine | `prophetic-medicine.jpg` | [black seed](https://unsplash.com/s/photos/black-seed) | Black-seed still life; no people |
| Shop | `shop.jpg` | [stacked books warm light](https://unsplash.com/s/photos/stacked-books-warm-light) | Minimal book stack |
| Media | `media.jpg` | [microphone recording setup](https://unsplash.com/s/photos/microphone-recording-setup) | Warm microphone and studio scene |
| Contact | `contact.jpg` | [Nigeria market street](https://unsplash.com/s/photos/nigeria-market-street) | Wide daylight market street |
| Dawah home | `dawah-home.jpg` | [study circle](https://unsplash.com/s/photos/study-circle) | Seated learners, faces not prominent |
| Programmes | `programmes.jpg` | [notebooks pens class desk](https://unsplash.com/s/photos/notebooks-pens-class-desk) | Warm desk overhead |
| Schedule | `schedule.jpg` | [dusk sky](https://unsplash.com/s/photos/dusk-sky) | Minimal pastel dusk horizon |
| Teachers | `teachers.jpg` | [hands holding open book](https://unsplash.com/s/photos/hands-holding-open-book) | Hands and book, no face |
| Library | `library.jpg` | [library shelves](https://unsplash.com/s/photos/library-shelves) | Warm rows of books |
| Honey home | `honey-home.jpg` | [honey dipper jar](https://unsplash.com/s/photos/honey-dipper-jar) | Honey pouring from a dipper |
| Our honey | `our-honey.jpg` | [apiary beehives](https://unsplash.com/s/photos/apiary-beehives) | Beehives in a daylight field |
| Ambassadors | `ambassadors.jpg` | [honey jars shelf](https://unsplash.com/s/photos/honey-jars-shelf) | Jars lined up on a shelf |

## Technical checks

All 20 images are landscape JPEGs at least 2,000 pixels wide. They were normalized to 2,400 pixels wide and compressed with progressive JPEG encoding. Every individual file is below 1 MB, matching the homepage budget described in the hero-folder README.

Because the search results did not expose a photographer name for every selected result, this file records the source search pages rather than inventing photographer credits. If the site owner later identifies a specific photographer for any image, the corresponding `credit` field in `src/lib/imagery.ts` can be populated with that photographer's name and direct photo URL.
