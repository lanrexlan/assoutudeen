import { BOOK } from "@/lib/book";

/**
 * The founder, as supplied by the foundation.
 *
 * The legal spelling on the CAC certificate is "Wasiu Tirimisiy Adeniyi"; the
 * name he is known and published under is Abd'Wasiu Tirmidhi Adeniyi, Abu
 * Mubaashir. Both are shown, because the second is how people know him and the
 * first is how a donor verifies him against the register.
 */
export const FOUNDER = {
  name: "Imam Engr. Abd'Wasiu Tirmidhi Adeniyi",
  kunya: "Abu Mubaashir",
  registeredName: "Wasiu Tirimisiy Adeniyi",
  role: "Founder and Chairman of Trustees",
  from: "Ede, Osun State, Nigeria",

  /** The standfirst — one sentence a donor can hold on to. */
  summary:
    "A student of knowledge, a civil engineer, an imam and a beekeeper. He founded the foundation, teaches most of its classes, and wrote the book its remedies library is built from.",

  biography: [
    "Abd'Wasiu Tirmidhi Adeniyi is a student of knowledge and a writer from Ede, Osun State. He began his Islamic education young and has never really stopped: he studied prophetic medicine under respected scholars, and he still attends seminars across Nigeria and online alongside other students of knowledge. What he learns, he passes on — in lectures, in classes, and in writing.",
    "He serves as Chief Imam of Surulere Mosque and lectures at Olowobida Central Mosque. Alongside that he is a civil engineer, holding a bachelor's and a master's degree in the field and currently working towards a PhD.",
    "The foundation grew out of what he kept seeing: Muslims facing an illness or a bill with nothing to catch them. He established the Assoutudeen Prophetic Medicine Foundation to meet that need, and it has been registered with the Corporate Affairs Commission since 2019.",
    "Away from the mosque and the lecture hall he keeps bees, which is where the Honey Enterprise began. He is married with children.",
  ],

  credentials: [
    {
      label: "Islamic learning",
      detail:
        "Educated in the Islamic sciences from a young age, and a long-standing student of prophetic medicine under recognised scholars.",
    },
    {
      label: "Civil engineering",
      detail:
        "Bachelor's and master's degrees in Civil Engineering, and currently a doctoral candidate.",
    },
    {
      label: "Imamate",
      detail:
        "Chief Imam of Surulere Mosque, and a lecturer at Olowobida Central Mosque.",
    },
    {
      label: "Author",
      detail: `${BOOK.title} — ${BOOK.pages} pages, around ${BOOK.remedies} remedies, each traced to its evidence.`,
    },
    {
      label: "Beekeeping",
      detail:
        "A beekeeper by inclination long before it became the foundation's trading arm.",
    },
  ],

  teaches: [
    "Weekly Tafsir — Fridays",
    "Hadith — alternate Saturdays",
    "Prophetic Medicine — alternate Saturdays",
    "Fiqh — Sundays",
    "Virtues of the Companions — Sundays",
    "Qur'an and Modern Science — Sundays",
  ],
} as const;
