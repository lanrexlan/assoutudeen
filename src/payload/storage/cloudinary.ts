import { v2 as cloudinary } from "cloudinary";
import type { Adapter, GeneratedAdapter } from "@payloadcms/plugin-cloud-storage/types";

/**
 * Cloudinary adapter for @payloadcms/plugin-cloud-storage.
 *
 * Payload publishes official adapters for S3, GCS, Azure and Vercel Blob but
 * not Cloudinary, and the community Payload-2 package does not support Payload
 * 3 — so this implements the same small adapter interface directly.
 *
 * Files live under a per-collection folder. Delivery goes through Cloudinary's
 * CDN, which matters on patchy Nigerian mobile data.
 */

type CloudinaryAdapterArgs = {
  /** Cloudinary folder prefix, e.g. "assoutudeen". */
  folder?: string;
};

const isConfigured = () =>
  Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );

const configure = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
};

/** `media/appeal-photo.jpg` -> Cloudinary public_id, extension stripped. */
const publicId = (folder: string, filename: string) =>
  `${folder}/${filename.replace(/\.[^./]+$/, "")}`;

export const cloudinaryAdapter =
  ({ folder = "assoutudeen" }: CloudinaryAdapterArgs = {}): Adapter =>
  ({ collection }): GeneratedAdapter => {
    const prefix = `${folder}/${collection.slug}`;

    return {
      name: "cloudinary",

      async handleUpload({ file }) {
        configure();
        await new Promise<void>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              public_id: publicId(prefix, file.filename),
              resource_type: "auto",
              overwrite: true,
              // Payload has already produced the resize variants it needs.
              use_filename: false,
            },
            (error) => (error ? reject(error) : resolve()),
          );
          stream.end(file.buffer);
        });
      },

      async handleDelete({ filename }) {
        configure();
        await cloudinary.uploader.destroy(publicId(prefix, filename), {
          resource_type: "image",
          invalidate: true,
        });
      },

      generateURL({ filename }) {
        if (!isConfigured()) return "";
        return cloudinary.url(publicId(prefix, filename), {
          secure: true,
          fetch_format: "auto",
          quality: "auto",
        });
      },

      /**
       * Payload asks for the file when serving `/api/media/file/:name`. We
       * stream it back from Cloudinary rather than proxying every request in
       * production — public URLs are used for rendering, so this is mainly the
       * admin panel's path.
       */
      staticHandler: async (_req, { params: { filename } }) => {
        if (!isConfigured()) {
          return new Response("Cloudinary is not configured", { status: 501 });
        }
        configure();
        const url = cloudinary.url(publicId(prefix, filename), { secure: true });
        const upstream = await fetch(url);
        if (!upstream.ok || !upstream.body) {
          return new Response("Not found", { status: 404 });
        }
        return new Response(upstream.body, {
          status: 200,
          headers: {
            "content-type":
              upstream.headers.get("content-type") ?? "application/octet-stream",
            "cache-control": "public, max-age=31536000, immutable",
          },
        });
      },
    };
  };

export const cloudinaryConfigured = isConfigured;
