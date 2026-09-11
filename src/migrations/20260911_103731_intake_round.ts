import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "intake_round" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"accepting" boolean DEFAULT false,
  	"label" varchar DEFAULT 'September 2026',
  	"opens_on" timestamp(3) with time zone,
  	"closes_on" timestamp(3) with time zone,
  	"decisions_by" timestamp(3) with time zone,
  	"places" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  `)

  /*
   * Open the September 2026 round straight away.
   *
   * Without this the table exists but holds no row, so `accepting` reads as
   * its default of false and the form would CLOSE the moment this deploys —
   * the exact opposite of what moving the setting into the CMS was for. The
   * round was meant to open on 1 September.
   *
   * Times are noon in Lagos rather than midnight, so that reading the date
   * back in Africa/Lagos can never land on the previous day.
   */
  await db.execute(sql`
    INSERT INTO "intake_round"
      ("accepting", "label", "opens_on", "closes_on", "decisions_by", "updated_at", "created_at")
    SELECT
      true,
      'September 2026',
      '2026-09-01T12:00:00+01:00'::timestamptz,
      '2026-09-30T12:00:00+01:00'::timestamptz,
      '2026-10-31T12:00:00+01:00'::timestamptz,
      now(),
      now()
    WHERE NOT EXISTS (SELECT 1 FROM "intake_round");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "intake_round" CASCADE;`)
}
