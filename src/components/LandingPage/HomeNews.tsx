import Image from "next/image";
import React from "react";
import news1 from "@/assets/home/news1.png";
import news2 from "@/assets/home/news2.png";
import news3 from "@/assets/home/news3.png";

import linkBtn from "@/assets/images/linkBtn.png";

const HomeNews = () => {
  return (
    <div className="px-[6.5vw] h-full ">
      <div className="pt-[9.5vh] pb-[10vh] flex flex-col">
        <div className="text-textGray text-6xl font-semibold">News</div>
        <div className="mx-[5.5vw] mt-8 mb-[6.5vh] grid grid-cols-3 ">
          <div className="flex flex-col h-full gap-6 px-7 border-r border-textGray border-0 border-solid">
            <div>01</div>
            <div className="flex flex-col gap-3">
              <Image className="w-full h-auto" src={news1} alt="news Image" />

              <div className="text-textGray text-2xl">
                Branding & Design blog
              </div>
              <div className="text-sm leading-4">
                Since Michael Ferdman founded firstborn in 1997, weve seen the
                digital landscape change dramatically.
              </div>
            </div>
            <Image src={linkBtn} alt="link" />
          </div>
          <div className="flex flex-col h-full gap-6 px-7 border-r border-textGray border-0 border-solid">
            <div>01</div>
            <div className="flex flex-col gap-3">
              <Image className="w-full h-auto" src={news2} alt="news Image" />

              <div className="text-textGray text-2xl">
                Branding & Design blog
              </div>
              <div className="text-sm leading-4">
                Since Michael Ferdman founded firstborn in 1997, weve seen the
                digital landscape change dramatically.
              </div>
            </div>
            <Image src={linkBtn} alt="link" />
          </div>
          <div className="flex flex-col h-full gap-6 px-7">
            <div>01</div>
            <div className="flex flex-col gap-3">
              <Image className="w-full h-auto" src={news3} alt="news Image" />

              <div className="text-textGray text-2xl">
                Branding & Design blog
              </div>
              <div className="text-sm leading-4">
                Since Michael Ferdman founded firstborn in 1997, weve seen the
                digital landscape change dramatically.
              </div>
            </div>
            <Image src={linkBtn} alt="link" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNews;
