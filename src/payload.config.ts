import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage";

import { Users } from "@/payload/collections/Users";
import { Media } from "@/payload/collections/Media";
// Foundation — the main site
import { Appeals } from "@/payload/collections/Appeals";
import { AnnualReports } from "@/payload/collections/AnnualReports";
import { Remedies } from "@/payload/collections/Remedies";
import { Articles } from "@/payload/collections/Articles";
import { Pages } from "@/payload/collections/Pages";
import { Testimonials } from "@/payload/collections/Testimonials";
import { TeamMembers } from "@/payload/collections/TeamMembers";
import { FAQs } from "@/payload/collections/FAQs";
import { NewsletterSubscribers } from "@/payload/collections/NewsletterSubscribers";
import { ContactMessages } from "@/payload/collections/ContactMessages";
import { Donations } from "@/payload/collections/Donations";
import { Pledges } from "@/payload/collections/Pledges";
import { AssistanceRequests } from "@/payload/collections/AssistanceRequests";
// Dawah Institute
import { Programmes } from "@/payload/collections/Programmes";
import { Teachers } from "@/payload/collections/Teachers";
// Honey Enterprise
import { Products } from "@/payload/collections/Products";
import { Ambassadors } from "@/payload/collections/Ambassadors";
import { Orders } from "@/payload/collections/Orders";

import { cloudinaryAdapter, cloudinaryConfigured } from "@/payload/storage/cloudinary";

/**
 * Payload's own complaint about a blank secret is "missing secret key", thrown
 * from inside its bundle with no mention of which variable or where to set it —
 * and it surfaces as a bare 500 on /admin. An empty PAYLOAD_SECRET is easy to
 * end up with, since the example file ships one, so say what to do about it.
 *
 * This warns rather than throws on purpose. Throwing here fails the whole
 * build, which would take the public pages down over a variable only the CMS
 * needs; the public site does not touch Payload at all.
 */
function payloadSecret(): string {
  const secret = process.env.PAYLOAD_SECRET?.trim() ?? "";

  if (!secret) {
    console.error(
      [
        "",
        "  PAYLOAD_SECRET is empty. The admin panel will return 500 and the CMS",
        "  cannot start, so contact messages and assistance requests cannot be read.",
        "",
        "  Generate one:      openssl rand -base64 32",
        "  Set it locally in: .env.local",
        "  And on Vercel in:  Project → Settings → Environment Variables",
        "",
        "  Keep the value once set — changing it invalidates admin sessions.",
        "",
      ].join("\n"),
    );
  }

  return secret;
}

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "· Assoutudeen",
    },
  },

  /**
   * Collection order is the admin sidebar order. Groups keep the three sites
   * distinguishable, with the foundation first — it is the main site.
   */
  collections: [
    Appeals,
    AnnualReports,
    Remedies,
    Articles,
    Pages,
    Testimonials,
    TeamMembers,
    FAQs,
    Donations,
    Pledges,
    AssistanceRequests,
    Programmes,
    Teachers,
    Products,
    Ambassadors,
    Orders,
    Media,
    NewsletterSubscribers,
    ContactMessages,
    Users,
  ],

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI ?? "" },
  }),

  /* Dates are stored UTC; Africa/Lagos (UTC+1, no DST) is a display concern. */
  /* Payload's own error for a blank secret is "missing secret key", thrown
     from deep inside its bundle with no indication of which variable or where
     to set it. An empty string is the easiest thing in the world to end up
     with — the example file ships one — so say what to do about it. */
  secret: payloadSecret(),

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  plugins: [
    // Only mount Cloudinary when it is configured, so a fresh clone can run
    // the admin panel against local disk before credentials exist.
    ...(cloudinaryConfigured()
      ? [
          cloudStoragePlugin({
            collections: {
              media: {
                adapter: cloudinaryAdapter({
                  folder: process.env.CLOUDINARY_FOLDER ?? "assoutudeen",
                }),
                disableLocalStorage: true,
              },
            },
          }),
        ]
      : []),
  ],

  // Required for the Media imageSizes above.
  sharp,

  upload: {
    limits: { fileSize: 10_000_000 },
  },
});
