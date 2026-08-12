import type { Access, FieldAccess } from "payload";
import type { User } from "@/payload-types";

/**
 * Three roles (docs/09, session 2).
 *
 *  admin        — everything, including the finance ledgers
 *  editor       — content only. Must NOT see Donation or Order: those carry
 *                 donor and customer personal data plus money (NDPA 2023).
 *  shop-manager — the honey side: products, orders, ambassadors.
 */
export const ROLES = ["admin", "editor", "shop-manager"] as const;
export type Role = (typeof ROLES)[number];

type MaybeUser = User | null | undefined;

export const hasRole = (user: MaybeUser, ...roles: Role[]): boolean =>
  Boolean(user?.role && roles.includes(user.role as Role));

export const isAdmin = (user: MaybeUser) => hasRole(user, "admin");

/** Signed in at all. */
export const authenticated: Access = ({ req }) => Boolean(req.user);

export const adminOnly: Access = ({ req }) => isAdmin(req.user as MaybeUser);

export const adminFieldOnly: FieldAccess = ({ req }) =>
  isAdmin(req.user as MaybeUser);

export const adminOrEditor: Access = ({ req }) =>
  hasRole(req.user as MaybeUser, "admin", "editor");

export const adminOrShopManager: Access = ({ req }) =>
  hasRole(req.user as MaybeUser, "admin", "shop-manager");

/** Field-level variant — field access must return a boolean, not a query. */
export const adminOrShopManagerField: FieldAccess = ({ req }) =>
  hasRole(req.user as MaybeUser, "admin", "shop-manager");

/** Published content is public; drafts and everything else need a login. */
export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true;
  return { status: { equals: "published" } };
};

/** Anyone may read — used for public catalogue and library content. */
export const anyone: Access = () => true;
