import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Payload client for Server Components. `getPayload` caches the instance, so
 * this is safe to call per request — no connection pool churn.
 *
 *   const payload = await getPayloadClient();
 *   const { docs } = await payload.find({ collection: "remedies", limit: 12 });
 */
export const getPayloadClient = async () => getPayload({ config });

/**
 * Zakat is a separate fund with its own ledger, never pooled with general
 * donations. Use these rather than hand-writing a `where` clause, so the
 * separation is impossible to forget.
 */
export const ZAKAT_LEDGER = { purpose: { equals: "zakat" } } as const;

export const NON_ZAKAT_LEDGER = { purpose: { not_equals: "zakat" } } as const;
