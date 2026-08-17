/**
 * A small, deliberately conservative selection from the foundation's archive of
 * messages (Gmail label "Testimonials", collated 14 August 2026).
 *
 * WHAT WAS LEFT OUT, AND WHY. The archive holds 28 outcome reports. Most are
 * not published here, on three grounds:
 *
 *  1. Named-disease cure claims. Accounts of recovery from Covid-19, hepatitis
 *     B, diabetes, thyroid disease, fibroids and rheumatoid arthritis are the
 *     archive's most striking entries and its most dangerous ones to publish.
 *     A charity that also sells honey may not advertise that anything treats,
 *     prevents or cures a disease (NAFDAC food-labelling rules), and a reader
 *     who delays hospital treatment because of a page like that is harmed by
 *     it. Those entries stay in the private archive.
 *  2. Intimate health. The sexual-health and vaginismus consultations are
 *     detailed, identifiable to the sender, and were never given for
 *     publication.
 *  3. No consent on file. The collation itself is marked confidential. Every
 *     entry below is therefore anonymous, carries no name, place, or
 *     identifying detail, and none may be attributed until written consent is
 *     recorded (NDPA 2023).
 *
 * WHAT IS PUBLISHED. Accounts of care, counsel and ordinary relief — a mother
 * after childbirth, a parent with a constipated child, an ulcer that let
 * someone fast. Spelling and abbreviations are lightly normalised; nothing is
 * added, and nothing is made stronger than the sender wrote it. One entry
 * reports only partial improvement and is published exactly that way, because
 * an archive of unbroken successes is not believable and should not be.
 */

export type Testimony = {
  id: string;
  /** The sender's own words, trimmed and lightly normalised. */
  quote: string;
  /** Category attribution only. Never a name. */
  attribution: string;
  year: number;
  /** Short topic label. */
  topic: string;
  /** Set where the outcome was partial, and shown as such. */
  partial?: boolean;
};

export const TESTIMONIES: Testimony[] = [
  {
    id: "T21",
    quote:
      "This is to show much appreciation to you for your prayers and counselling during my pregnancy. I remember the day I nearly lost faith concerning my pregnancy, and I didn't even know what to do. I called you and explained things to you, and you gave me some adhkār to be doing. And alhamdulillah, here I am with my baby today. The most amazing thing about you is that one doesn't need to know you personally before you provide a solution to one's problem.",
    attribution: "A mother",
    year: 2021,
    topic: "Counsel during a difficult pregnancy",
  },
  {
    id: "T07",
    quote:
      "JazaakumuLlāhu khayran. The milk is now rushing. I appreciate your concern.",
    attribution: "A nursing mother",
    year: 2020,
    topic: "Breastfeeding",
  },
  {
    id: "T08",
    quote:
      "JazaakumuLlāhu khayran. Alhamdulillah, it came as a sabab. He passes stool with ease now. May Allah ease your affairs.",
    attribution: "The parent of a one-year-old",
    year: 2020,
    topic: "A child's constipation",
  },
  {
    id: "T13",
    quote:
      "I have been disturbing you about the constipation remedy, even though I couldn't get one of the ingredients. Mā shā Allah, I am using it for constipation, but it greatly relieves me of menstrual cramps as well. Sometimes the pain is so severe that I can't move, and if I take anything else for it I usually get a restricted flow. Nothing of the sort this time.",
    attribution: "A sister",
    year: 2020,
    topic: "Constipation and period pain",
  },
  {
    id: "T04",
    quote:
      "Alhamdulillah, I had relief in my chest. Jazākallāhu khayran.",
    attribution: "A patient",
    year: 2020,
    topic: "Chest discomfort",
  },
  {
    id: "T24",
    quote:
      "I was able to fast Ramadan with no issues. But I am still feeling some pain in the region, so I want to wait until I finish the dose. Alhamdulillah so far.",
    attribution: "A brother",
    year: 2021,
    topic: "An ulcer, through Ramadan",
    partial: true,
  },
  {
    id: "T20",
    quote:
      "Alhamdulillāhi Rabbil 'ālamīn. We are blessed with a baby boy this morning. Thank you for your listening ear, advice and prayers. Mother, baby and father are doing fine.",
    attribution: "A father",
    year: 2021,
    topic: "After a caesarean, a safe birth",
  },
];

/** Shown wherever these appear. Not optional. */
export const TESTIMONY_DISCLAIMER =
  "These are personal accounts that people sent us, published anonymously and with their permission being sought before any name is ever attached. They are individual experiences, not medical evidence: they were not clinically verified, they do not establish that any remedy caused any outcome, and what helped one person may not help another. Nothing here treats, prevents or cures disease. See a qualified doctor about any health condition, and do not stop prescribed treatment.";
