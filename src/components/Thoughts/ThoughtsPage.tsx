"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { usePathname } from "next/navigation";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useContext, useRef } from "react";
import Link from "next/link";
import { TransitionContext } from "@/context/TransitionContext";
import { Draggable } from "gsap/dist/Draggable";
import HomeThoughts from "../LandingPage/HomeThoughts";
import HomeFooter from "../LandingPage/HomeFooter";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);

const ThoughtsPage = () => {
  const container = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  console.log(pathname);

  const { timeline } = useContext(TransitionContext);

  const { setPreviousRoute } = useContext(TransitionContext);

  let maxWidth = 0;

  useGSAP(
    () => {
      const sections: HTMLDivElement[] = gsap.utils.toArray(".panel");

      const amountToScroll = 100 * (sections.length - 1);
      const scrollSpeed = sections.length * 1000;

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
        // xPercent: -amountToScroll, // amount to scroll
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

      // Draggable Part
      // Scrolling

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
    },
    { scope: container }
  );

  return (
    <>
      <div ref={container} id="mainContainer" className="invisible">
        <div className="flex h-screen cursor-default">
          <div className="panel h-[75vh] my-auto  w-screen flex-shrink-0 ">
            <HomeThoughts />
          </div>
          <div className=" panel h-[75vh] my-auto w-[96vw] pr-[4vw] flex-shrink-0 ">
            <HomeFooter />
          </div>

          <div className="drag-proxy invisible absolute"></div>
        </div>
      </div>
    </>
  );
};

export default ThoughtsPage;
