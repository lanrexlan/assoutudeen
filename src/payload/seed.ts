import { getPayload } from "payload";
import config from "@payload-config";
import type { Payload } from "payload";

/**
 * Seeds one Appeal and one AnnualReport with the real 2023 figures from
 * docs/09, so the shapes can be inspected against actual data.
 *
 * Everything here is verified record, in kobo:
 *   2023 total ₦5,323,500 across 11 beneficiaries.
 *
 * Idempotent — re-running updates rather than duplicating.
 *
 *   npm run seed
 */

const naira = (amount: number) => amount * 100;

/** Minimal Lexical document. Enough to seed; the editor takes over from here. */
const richText = (paragraphs: string[]) => ({
  root: {
    type: "root",
    format: "" as const,
    indent: 0,
    version: 1,
    direction: "ltr" as const,
    children: paragraphs.map((text) => ({
      type: "paragraph",
      format: "" as const,
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: [
        {
          type: "text",
          detail: 0,
          format: 0,
          mode: "normal",
          style: "",
          text,
          version: 1,
        },
      ],
    })),
  },
});

async function seedAppeal(payload: Payload) {
  const slug = "yusuf-fatai-abolore-kidney-transplant";
  const existing = await payload.find({
    collection: "appeals",
    where: { slug: { equals: slug } },
    limit: 1,
  });

  const data = {
    title: "Kidney transplant appeal, December 2023",
    slug,
    // Named in APMF's own published 2023 report. Keep `isAnonymous` true for
    // anything without that recorded consent.
    isAnonymous: false,
    beneficiaryName: "Yusuf Fatai Abolore",
    category: "medical" as const,
    needDescription: richText([
      "Kidney transplant at St. Nicholas Hospital, Lagos.",
      "The appeal closed short of its target. ₦3,035,000 was raised against a need of ₦22,000,000 — published here exactly as it stands, because the shortfall is part of the record.",
    ]),
    hospital: "St. Nicholas Hospital, Lagos",
    targetAmountKobo: naira(22_000_000),
    raisedAmountKobo: naira(3_035_000),
    status: "partially-met" as const,
    openedDate: new Date("2023-12-01T00:00:00.000Z").toISOString(),
    closedDate: new Date("2023-12-31T00:00:00.000Z").toISOString(),
    featured: true,
    closingReport: richText([
      "Public appeals of this kind have since been replaced by the Monthly Empowerment Fund. This page is retained as part of the 2023 accountability record.",
    ]),
  };

  if (existing.docs[0]) {
    await payload.update({ collection: "appeals", id: existing.docs[0].id, data });
    return "updated";
  }
  await payload.create({ collection: "appeals", data });
  return "created";
}

async function seedAnnualReport(payload: Payload) {
  const fiscalYear = 2023;
  const existing = await payload.find({
    collection: "annual-reports",
    where: { fiscalYear: { equals: fiscalYear } },
    limit: 1,
  });

  const beneficiaries = [
    {
      name: "Mr. Ayoola Raheem",
      date: new Date("2023-02-01T00:00:00.000Z").toISOString(),
      need: "Cerebral angiography following a brain injury",
      hospital: "UCH Ibadan",
      raisedKobo: naira(1_690_000),
      targetKobo: naira(2_000_000),
    },
    {
      name: "A divorcee with 8 children",
      date: new Date("2023-08-01T00:00:00.000Z").toISOString(),
      need: "Empowerment towards financial stability",
      raisedKobo: naira(340_000),
      targetKobo: naira(500_000),
    },
    {
      name: "A revert sister",
      date: new Date("2023-09-01T00:00:00.000Z").toISOString(),
      need: "Treatment for malaria, ruqyah, shelter and clothing",
      raisedKobo: naira(90_000),
      targetKobo: 0,
    },
    {
      name: "Yusuf Fatai Abolore",
      date: new Date("2023-12-01T00:00:00.000Z").toISOString(),
      need: "Kidney transplant",
      hospital: "St. Nicholas Hospital, Lagos",
      raisedKobo: naira(3_035_000),
      targetKobo: naira(22_000_000),
    },
  ];

  // Six smaller assistances from surplus funds, ₦15,000–₦50,000 each. The
  // individual amounts are not in docs/09; only their total is derivable, so
  // it is recorded as a single line rather than invented as six.
  const beneficiaryTotal = beneficiaries.reduce((t, b) => t + b.raisedKobo, 0);
  const total = naira(5_323_500);
  const surplusAssistances = [
    {
      description:
        "Six assistances from surplus funds (₦15,000–₦50,000 each) — see TODO-CONTENT.md, individual amounts not yet supplied",
      amountKobo: total - beneficiaryTotal,
    },
  ];

  const data = {
    fiscalYear,
    introduction: richText([
      "What was raised in 2023, and what it did. Bank statements are available on request.",
    ]),
    quranVerse: {
      // Arabic intentionally left blank: it must be copied verbatim from the
      // source with diacritics intact, never retyped. See TODO-CONTENT.md.
      arabic: "",
      translation:
        "And say: Work, for Allah will see your work, and so will His Messenger and the believers.",
      reference: "Qur'an, At-Tawbah 9:105",
    },
    beneficiaries,
    surplusAssistances,
    totalRaisedKobo: total,
    beneficiaryCount: 11,
    closingNote: richText([
      "Overheads are published rather than buried. Category totals reconcile to the naira.",
    ]),
  };

  if (existing.docs[0]) {
    await payload.update({
      collection: "annual-reports",
      id: existing.docs[0].id,
      data,
    });
    return "updated";
  }
  await payload.create({ collection: "annual-reports", data });
  return "created";
}

async function seed() {
  const payload = await getPayload({ config });

  const appeal = await seedAppeal(payload);
  const report = await seedAnnualReport(payload);

  payload.logger.info(`Seed complete — appeal ${appeal}, 2023 report ${report}.`);
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
