import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";

export const metadata: Metadata = {
  title: "Shop",
  description: "Order pure honey from the Assoutudeen Honey Enterprise — retail and wholesale.",
};

/** The product catalogue is a later session; orders on WhatsApp work today. */
export default function ShopPage() {
  return (
    <ComingSoon
      title="Shop Honey"
      description="Pure honey by the litre, retail and wholesale, delivered across Nigeria."
      pending="the product catalogue, price list, pack sizes and delivery rates"
      whatsappMessage="As-salaamu alaykum. I would like to order honey from Assoutudeen Honey Enterprise."
      backHref="/honey/our-honey"
      backLabel="About our honey"
    />
  );
}
