import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";

export const metadata: Metadata = {
  title: "Request Assistance",
  description:
    "Ask the foundation for support — orphan care, widow empowerment, medical relief or crisis support.",
};

/**
 * docs/11 Form 1 — intake for people in distress. Designed for a cheap phone:
 * short, one question per screen, WhatsApp fallback at every step. The form
 * itself is a later session; WhatsApp works today and gets the same human.
 */
export default function RequestAssistancePage() {
  return (
    <ComingSoon
      title="Request Assistance"
      description="If you are facing a hardship — orphan care, widow empowerment, a medical emergency, or crisis support — tell us about it and a real person will review it. Emergency? Call 08161882470."
      pending="the application form — being built; health data will be handled under NDPA 2023"
      whatsappMessage="As-salaamu alaykum. I would like to request assistance from the foundation. My situation:"
      backHref="/empowerment"
      backLabel="About the fund"
    />
  );
}
