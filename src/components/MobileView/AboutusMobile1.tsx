import React from "react";
import linkBtn from "@/assets/images/linkBtn.png";
import Image from "next/image";

const AboutusMobile1 = () => {
  return (
    <div className="h-screen bg-yellowBg">
      <div className="pt-[9vh] pb-[5vh] h-[86vh] px-[4.5vw]">
        <div className="h-[55vh] mt-[9vh] flex flex-col justify-between">
          <div className="text-textGray text-4xl">
            Character is a branding and design agency with studios in New York
            and San Francisco.
          </div>
          <div className="">
            Since Michael Ferdman founded Firstborn in 1997, weve seen the
            digital landscape change dramatically. Our industry has transformed,
            our clients businesses and their challenges have become more
            complex, consumer behavior has shifted, and we, as a company, have
            evolved with those changes along with it.
          </div>
          <div className="flex items-center gap-2">
            <div className="text-black font-medium">ABOUT US</div>
            <Image src={linkBtn} width={17} height={17} alt="link" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutusMobile1;
