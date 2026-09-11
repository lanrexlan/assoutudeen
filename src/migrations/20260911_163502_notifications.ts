import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/*
 * No seed row here, unlike the intake round.
 *
 * That migration had to insert one because its `accepting` field defaults to
 * FALSE, so an empty table would have read as "closed" and shut the form. This
 * field defaults to TRUE and is read as "on unless explicitly off", so an empty
 * table already behaves exactly as the code did before the setting existed.
 * Turning this into a setting changes nothing until somebody changes it.
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "notifications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"newsletter_signups" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "notifications" CASCADE;`)
}
