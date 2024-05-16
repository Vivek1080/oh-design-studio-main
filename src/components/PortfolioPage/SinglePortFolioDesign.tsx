"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { usePathname } from "next/navigation";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useContext, useEffect, useRef, useState } from "react";
import { TransitionContext } from "@/context/TransitionContext";

import { Draggable } from "gsap/dist/Draggable";

interface PortfolioImage {
  image: string | null;
  width: number;
  height: number;
}

interface PortfolioEntry {
  title: string;
  client_name: string;
  headline1: string;
  headline2: string;
  portfolio_category: ("print" | "digital" | "packaging" | "environmental")[];
  description: string;
  project_bg_image: string;
  portfolio_images: PortfolioImage[];
}

interface PortfolioData {
  slug: string;
  entry: PortfolioEntry;
}

interface WorkProps {
  data: PortfolioEntry;
}

import {
  FaBehance,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { LiaCopyright } from "react-icons/lia";

import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);

const SinglePortFolioDesign: React.FC<WorkProps> = ({ data }) => {
  // get WindowHeight

  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    // Function to update windowHeight state with current innerHeight
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    // Set initial window height
    handleResize();

    // Event listener to update windowHeight state on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Gsap Animation ----------------------------------
  const container = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const { timeline } = useContext(TransitionContext);

  const { setPreviousRoute } = useContext(TransitionContext);

  let maxWidth = 0;

  useGSAP(
    () => {
      // Scrolling

      const sections: HTMLDivElement[] = gsap.utils.toArray(".panel");

      const getMaxWidth = () => {
        maxWidth = 0;
        sections.forEach((section) => {
          maxWidth += section.offsetWidth;
        });
      };

      getMaxWidth();
      ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

      let scrollTween = gsap.to(sections, {
        x: () => `-${maxWidth - window.innerWidth}`,

        ease: "none",
      });

      let horizontalScroll = ScrollTrigger.create({
        animation: scrollTween,
        trigger: container.current,
        pin: true,
        // snap: 1 / (sections.length - 1),
        start: "center center",
        scrub: 2,
        end: () => `+=${maxWidth}`,
        invalidateOnRefresh: true,
      });

      // Draggable Part

      var dragRatio = maxWidth / (maxWidth - window.innerWidth);

      Draggable.create(".drag-proxy", {
        trigger: container.current,
        type: "x",
        allowContextMenu: true,
        onPress() {
          this.startScroll = horizontalScroll.scroll();
        },
        onDrag() {
          horizontalScroll.scroll(
            this.startScroll - (this.x - this.startX) * dragRatio
          );
        },
      });

      const screenWidth = window.innerWidth;

      const tl = gsap.timeline();

      const init = () => {
        if (data !== null) {
          tl.fromTo(
            container.current,
            {
              x: screenWidth,
              autoAlpha: 0,
            },
            {
              x: 0,
              autoAlpha: 1,
              duration: 1,
              ease: "power2.out",
            }
          );
        }
      };

      setTimeout(() => {
        init();
      }, 0.0001);

      if (pathname !== null) {
        setPreviousRoute(pathname);
      }

      const totalContentWidth = sections.length * window.innerWidth;

      timeline.add(
        gsap.to(container.current, {
          x: totalContentWidth,
          duration: 0.5,
          ease: "power2.in",
        })
      );
    },
    { scope: container, dependencies: [windowHeight] }
  );

  return (
    <>
      <div ref={container} id="mainContainer" className="invisible">
        <div className="flex h-screen hello cursor-default ">
          <div className="panel h-[75vh] my-auto  w-[46vw] bg-yellowBg ml-[4vw] flex-shrink-0 ">
            <div className=" flex flex-col justify-center h-full pl-[18%] pr-[10%]">
              <div className="text-[10vh] font-semibold text-textGray mb-6">
                {data?.client_name}
              </div>
              <div className="mb-6 hidden lg:block text-sm lg:text-base ">
                {data?.description}
              </div>
              <div className="mb-6  lg:hidden text-sm  ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                laboriosam repellat unde numquam nemo. Tempore adipisci impedit
                aperiam neque.
              </div>

              <div className="text-sm lg:text-base">
                Sound Interesting? Scroll for more team vibes.
              </div>
            </div>
          </div>

          {data?.portfolio_images
            .filter((image) => image !== null)
            .map((image, index) => {
              const newHeight = (75 * windowHeight) / 100;
              const newWidth = (newHeight * image.width) / image.height;

              // Add a null check here
              if (!image.image) return null;

              return (
                <div
                  key={index}
                  className=" h-[75vh] w-fit my-auto flex-shrink-0"
                >
                  {image && (
                    <Image
                      src={image.image}
                      alt="portfolio image"
                      width={newWidth} // Dynamically set width
                      height={1000}
                      className={`h-full panel w-[${newWidth}px]`}
                      priority={true}
                    />
                  )}
                </div>
              );
            })}

          <div className="panel h-[75vh] my-auto w-[28rem] flex-shrink-0 flex justify-center items-end">
            <div className="h-60 flex flex-col justify-between">
              <div className="text-lg w-48">
                402, Makani Center, 35th Linking Road, Bandra(W), 400050.
              </div>
              <div>Leave a message</div>
              <div>
                <div className="flex gap-1">
                  <FaTwitter className="bg-gray-900 rounded-full p-1 text-white" />
                  <FaFacebook className="bg-gray-900 rounded-full p-1 text-white" />
                  <FaInstagram className="bg-gray-900 rounded-full p-1 text-white" />
                  <FaLinkedinIn className="bg-gray-900 rounded-full p-1 text-white" />
                  <FaBehance className="bg-gray-900 rounded-full p-1 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-1  mt-8">
                <LiaCopyright className="h-5 w-5" />
                <div className="text-lg font-semibold">Copyright 2024</div>
              </div>
            </div>
          </div>

          <div className="drag-proxy invisible absolute"></div>
        </div>
      </div>
    </>
  );
};

export default SinglePortFolioDesign;
