import MainMenu from "@/components/LandingPage/MainMenu";
import Nav from "@/components/LandingPage/Nav";
import MobileMenu from "@/components/MobileView/MobileMenu";
import MobileNav from "@/components/MobileView/MobileNav";
import React from "react";

const menu = () => {
  return (
    <>
      <div className="hidden sm:block">
        <Nav />
        <MainMenu />
      </div>
      <div className="sm:hidden">
        <MobileNav />
        <MobileMenu />
      </div>
    </>
  );
};

export default menu;
