import React from "react";

import Image from "next/image";
import aboutImg from "@/assets/home/about1.png";

const AboutUsSection1 = () => {
  return (
    <div className="px-[6.5vw] bg-yellowBg h-full  ml-[4vw] flex justify-between">
      <div className="pt-[9.5vh] pb-[10vh] flex flex-col justify-between">
        <div className="text-textGray text-6xl font-semibold">
          We help organizations transform their
        </div>
        <div className="text-textGray text-xl mt-20">Our Story</div>
        <div className="max-w-[30vw] text-xs">
          <p>
            Twenty-two years ago, we were founded on the belief that smart ideas
            and rich interactive experiences built with craft and creativity
            would move our clients businesses forward. We still believe that
            today.
          </p>
          <p>
            Twenty-two years ago, we were founded on the belief that smart ideas
            and rich interactive experiences built with craft and creativity
            would move our clients businesses forward. We still believe that
            today.
          </p>
          <p>
            Twenty-two years ago, we were founded on the belief that smart ideas
            and rich interactive experiences built with craft and creativity
            would move our clients businesses forward. We still believe that
            today.
          </p>
        </div>
      </div>
      <div>
        <Image
          className="h-full max-w-[40vw]"
          src={aboutImg}
          alt="about Image"
        />
      </div>
    </div>
  );
};

export default AboutUsSection1;
