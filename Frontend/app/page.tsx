import type { Metadata } from "next";
import { EduFlowLandingPage } from "@/components/landing/EduFlowLandingPage";

export const metadata: Metadata = {
  title: "EduFlow CRM | EdTech Sales Pipeline",
  description:
    "A premium landing page for EduFlow CRM, built for school-sales teams, automation, and role-based pipeline visibility.",
};

export default function Page() {
  return <EduFlowLandingPage />;
}
