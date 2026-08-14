import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";

export const metadata: Metadata = {
  title: "Basket",
  description: "Your honey order basket.",
};

/** The cart and checkout arrive with the shop in a later session. */
export default function CartPage() {
  return (
    <ComingSoon
      title="Your Basket"
      description="Your order will live here once the shop is open."
      pending="the cart and checkout — being built with the product catalogue"
      whatsappMessage="As-salaamu alaykum. I would like to place a honey order."
      backHref="/honey"
    />
  );
}
