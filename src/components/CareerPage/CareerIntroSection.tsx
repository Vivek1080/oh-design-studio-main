import React from "react";

import aboutImage from "@/assets/home/about-us.png";
import linkBtn from "@/assets/images/linkBtn.png";

import Image from "next/image";

const CareerIntroSection = () => {
  return (
    <div className="px-[6.5vw] h-full flex justify-between gap-12">
      <div className="pt-[9.5vh] pb-[10vh] flex flex-col gap-5">
        <div className="text-6xl text-textGray font-semibold">
          <div>Life at</div>
          <div>OH! Design</div>
        </div>
        <div className="text-xl w-[18vw]">
          Split polished on the streets of Hells Kitchen. Refined at the table
          of Peter Luger
        </div>
        <div className="text-sm w-[22vw]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
          temporibus corporis quis asperiores, possimus vero dolorum voluptate
          id ipsa blanditiis. Repellendus, tempore! Repudiandae expedita
          eligendi fugit et iusto vitae explicabo quo quisquam consequatur
          optio? Assumenda, beatae. Ipsa voluptates expedita tempora. In velit
          magni perspiciatis officiis quidem dolorem.
        </div>
      </div>
      <Image className="h-full" src={aboutImage} alt="Img" />
      <div className="flex flex-col justify-between pt-[9.5vh] pb-[10vh]">
        <div className="text-textGray flex flex-col gap-6">
          <div>
            <div>01</div>
            <div className="text-[42px] font-semibold">Senior Copywriter</div>
          </div>
          <div>
            <div>02</div>
            <div className="text-[42px] font-semibold">
              Senior Media Executive
            </div>
          </div>
          <div>
            <div>03</div>
            <div className="text-[42px] font-semibold">Senior Editor</div>
          </div>
        </div>
        <div>
          <div className="text-xl">Didnt find what you were looking for?</div>
          <div className="flex items-center gap-2">
            <div className="font-semibold">LETS TALK</div>
            <Image src={linkBtn} width={17} height={17} alt="link" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerIntroSection;
