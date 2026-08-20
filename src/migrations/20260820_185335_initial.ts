import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_appeals_category" AS ENUM('medical', 'financial', 'shelter', 'project');
  CREATE TYPE "public"."enum_appeals_status" AS ENUM('active', 'closed', 'partially-met');
  CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_articles_site" AS ENUM('foundation', 'dawah', 'honey');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_pages_site" AS ENUM('foundation', 'dawah', 'honey');
  CREATE TYPE "public"."enum_testimonials_site" AS ENUM('foundation', 'dawah', 'honey');
  CREATE TYPE "public"."enum_testimonials_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_faqs_site" AS ENUM('foundation', 'dawah', 'honey');
  CREATE TYPE "public"."enum_faqs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_donations_purpose" AS ENUM('appeal', 'zakat', 'sadaqah', 'general', 'dawah-scholarship');
  CREATE TYPE "public"."enum_donations_status" AS ENUM('pending', 'paid', 'awaiting-transfer', 'failed', 'refunded');
  CREATE TYPE "public"."enum_donations_channel" AS ENUM('paystack', 'bank-transfer');
  CREATE TYPE "public"."enum_pledges_method" AS ENUM('card', 'transfer');
  CREATE TYPE "public"."enum_pledges_purpose" AS ENUM('empowerment', 'zakat', 'sadaqah');
  CREATE TYPE "public"."enum_pledges_status" AS ENUM('new', 'active', 'lapsed', 'cancelled');
  CREATE TYPE "public"."enum_assistance_requests_circumstances" AS ENUM('widow', 'widower', 'orphan', 'elderly', 'disability', 'chronically-ill', 'revert', 'student', 'unemployed', 'displaced', 'sole-carer', 'other');
  CREATE TYPE "public"."enum_assistance_requests_category" AS ENUM('medical', 'financial', 'shelter', 'other');
  CREATE TYPE "public"."enum_assistance_requests_status" AS ENUM('new', 'verifying', 'approved', 'assisted', 'declined');
  CREATE TYPE "public"."enum_programmes_recurrence_exception" AS ENUM('none', 'alternates-saturday', 'skip-second-sunday-when-last');
  CREATE TYPE "public"."enum_programmes_language" AS ENUM('yoruba', 'english', 'arabic', 'mixed');
  CREATE TYPE "public"."enum_ambassadors_status" AS ENUM('active', 'suspended', 'retired');
  CREATE TYPE "public"."enum_orders_status" AS ENUM('pending', 'paid', 'awaiting-transfer', 'confirmed', 'delivered', 'cancelled', 'refunded');
  CREATE TYPE "public"."enum_newsletter_subscribers_status" AS ENUM('subscribed', 'unsubscribed', 'bounced');
  CREATE TYPE "public"."enum_contact_messages_topic" AS ENUM('general', 'consultation', 'donation', 'media', 'distributor', 'course');
  CREATE TYPE "public"."enum_contact_messages_status" AS ENUM('new', 'answered', 'spam');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'shop-manager');
  CREATE TABLE "appeals_updates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"title" varchar NOT NULL,
  	"body" jsonb NOT NULL
  );
  
  CREATE TABLE "appeals" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"is_anonymous" boolean DEFAULT true,
  	"category" "enum_appeals_category" NOT NULL,
  	"beneficiary_name" varchar,
  	"anonymous_label" varchar,
  	"need_description" jsonb NOT NULL,
  	"hospital" varchar,
  	"target_amount_kobo" numeric,
  	"raised_amount_kobo" numeric DEFAULT 0,
  	"status" "enum_appeals_status" DEFAULT 'closed' NOT NULL,
  	"opened_date" timestamp(3) with time zone NOT NULL,
  	"closed_date" timestamp(3) with time zone,
  	"closing_report" jsonb,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "appeals_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "annual_reports_beneficiaries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"need" varchar NOT NULL,
  	"hospital" varchar,
  	"raised_kobo" numeric,
  	"target_kobo" numeric
  );
  
  CREATE TABLE "annual_reports_surplus_assistances" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"description" varchar NOT NULL,
  	"amount_kobo" numeric
  );
  
  CREATE TABLE "annual_reports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"fiscal_year" numeric NOT NULL,
  	"introduction" jsonb,
  	"quran_verse_arabic" varchar,
  	"quran_verse_translation" varchar,
  	"quran_verse_reference" varchar,
  	"total_raised_kobo" numeric NOT NULL,
  	"beneficiary_count" numeric NOT NULL,
  	"closing_note" jsonb,
  	"pdf_upload_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "remedies_hadiths" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"arabic" varchar NOT NULL,
  	"translation" varchar NOT NULL,
  	"source" varchar NOT NULL,
  	"grading_note" varchar
  );
  
  CREATE TABLE "remedies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"arabic_name" varchar,
  	"transliteration" varchar,
  	"slug" varchar NOT NULL,
  	"quran_verse_arabic" varchar,
  	"quran_verse_translation" varchar,
  	"quran_verse_reference" varchar,
  	"ibn_qayyim_commentary" jsonb,
  	"composition" jsonb,
  	"traditional_uses" jsonb,
  	"precautions" jsonb,
  	"is_free" boolean DEFAULT false,
  	"book_chapter_ref" varchar,
  	"related_product_id" integer,
  	"featured_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"status" "enum_articles_status" DEFAULT 'draft' NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"site" "enum_articles_site" DEFAULT 'foundation',
  	"excerpt" varchar,
  	"cover_image_id" integer,
  	"author_id" integer,
  	"body" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"remedies_id" integer
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"status" "enum_pages_status" DEFAULT 'draft' NOT NULL,
  	"site" "enum_pages_site" DEFAULT 'foundation' NOT NULL,
  	"body" jsonb NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"attribution" varchar NOT NULL,
  	"consent_recorded" boolean DEFAULT false,
  	"site" "enum_testimonials_site" DEFAULT 'foundation',
  	"status" "enum_testimonials_status" DEFAULT 'draft' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"honorific" varchar,
  	"role" varchar NOT NULL,
  	"bio" jsonb,
  	"photo_id" integer,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"site" "enum_faqs_site" DEFAULT 'foundation' NOT NULL,
  	"order" numeric DEFAULT 0,
  	"status" "enum_faqs_status" DEFAULT 'draft' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "donations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"reference" varchar NOT NULL,
  	"amount_kobo" numeric NOT NULL,
  	"purpose" "enum_donations_purpose" NOT NULL,
  	"appeal_ref_id" integer,
  	"donor_name" varchar,
  	"donor_email" varchar,
  	"is_recurring" boolean DEFAULT false,
  	"is_anonymous" boolean DEFAULT false,
  	"status" "enum_donations_status" DEFAULT 'pending' NOT NULL,
  	"paystack_ref" varchar,
  	"channel" "enum_donations_channel" DEFAULT 'paystack',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pledges" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"amount_kobo" numeric NOT NULL,
  	"method" "enum_pledges_method" DEFAULT 'transfer' NOT NULL,
  	"purpose" "enum_pledges_purpose" DEFAULT 'empowerment' NOT NULL,
  	"message" varchar,
  	"consent" boolean DEFAULT false NOT NULL,
  	"status" "enum_pledges_status" DEFAULT 'new' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "assistance_requests_circumstances" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_assistance_requests_circumstances",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "assistance_requests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"whatsapp" varchar NOT NULL,
  	"email" varchar,
  	"state" varchar NOT NULL,
  	"lga" varchar NOT NULL,
  	"category" "enum_assistance_requests_category" NOT NULL,
  	"need" varchar NOT NULL,
  	"hospital" varchar,
  	"amount_requested_kobo" numeric,
  	"referee_name" varchar NOT NULL,
  	"referee_phone" varchar NOT NULL,
  	"consent_to_process" boolean DEFAULT false NOT NULL,
  	"consent_to_be_named" boolean DEFAULT false,
  	"status" "enum_assistance_requests_status" DEFAULT 'new' NOT NULL,
  	"internal_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "assistance_requests_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "programmes_recordings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"recorded_on" timestamp(3) with time zone,
  	"audio_id" integer,
  	"external_url" varchar,
  	"duration_minutes" numeric
  );
  
  CREATE TABLE "programmes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"teacher_id" integer,
  	"description" jsonb,
  	"recurrence_rule" varchar NOT NULL,
  	"recurrence_exception" "enum_programmes_recurrence_exception" DEFAULT 'none',
  	"start_time" varchar,
  	"duration_minutes" numeric,
  	"venue" varchar,
  	"platform" varchar,
  	"language" "enum_programmes_language",
  	"is_free" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "teachers_credentials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"credential" varchar NOT NULL
  );
  
  CREATE TABLE "teachers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"honorific" varchar,
  	"bio" jsonb,
  	"photo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" jsonb,
  	"volume_litres" numeric NOT NULL,
  	"pack_size" varchar,
  	"retail_price_kobo" numeric NOT NULL,
  	"wholesale_price_kobo" numeric,
  	"min_wholesale_litres" numeric DEFAULT 5,
  	"nafdac_number" varchar,
  	"in_stock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "ambassadors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"email" varchar,
  	"code" varchar NOT NULL,
  	"registered_at" timestamp(3) with time zone NOT NULL,
  	"status" "enum_ambassadors_status" DEFAULT 'active' NOT NULL,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "orders_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer NOT NULL,
  	"quantity" numeric NOT NULL,
  	"litres" numeric NOT NULL,
  	"unit_price_kobo" numeric NOT NULL
  );
  
  CREATE TABLE "orders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"reference" varchar NOT NULL,
  	"customer_name" varchar NOT NULL,
  	"customer_phone" varchar NOT NULL,
  	"customer_email" varchar,
  	"customer_address" varchar,
  	"is_new_customer" boolean DEFAULT false,
  	"referral_code" varchar,
  	"total_kobo" numeric NOT NULL,
  	"delivery_zone" varchar,
  	"status" "enum_orders_status" DEFAULT 'pending' NOT NULL,
  	"paystack_ref" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"credit" varchar,
  	"consent_recorded" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "newsletter_subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"name" varchar,
  	"consent" boolean DEFAULT false NOT NULL,
  	"consent_timestamp" timestamp(3) with time zone,
  	"source" varchar,
  	"status" "enum_newsletter_subscribers_status" DEFAULT 'subscribed' NOT NULL,
  	"subscribed_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contact_messages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"topic" "enum_contact_messages_topic" NOT NULL,
  	"subject_line" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"routed_to" varchar,
  	"consent" boolean DEFAULT false NOT NULL,
  	"status" "enum_contact_messages_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"appeals_id" integer,
  	"annual_reports_id" integer,
  	"remedies_id" integer,
  	"articles_id" integer,
  	"pages_id" integer,
  	"testimonials_id" integer,
  	"team_members_id" integer,
  	"faqs_id" integer,
  	"donations_id" integer,
  	"pledges_id" integer,
  	"assistance_requests_id" integer,
  	"programmes_id" integer,
  	"teachers_id" integer,
  	"products_id" integer,
  	"ambassadors_id" integer,
  	"orders_id" integer,
  	"media_id" integer,
  	"newsletter_subscribers_id" integer,
  	"contact_messages_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "appeals_updates" ADD CONSTRAINT "appeals_updates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."appeals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "appeals_rels" ADD CONSTRAINT "appeals_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."appeals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "appeals_rels" ADD CONSTRAINT "appeals_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "annual_reports_beneficiaries" ADD CONSTRAINT "annual_reports_beneficiaries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."annual_reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "annual_reports_surplus_assistances" ADD CONSTRAINT "annual_reports_surplus_assistances_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."annual_reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "annual_reports" ADD CONSTRAINT "annual_reports_pdf_upload_id_media_id_fk" FOREIGN KEY ("pdf_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "remedies_hadiths" ADD CONSTRAINT "remedies_hadiths_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."remedies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "remedies" ADD CONSTRAINT "remedies_related_product_id_products_id_fk" FOREIGN KEY ("related_product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "remedies" ADD CONSTRAINT "remedies_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_team_members_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_remedies_fk" FOREIGN KEY ("remedies_id") REFERENCES "public"."remedies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "donations" ADD CONSTRAINT "donations_appeal_ref_id_appeals_id_fk" FOREIGN KEY ("appeal_ref_id") REFERENCES "public"."appeals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "assistance_requests_circumstances" ADD CONSTRAINT "assistance_requests_circumstances_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."assistance_requests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assistance_requests_rels" ADD CONSTRAINT "assistance_requests_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."assistance_requests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assistance_requests_rels" ADD CONSTRAINT "assistance_requests_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_recordings" ADD CONSTRAINT "programmes_recordings_audio_id_media_id_fk" FOREIGN KEY ("audio_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programmes_recordings" ADD CONSTRAINT "programmes_recordings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes" ADD CONSTRAINT "programmes_teacher_id_teachers_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "teachers_credentials" ADD CONSTRAINT "teachers_credentials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."teachers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "teachers" ADD CONSTRAINT "teachers_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_appeals_fk" FOREIGN KEY ("appeals_id") REFERENCES "public"."appeals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_annual_reports_fk" FOREIGN KEY ("annual_reports_id") REFERENCES "public"."annual_reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_remedies_fk" FOREIGN KEY ("remedies_id") REFERENCES "public"."remedies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_donations_fk" FOREIGN KEY ("donations_id") REFERENCES "public"."donations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pledges_fk" FOREIGN KEY ("pledges_id") REFERENCES "public"."pledges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_assistance_requests_fk" FOREIGN KEY ("assistance_requests_id") REFERENCES "public"."assistance_requests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_programmes_fk" FOREIGN KEY ("programmes_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_teachers_fk" FOREIGN KEY ("teachers_id") REFERENCES "public"."teachers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ambassadors_fk" FOREIGN KEY ("ambassadors_id") REFERENCES "public"."ambassadors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_newsletter_subscribers_fk" FOREIGN KEY ("newsletter_subscribers_id") REFERENCES "public"."newsletter_subscribers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_messages_fk" FOREIGN KEY ("contact_messages_id") REFERENCES "public"."contact_messages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "appeals_updates_order_idx" ON "appeals_updates" USING btree ("_order");
  CREATE INDEX "appeals_updates_parent_id_idx" ON "appeals_updates" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "appeals_slug_idx" ON "appeals" USING btree ("slug");
  CREATE INDEX "appeals_updated_at_idx" ON "appeals" USING btree ("updated_at");
  CREATE INDEX "appeals_created_at_idx" ON "appeals" USING btree ("created_at");
  CREATE INDEX "appeals_rels_order_idx" ON "appeals_rels" USING btree ("order");
  CREATE INDEX "appeals_rels_parent_idx" ON "appeals_rels" USING btree ("parent_id");
  CREATE INDEX "appeals_rels_path_idx" ON "appeals_rels" USING btree ("path");
  CREATE INDEX "appeals_rels_media_id_idx" ON "appeals_rels" USING btree ("media_id");
  CREATE INDEX "annual_reports_beneficiaries_order_idx" ON "annual_reports_beneficiaries" USING btree ("_order");
  CREATE INDEX "annual_reports_beneficiaries_parent_id_idx" ON "annual_reports_beneficiaries" USING btree ("_parent_id");
  CREATE INDEX "annual_reports_surplus_assistances_order_idx" ON "annual_reports_surplus_assistances" USING btree ("_order");
  CREATE INDEX "annual_reports_surplus_assistances_parent_id_idx" ON "annual_reports_surplus_assistances" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "annual_reports_fiscal_year_idx" ON "annual_reports" USING btree ("fiscal_year");
  CREATE INDEX "annual_reports_pdf_upload_idx" ON "annual_reports" USING btree ("pdf_upload_id");
  CREATE INDEX "annual_reports_updated_at_idx" ON "annual_reports" USING btree ("updated_at");
  CREATE INDEX "annual_reports_created_at_idx" ON "annual_reports" USING btree ("created_at");
  CREATE INDEX "remedies_hadiths_order_idx" ON "remedies_hadiths" USING btree ("_order");
  CREATE INDEX "remedies_hadiths_parent_id_idx" ON "remedies_hadiths" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "remedies_slug_idx" ON "remedies" USING btree ("slug");
  CREATE INDEX "remedies_related_product_idx" ON "remedies" USING btree ("related_product_id");
  CREATE INDEX "remedies_featured_image_idx" ON "remedies" USING btree ("featured_image_id");
  CREATE INDEX "remedies_updated_at_idx" ON "remedies" USING btree ("updated_at");
  CREATE INDEX "remedies_created_at_idx" ON "remedies" USING btree ("created_at");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_status_idx" ON "articles" USING btree ("status");
  CREATE INDEX "articles_cover_image_idx" ON "articles" USING btree ("cover_image_id");
  CREATE INDEX "articles_author_idx" ON "articles" USING btree ("author_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_remedies_id_idx" ON "articles_rels" USING btree ("remedies_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_status_idx" ON "pages" USING btree ("status");
  CREATE INDEX "pages_site_idx" ON "pages" USING btree ("site");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "testimonials_status_idx" ON "testimonials" USING btree ("status");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE UNIQUE INDEX "team_members_slug_idx" ON "team_members" USING btree ("slug");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE INDEX "faqs_site_idx" ON "faqs" USING btree ("site");
  CREATE INDEX "faqs_status_idx" ON "faqs" USING btree ("status");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE UNIQUE INDEX "donations_reference_idx" ON "donations" USING btree ("reference");
  CREATE INDEX "donations_purpose_idx" ON "donations" USING btree ("purpose");
  CREATE INDEX "donations_appeal_ref_idx" ON "donations" USING btree ("appeal_ref_id");
  CREATE INDEX "donations_status_idx" ON "donations" USING btree ("status");
  CREATE UNIQUE INDEX "donations_paystack_ref_idx" ON "donations" USING btree ("paystack_ref");
  CREATE INDEX "donations_updated_at_idx" ON "donations" USING btree ("updated_at");
  CREATE INDEX "donations_created_at_idx" ON "donations" USING btree ("created_at");
  CREATE INDEX "purpose_status_idx" ON "donations" USING btree ("purpose","status");
  CREATE INDEX "pledges_updated_at_idx" ON "pledges" USING btree ("updated_at");
  CREATE INDEX "pledges_created_at_idx" ON "pledges" USING btree ("created_at");
  CREATE INDEX "assistance_requests_circumstances_order_idx" ON "assistance_requests_circumstances" USING btree ("order");
  CREATE INDEX "assistance_requests_circumstances_parent_idx" ON "assistance_requests_circumstances" USING btree ("parent_id");
  CREATE INDEX "assistance_requests_category_idx" ON "assistance_requests" USING btree ("category");
  CREATE INDEX "assistance_requests_updated_at_idx" ON "assistance_requests" USING btree ("updated_at");
  CREATE INDEX "assistance_requests_created_at_idx" ON "assistance_requests" USING btree ("created_at");
  CREATE INDEX "assistance_requests_rels_order_idx" ON "assistance_requests_rels" USING btree ("order");
  CREATE INDEX "assistance_requests_rels_parent_idx" ON "assistance_requests_rels" USING btree ("parent_id");
  CREATE INDEX "assistance_requests_rels_path_idx" ON "assistance_requests_rels" USING btree ("path");
  CREATE INDEX "assistance_requests_rels_media_id_idx" ON "assistance_requests_rels" USING btree ("media_id");
  CREATE INDEX "programmes_recordings_order_idx" ON "programmes_recordings" USING btree ("_order");
  CREATE INDEX "programmes_recordings_parent_id_idx" ON "programmes_recordings" USING btree ("_parent_id");
  CREATE INDEX "programmes_recordings_audio_idx" ON "programmes_recordings" USING btree ("audio_id");
  CREATE UNIQUE INDEX "programmes_slug_idx" ON "programmes" USING btree ("slug");
  CREATE INDEX "programmes_teacher_idx" ON "programmes" USING btree ("teacher_id");
  CREATE INDEX "programmes_updated_at_idx" ON "programmes" USING btree ("updated_at");
  CREATE INDEX "programmes_created_at_idx" ON "programmes" USING btree ("created_at");
  CREATE INDEX "teachers_credentials_order_idx" ON "teachers_credentials" USING btree ("_order");
  CREATE INDEX "teachers_credentials_parent_id_idx" ON "teachers_credentials" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "teachers_slug_idx" ON "teachers" USING btree ("slug");
  CREATE INDEX "teachers_photo_idx" ON "teachers" USING btree ("photo_id");
  CREATE INDEX "teachers_updated_at_idx" ON "teachers" USING btree ("updated_at");
  CREATE INDEX "teachers_created_at_idx" ON "teachers" USING btree ("created_at");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_media_id_idx" ON "products_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "ambassadors_code_idx" ON "ambassadors" USING btree ("code");
  CREATE INDEX "ambassadors_status_idx" ON "ambassadors" USING btree ("status");
  CREATE INDEX "ambassadors_updated_at_idx" ON "ambassadors" USING btree ("updated_at");
  CREATE INDEX "ambassadors_created_at_idx" ON "ambassadors" USING btree ("created_at");
  CREATE INDEX "orders_items_order_idx" ON "orders_items" USING btree ("_order");
  CREATE INDEX "orders_items_parent_id_idx" ON "orders_items" USING btree ("_parent_id");
  CREATE INDEX "orders_items_product_idx" ON "orders_items" USING btree ("product_id");
  CREATE UNIQUE INDEX "orders_reference_idx" ON "orders" USING btree ("reference");
  CREATE INDEX "orders_customer_customer_phone_idx" ON "orders" USING btree ("customer_phone");
  CREATE INDEX "orders_referral_code_idx" ON "orders" USING btree ("referral_code");
  CREATE INDEX "orders_status_idx" ON "orders" USING btree ("status");
  CREATE UNIQUE INDEX "orders_paystack_ref_idx" ON "orders" USING btree ("paystack_ref");
  CREATE INDEX "orders_updated_at_idx" ON "orders" USING btree ("updated_at");
  CREATE INDEX "orders_created_at_idx" ON "orders" USING btree ("created_at");
  CREATE INDEX "referralCode_status_idx" ON "orders" USING btree ("referral_code","status");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "newsletter_subscribers_email_idx" ON "newsletter_subscribers" USING btree ("email");
  CREATE INDEX "newsletter_subscribers_updated_at_idx" ON "newsletter_subscribers" USING btree ("updated_at");
  CREATE INDEX "newsletter_subscribers_created_at_idx" ON "newsletter_subscribers" USING btree ("created_at");
  CREATE INDEX "contact_messages_topic_idx" ON "contact_messages" USING btree ("topic");
  CREATE INDEX "contact_messages_updated_at_idx" ON "contact_messages" USING btree ("updated_at");
  CREATE INDEX "contact_messages_created_at_idx" ON "contact_messages" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_appeals_id_idx" ON "payload_locked_documents_rels" USING btree ("appeals_id");
  CREATE INDEX "payload_locked_documents_rels_annual_reports_id_idx" ON "payload_locked_documents_rels" USING btree ("annual_reports_id");
  CREATE INDEX "payload_locked_documents_rels_remedies_id_idx" ON "payload_locked_documents_rels" USING btree ("remedies_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_donations_id_idx" ON "payload_locked_documents_rels" USING btree ("donations_id");
  CREATE INDEX "payload_locked_documents_rels_pledges_id_idx" ON "payload_locked_documents_rels" USING btree ("pledges_id");
  CREATE INDEX "payload_locked_documents_rels_assistance_requests_id_idx" ON "payload_locked_documents_rels" USING btree ("assistance_requests_id");
  CREATE INDEX "payload_locked_documents_rels_programmes_id_idx" ON "payload_locked_documents_rels" USING btree ("programmes_id");
  CREATE INDEX "payload_locked_documents_rels_teachers_id_idx" ON "payload_locked_documents_rels" USING btree ("teachers_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_ambassadors_id_idx" ON "payload_locked_documents_rels" USING btree ("ambassadors_id");
  CREATE INDEX "payload_locked_documents_rels_orders_id_idx" ON "payload_locked_documents_rels" USING btree ("orders_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_newsletter_subscribers_id_idx" ON "payload_locked_documents_rels" USING btree ("newsletter_subscribers_id");
  CREATE INDEX "payload_locked_documents_rels_contact_messages_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_messages_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "appeals_updates" CASCADE;
  DROP TABLE "appeals" CASCADE;
  DROP TABLE "appeals_rels" CASCADE;
  DROP TABLE "annual_reports_beneficiaries" CASCADE;
  DROP TABLE "annual_reports_surplus_assistances" CASCADE;
  DROP TABLE "annual_reports" CASCADE;
  DROP TABLE "remedies_hadiths" CASCADE;
  DROP TABLE "remedies" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "donations" CASCADE;
  DROP TABLE "pledges" CASCADE;
  DROP TABLE "assistance_requests_circumstances" CASCADE;
  DROP TABLE "assistance_requests" CASCADE;
  DROP TABLE "assistance_requests_rels" CASCADE;
  DROP TABLE "programmes_recordings" CASCADE;
  DROP TABLE "programmes" CASCADE;
  DROP TABLE "teachers_credentials" CASCADE;
  DROP TABLE "teachers" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "ambassadors" CASCADE;
  DROP TABLE "orders_items" CASCADE;
  DROP TABLE "orders" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "newsletter_subscribers" CASCADE;
  DROP TABLE "contact_messages" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_appeals_category";
  DROP TYPE "public"."enum_appeals_status";
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum_articles_site";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum_pages_site";
  DROP TYPE "public"."enum_testimonials_site";
  DROP TYPE "public"."enum_testimonials_status";
  DROP TYPE "public"."enum_faqs_site";
  DROP TYPE "public"."enum_faqs_status";
  DROP TYPE "public"."enum_donations_purpose";
  DROP TYPE "public"."enum_donations_status";
  DROP TYPE "public"."enum_donations_channel";
  DROP TYPE "public"."enum_pledges_method";
  DROP TYPE "public"."enum_pledges_purpose";
  DROP TYPE "public"."enum_pledges_status";
  DROP TYPE "public"."enum_assistance_requests_circumstances";
  DROP TYPE "public"."enum_assistance_requests_category";
  DROP TYPE "public"."enum_assistance_requests_status";
  DROP TYPE "public"."enum_programmes_recurrence_exception";
  DROP TYPE "public"."enum_programmes_language";
  DROP TYPE "public"."enum_ambassadors_status";
  DROP TYPE "public"."enum_orders_status";
  DROP TYPE "public"."enum_newsletter_subscribers_status";
  DROP TYPE "public"."enum_contact_messages_topic";
  DROP TYPE "public"."enum_contact_messages_status";
  DROP TYPE "public"."enum_users_role";`)
}
