import { LandingContent } from "@/components/landing-content";
import { LandingFooter } from "@/components/landing-footer";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LeandingPage = () => {
  return (
    <>
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
      <LandingFooter />
    </>
  );
};

export default LeandingPage;
