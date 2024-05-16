"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { usePathname } from "next/navigation";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useContext, useRef } from "react";
import Link from "next/link";
import { TransitionContext } from "@/context/TransitionContext";
import HomeFooter from "../LandingPage/HomeFooter";
import CareerIntroSection from "./CareerIntroSection";
import JobDescription from "./JobDescription";
import FormPage from "./FormPage";
import ContactPage from "../AboutUsPage/ContactPage";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ApplicationFormPage = () => {
  const container = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const { timeline } = useContext(TransitionContext);

  const { setPreviousRoute } = useContext(TransitionContext);

  useGSAP(
    () => {
      const sections: HTMLDivElement[] = gsap.utils.toArray(".panel");

      const amountToScroll = 100 * (sections.length - 1);
      const scrollSpeed = sections.length * 1000;

      gsap.to(sections, {
        xPercent: -amountToScroll, // amount to scroll
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          // snap: 1 / (sections.length - 1),
          start: "center center",
          scrub: 1,
          end: () => {
            return `+=${scrollSpeed}`;
          },
          // markers: {
          //   startColor: "purple",
          //   endColor: "fuchsia",
          //   fontSize: "2rem",
          //   indent: 200,
          // },
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
    },
    { scope: container }
  );

  return (
    <>
      <div ref={container} id="mainContainer" className="invisible">
        <div className="flex h-screen hello ">
          <div className="bg-bgGray  panel h-[75vh] my-auto  w-[96vw] ml-[4vw] flex-shrink-0 ">
            <FormPage />
          </div>

          <div className="panel h-[75vh] my-auto w-[96vw] pr-[4vw]   flex-shrink-0 ">
            <HomeFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationFormPage;
