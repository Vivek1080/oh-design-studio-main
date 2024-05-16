import Nav from "@/components/LandingPage/Nav";
import SinglePortFolioDesignMobile from "@/components/MobileView/SinglePortFolioDesignMobile";
import SinglePortFolioDesign from "@/components/PortfolioPage/SinglePortFolioDesign";
import React from "react";

const SinglePortfolio = () => {
  return (
    <>
      <div className="hidden sm:block">
        <Nav />
        {/* <SinglePortFolioDesign /> */}
      </div>
      <div className="sm:hidden">
        <SinglePortFolioDesignMobile />
      </div>
    </>
  );
};

export default SinglePortfolio;
