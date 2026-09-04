/**
 * Registration facts, taken from the CAC certificate of incorporation and the
 * filed constitution (Form CAC/IT/1, certified true copy, 28 November 2019).
 *
 * Everything in this file is a checkable public record. Nothing here is
 * inferred — if it is not on the certificate or in the constitution, it is not
 * here.
 *
 * Deliberately NOT included: the trustees' personal phone numbers and the
 * certificate serial number. They appear on the filed document but publishing
 * them serves no visitor and exposes personal data (NDPA 2023).
 */

export const REGISTRATION = {
  /**
   * The registered name, exactly as it stands on the certificate.
   *
   * NOT "Incorporated Trustees of ..." — that is the registration TYPE (Part F
   * of CAMA, filed on Form CAC/IT/1), not part of the name, and prefixing it
   * gives a legal name the foundation does not have.
   */
  registeredName: "Assoutudeen Prophetic Medicine Foundation",
  /** CAC/IT/NO on the certificate. */
  number: "CAC/IT/NO 139886",
  /** Short form for the footer. */
  numberShort: "139886",
  incorporatedOn: "2019-11-28",
  incorporatedOnDisplay: "28 November 2019",
  registrar: "Corporate Affairs Commission, Abuja",
  form: "Form CAC/IT/1 — Incorporated Trustees",
  /** The registered office, which is not the same as the day-to-day address. */
  registeredOffice:
    "No. 25, Agbonran Junction, Olowobida Agip Area, Ede, Osun State",
} as const;

export type Trustee = {
  /** Exactly as spelled on the certificate. */
  name: string;
  /** Office held, from the signed constitution. */
  role?: string;
};

/** The three trustees named on the certificate of incorporation. */
export const TRUSTEES: Trustee[] = [
  { name: "Wasiu Tirimisiy Adeniyi", role: "Chairman" },
  { name: "Akande Olanrewaju Subair", role: "Secretary" },
  { name: "Taiwo Ridwan Ademola" },
];

/**
 * Offices provided for by Article 7 of the constitution. Which people
 * currently hold them beyond the three trustees above is not on the filed
 * document — see TODO-CONTENT.md.
 */
export const GOVERNING_OFFICES = [
  "President / Chairman",
  "General Secretary",
  "Assistant Secretary",
  "Financial Secretary",
  "Treasurer",
  "Social / Welfare",
  "Publicity Secretary",
  "Auditor",
] as const;

/**
 * Article 3 of the constitution, verbatim. Twelve registered objects.
 *
 * These are the objects as filed in 2019. They are not a description of what
 * the foundation does today — objects 5 and 6 mention distributing traditional
 * herbal medicine, whereas APMF now sells honey only and makes no herbal-drug
 * claims. Present them as the registered constitution, never as current
 * activity or as a health claim.
 */
export const REGISTERED_OBJECTS = [
  "To encourage human interaction with nature in finding solution to health challenges.",
  "To assist distressed muslims who are suffering from one ailment or the other through raising of money and providing adequate health care for them.",
  "To encourage a muslim ummah (community) that is propelled by the teachings of prophetic medicine as taught and practiced by the prophet.",
  "To discourage the use of amulets and charms in solving health issues.",
  "To engage in the practice of distribution of Traditional herbal Medicine.",
  "To bring to the knowledge of Nigerians, the importance of the use of traditional herbal Medicine.",
  "To carter for the general welfare of members.",
  "To preserve a healthy and sustainable environment.",
  "To advocate on human rights and meet rural and environmental challenges.",
  "To undertake rehabilitation programmes for the vulnerable.",
  "To promote peace, justice and equity.",
  "To network with other organizations with similar aims and objectives.",
] as const;

/** Financial rules the constitution binds the foundation to. */
export const CONSTITUTION_RULES = [
  {
    title: "Income applied only to the objects",
    body: "All income and property is applied solely towards the objects above. No part of it may be paid or transferred to members as dividend, bonus or profit.",
    article: "Special clause",
  },
  {
    title: "Trustees are not salaried by virtue of office",
    body: "No member of the Governing Council may be appointed to a salaried office of the Association, and no benefit may be given to them beyond repayment of out-of-pocket expenses and reasonable fees for services actually rendered.",
    article: "Special clause",
  },
  {
    title: "Accounts audited every year",
    body: "Independent, licensed auditors are appointed by the general meeting to audit the financial records annually. The audited statements are annexed to the annual returns filed with the Corporate Affairs Commission.",
    article: "Article 11",
  },
  {
    title: "On dissolution, nothing returns to members",
    body: "If the foundation were ever wound up, no property may be distributed among members. Whatever remains passes to another body with similar objects, or to some other charitable object.",
    article: "Special clause",
  },
] as const;

/** Whether the foundation is a not-for-profit, in its own words. */
export const PREAMBLE =
  "A not-for-profit and non-political organisation, governed by the constitution its members adopted and the Corporate Affairs Commission registered.";
