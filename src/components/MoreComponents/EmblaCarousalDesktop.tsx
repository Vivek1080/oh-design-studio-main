import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type CarouselItem = {
  slug: string;
  entry: {
    title: string;
    client_name: string;
    headline1: string;
    headline2: string;
    project_link: string;
    project_image: string;
  };
};

import {
  DotButton,
  useDotButton,
} from "@/components/ui/EmblaCarouselDotButton";
import Image from "next/image";

const EmblaCarousalDesktop = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const [carouselData, setCarouselData] = useState<CarouselItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/home-carousel");
        const data = await response.json();
        setCarouselData(data);
      } catch (error) {
        console.error("Error fetching carousel data:", error);
      }
    };

    fetchData();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  return (
    <div className="embla h-full ">
      <div className="embla__viewport h-full " ref={emblaRef}>
        <div className="embla__container h-full">
          {carouselData.map((item, index) => (
            <div
              key={index}
              className="embla__slide flex justify-center items-center h-full relative"
            >
              <Image
                className="h-full w-full "
                src={item.entry.project_image}
                width={500}
                height={500}
                alt="img "
              />
              <div className="bottom-[6.5vh] left-[6.5vw] text-white brandText absolute">
                <div className=" text-sm font-semibold">
                  {item.entry.client_name}
                </div>
                <div className=" text-4xl font-semibold ">WE CREATE</div>
                <div className=" text-4xl font-semibold mb-[1.5vh] ">
                  GAME CHANGING BRANDS
                </div>

                <div className="text-sm text-[#fff500] font-semibold">
                  GO TO PROJECT
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__dots absolute bottom-[6.5vh] right-[6.5vw] flex gap-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={"embla__dot h-3 w-3 rounded-full border-0  cursor-pointer".concat(
              index === selectedIndex
                ? " embla__dot--selected bg-gray-200 "
                : " bg-textGray"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default EmblaCarousalDesktop;
