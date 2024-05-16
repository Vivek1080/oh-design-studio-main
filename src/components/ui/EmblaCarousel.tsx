import React from "react";
import useEmblaCarousel from "embla-carousel-react";

import home1 from "@/assets/mobileImage/home1.png";
import home2 from "@/assets/mobileImage/home2.png";
import home3 from "@/assets/mobileImage/home3.png";
import Image from "next/image";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import Link from "next/link";
import logo from "@/assets/images/Logo .png";

export default function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="embla h-screen relative">
      <Link scroll={false} href="/">
        <Image
          className="absolute top-[5vh] left-[4.5vw] cursor-pointer z-50"
          src={logo}
          alt="Logo"
        />
      </Link>
      <div className="embla__viewport h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          <div className="embla__slide flex justify-center items-center h-full">
            <div className="h-full relative">
              <Image className="h-full w-full" src={home1} alt="home1 Image" />
              <div className="bottom-[19vh] left-[4.5vw] text-white absolute">
                <div className=" text-sm font-semibold">CLIENT NAME</div>
                <div className=" text-xl font-semibold ">WE CREATE</div>
                <div className=" text-xl font-semibold ">
                  GAME CHANGING BRANDS
                </div>

                <div className="text-sm text-[#fff500] font-semibold">
                  GO TO PROJECT
                </div>
              </div>
            </div>
          </div>
          <div className="embla__slide flex justify-center items-center h-full">
            <div className="h-full relative">
              <Image className="h-full w-full" src={home2} alt="home1 Image" />
              <div className="bottom-[19vh] left-[4.5vw] text-white absolute">
                <div className=" text-sm font-semibold">CLIENT NAME</div>
                <div className=" text-xl font-semibold ">WE CREATE</div>
                <div className=" text-xl font-semibold ">
                  GAME CHANGING BRANDS
                </div>

                <div className="text-sm text-[#fff500] font-semibold">
                  GO TO PROJECT
                </div>
              </div>
            </div>
          </div>
          <div className="embla__slide flex justify-center items-center h-full">
            <div className="h-full relative">
              <Image className="h-full w-full" src={home3} alt="home1 Image" />
              <div className="bottom-[19vh] left-[4.5vw] text-white absolute">
                <div className=" text-sm font-semibold">CLIENT NAME</div>
                <div className=" text-xl font-semibold ">WE CREATE</div>
                <div className=" text-xl font-semibold ">
                  GAME CHANGING BRANDS
                </div>

                <div className="text-sm text-[#fff500] font-semibold">
                  GO TO PROJECT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="embla__dots absolute bottom-[19vh] right-[4.5vw] flex gap-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={"embla__dot h-3 w-3 rounded-full border-0 ".concat(
              index === selectedIndex
                ? " embla__dot--selected bg-gray-200 "
                : "bg-textGray"
            )}
          />
        ))}
      </div>
    </div>
  );
}
