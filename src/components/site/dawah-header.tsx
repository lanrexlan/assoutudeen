import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/site-header";
import { getSiteContext } from "@/lib/site-context";

export async function DawahHeader() {
  const { href } = await getSiteContext("dawah");
  return (
    <SiteHeader
      site="dawah"
      action={
        <Button asChild variant="ghostLight" className="shrink-0">
          <Link href={href("/schedule")}>Next class</Link>
        </Button>
      }
    />
  );
}
