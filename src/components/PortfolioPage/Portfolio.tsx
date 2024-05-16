"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { usePathname } from "next/navigation";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TransitionContext } from "@/context/TransitionContext";
import HomeFooter from "../LandingPage/HomeFooter";
import Image from "next/image";

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

interface PortfolioProps {
  data: PortfolioData[];
}

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);

const Portfolio: React.FC<PortfolioProps> = ({ data }) => {
  const container = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const { timeline } = useContext(TransitionContext);

  const { setPreviousRoute } = useContext(TransitionContext);

  let maxWidth = 0;

  useGSAP(
    () => {
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

      console.log("ratio", dragRatio);

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

      const closestEdge = (x: number, y: number, w: number, h: number) => {
        const topEdgeDist = distMetric(x, y, w / 2, 0);
        const bottomEdgeDist = distMetric(x, y, w / 2, h);
        const leftEdgeDist = distMetric(x, y, 0, h / 2);
        const rightEdgeDist = distMetric(x, y, w, h / 2);
        const min = Math.min(
          topEdgeDist,
          bottomEdgeDist,
          leftEdgeDist,
          rightEdgeDist
        );
        switch (min) {
          case leftEdgeDist:
            return "left";
          case rightEdgeDist:
            return "right";
          case topEdgeDist:
            return "top";
          case bottomEdgeDist:
            return "bottom";
          default:
            return "";
        }
      };

      const distMetric = (x: number, y: number, x2: number, y2: number) => {
        const xDiff = x - x2;
        const yDiff = y - y2;
        return xDiff * xDiff + yDiff * yDiff;
      };

      const boxes = document.querySelectorAll<HTMLDivElement>(".boxes");

      boxes.forEach((box) => {
        box.addEventListener("mouseenter", handleMouseEnter);
        box.addEventListener("mouseleave", handleMouseLeave);
      });
      function handleMouseEnter(this: HTMLDivElement, e: MouseEvent) {
        const x = e.clientX - this.offsetLeft;
        const y = e.clientY - this.offsetTop;
        const edge = closestEdge(x, y, this.clientWidth, this.clientHeight);
        const overlay = this.querySelector<HTMLDivElement>(".overlay");
        const overlayText = this.querySelector<HTMLDivElement>(".textOverlay");

        console.log("edge", edge);

        if (!overlay) return; // Check if overlay is null
        if (!overlayText) return; // Check if overlay is null

        switch (edge) {
          case "left":
            overlay.style.top = "0%";
            overlay.style.left = "-100%";
            overlayText.style.top = "0%";
            overlayText.style.left = "-100%";

            gsap.to(overlay, { duration: 0.25, left: "0%" });
            gsap.to(overlayText, { duration: 0.25, left: "0%" });

            break;
          case "right":
            overlay.style.top = "0%";
            overlay.style.left = "100%";
            overlayText.style.top = "0%";
            overlayText.style.left = "100%";
            gsap.to(overlay, { duration: 0.25, left: "0%" });
            gsap.to(overlayText, { duration: 0.25, left: "0%" });
            break;
          case "top":
            overlay.style.top = "-100%";
            overlay.style.left = "0%";
            overlayText.style.top = "-100%";
            overlayText.style.left = "0%";
            gsap.to(overlay, { duration: 0.25, top: "0%" });
            gsap.to(overlayText, { duration: 0.25, top: "0%" });
            break;
          case "bottom":
            overlay.style.top = "100%";
            overlay.style.left = "0%";
            overlayText.style.top = "100%";
            overlayText.style.left = "0%";
            gsap.to(overlay, { duration: 0.25, top: "0%" });
            gsap.to(overlayText, { duration: 0.25, top: "0%" });
            break;
          default:
            break;
        }
      }

      function handleMouseLeave(this: HTMLDivElement, e: MouseEvent) {
        const x = e.clientX - this.offsetLeft;
        const y = e.clientY - this.offsetTop;
        const edge = closestEdge(x, y, this.clientWidth, this.clientHeight);
        const overlay = this.querySelector<HTMLDivElement>(".overlay");
        const overlayText = this.querySelector<HTMLDivElement>(".textOverlay");

        if (!overlay) return; // Check if overlay is null
        if (!overlayText) return; // Check if overlay is null

        switch (edge) {
          case "left":
            gsap.set(overlay, { left: "-100%" });
            gsap.to(overlayText, {
              duration: 0.25,
              left: "100%",
              ease: "power4.in",
            });
            break;
          case "right":
            gsap.set(overlay, { left: "100%" });
            gsap.to(overlayText, {
              duration: 0.25,
              left: "-100%",
              ease: "power4.in",
            });
            break;
          case "top":
            gsap.set(overlay, { top: "-100%" });
            gsap.to(overlayText, {
              duration: 0.25,
              top: "100%",
              ease: "power4.in",
            });
            break;
          case "bottom":
            gsap.set(overlay, { top: "100%" });
            gsap.to(overlayText, {
              duration: 0.25,
              top: "-100%",
              ease: "power4.in",
            });
            break;
          default:
            gsap.set(overlay, { top: "100%" });
            break;
        }

        // Delay before hiding the overlay
        setTimeout(() => {
          gsap.set(overlay, { top: "100%" });
        }, 250); // Adjust the delay time as needed
      }
      return () => {
        // Cleanup event listeners when component unmounts
        boxes.forEach((box) => {
          box.removeEventListener("mouseenter", handleMouseEnter);
          box.removeEventListener("mouseleave", handleMouseLeave);
        });
      };
    },
    { scope: container }
  );

  return (
    <>
      <div ref={container} id="mainContainer" className="invisible">
        <div className="flex h-screen hello cursor-default ">
          <div className="panel h-[75vh] w-auto flex my-auto flex-col  ">
            {/* <HomePortfolio /> */}
            <div className=" flex flex-row h-[50%] ml-[4vw]">
              {data.map(
                (item, index) =>
                  index % 2 === 0 && (
                    <div
                      key={index}
                      className=" w-[32vw] boxes z-50 h-full relative overflow-hidden cursor-pointer"
                    >
                      <Image
                        src={item.entry.project_bg_image}
                        width={500}
                        height={500}
                        alt="ima"
                        className="h-full w-full"
                      />
                      <Link href={`/portfolio/${item.slug}`}>
                        <div className="overlay absolute inset-0 w-full h-full left-[100%] bg-[#f2f3f2] text-white z-10"></div>
                        <div className="textOverlay absolute inset-0 w-full h-full flex flex-col justify-center items-center text-[#534e50] left-[100%] z-20 text-4xl ">
                          <div className=" text-sm font-semibold mb-2 text-[#191718]">
                            {item.entry.client_name}
                          </div>
                          <div className=" text-3xl font-semibold ">
                            {item.entry.headline1}
                          </div>
                          <div className=" text-3xl font-semibold mb-[1.5vh] ">
                            {item.entry.headline2}
                          </div>

                          <div className="text-sm font-semibold mt-6">
                            {item.entry.portfolio_category}
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
              )}
            </div>
            <div className="flex flex-row h-[50%] ml-[4vw]">
              {data.map(
                (item, index) =>
                  index % 2 !== 0 && (
                    <div
                      key={index}
                      className=" w-[32vw] boxes z-50 h-full relative overflow-hidden cursor-pointer"
                    >
                      <Image
                        src={item.entry.project_bg_image}
                        width={500}
                        height={500}
                        alt="ima"
                        className="h-full w-full"
                      />
                      <Link href={`/portfolio/${item.slug}`}>
                        <div className="overlay absolute inset-0 w-full h-full left-[100%] bg-[#f2f3f2] text-white z-10"></div>
                        <div className="textOverlay absolute inset-0 w-full h-full flex flex-col justify-center items-center text-[#534e50] left-[100%] z-20 text-4xl ">
                          <div className=" text-sm font-semibold mb-2 text-[#191718]">
                            {item.entry.client_name}
                          </div>
                          <div className=" text-3xl font-semibold ">
                            {item.entry.headline1}
                          </div>
                          <div className=" text-3xl font-semibold mb-[1.5vh] ">
                            {item.entry.headline2}
                          </div>

                          <div className="text-sm font-semibold mt-6">
                            {item.entry.portfolio_category}
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
              )}
            </div>
          </div>

          <div className="panel h-[75vh] my-auto w-[96vw] pr-[4vw]   flex-shrink-0 ">
            <HomeFooter />
          </div>
          <div className="drag-proxy invisible absolute"></div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
