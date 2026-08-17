import { DonateAction, SiteHeader } from "@/components/site/site-header";
import { getSiteContext } from "@/lib/site-context";

export async function FoundationHeader() {
  const { href } = await getSiteContext("foundation");
  return <SiteHeader site="foundation" action={<DonateAction href={href("/donate")} />} />;
}
