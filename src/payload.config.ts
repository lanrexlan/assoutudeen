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
  secret: process.env.PAYLOAD_SECRET ?? "",

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
