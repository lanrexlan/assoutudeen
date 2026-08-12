/* THIS FILE IS PART OF THE PAYLOAD ADMIN PANEL. */
import type { ServerFunctionClient } from "payload";
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import config from "@payload-config";
import { importMap } from "./admin/importMap.js";

import "@payloadcms/next/css";
import "./custom.scss";

type Args = { children: React.ReactNode };

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

/**
 * The admin panel renders its own <html> and <body>, which is why the three
 * public sites each carry their own root layout rather than sharing one at
 * src/app/layout.tsx.
 */
export default function PayloadLayout({ children }: Args) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
