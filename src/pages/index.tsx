import LandingPage from "@/components/LandingPage/LandingPage";
import AboutusMobile1 from "@/components/MobileView/AboutusMobile1";
import AboutusMobile2 from "@/components/MobileView/AboutusMobile2";
import FooterMobile from "@/components/MobileView/FooterMobile";
import LandingPageMobile from "@/components/MobileView/LandingPageMobile";
import MobileNav from "@/components/MobileView/MobileNav";
import PortfolioMobile from "@/components/MobileView/PortfolioMobile";
import React from "react";

const Home = () => {
  return (
    <main>
      <div className="hidden sm:block">
        <LandingPage />
      </div>
      <div className="block sm:hidden">
        <MobileNav />
        <LandingPageMobile />
        <AboutusMobile1 />
        <AboutusMobile2 />
        <PortfolioMobile />
        <FooterMobile />
      </div>
    </main>
  );
};

export default Home;
