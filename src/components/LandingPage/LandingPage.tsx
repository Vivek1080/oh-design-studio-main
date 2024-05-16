"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Draggable } from "gsap/dist/Draggable";

import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TransitionContext } from "@/context/TransitionContext";

import HomeAboutUs from "./HomeAboutUs";
import HomeAboutUs2 from "./HomeAboutUs2";
import HomeFooter from "./HomeFooter";
import HomePortfolio from "./HomePortfolio";
import HomeClients from "./HomeClients";
import HomeNews from "./HomeNews";
import HomeThoughts from "./HomeThoughts";
import Nav from "./Nav";
import EmblaCarousel from "../ui/EmblaCarousel";
import EmblaCarousalDesktop from "../MoreComponents/EmblaCarousalDesktop";
import HomeMenu from "./HomeMenu";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);

const LandingPage = () => {
  const container = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);

  const pathname = usePathname();

  const { timeline } = useContext(TransitionContext);

  const { previousRoute } = useContext(TransitionContext);
  const { setPreviousRoute } = useContext(TransitionContext);

  console.log(previousRoute);

  useGSAP(
    () => {
      // Scrolling
      const sections: HTMLDivElement[] = gsap.utils.toArray(".panel");

      const amountToScroll = 100 * (sections.length - 1);

      let maxWidth = 0;

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

      // Draggable Part
      // Scrolling

      // Extra Animation
      gsap.from(".aboutUsText", {
        yPercent: 16,
        opacity: 0,
        stagger: 0.2,
        font: "2rem",
        scrollTrigger: {
          containerAnimation: scrollTween,
          trigger: ".aboutUsText",
          start: "top-=125% top",
          end: "top-=25% top",
          scrub: 1,
        },
      });

      gsap.from(".aboutUsText2", {
        yPercent: 80,
        opacity: 0,
        stagger: 0.2,
        font: "2rem",
        scrollTrigger: {
          containerAnimation: scrollTween,
          trigger: ".aboutUsText2",
          start: "top-=8000% top",
          end: "top-=3000% top",
          scrub: 1,
        },
      });

      // Extra Animation

      // Your other GSAP animations

      const screenWidth = window.innerWidth;

      const totalContentWidth = sections.length * window.innerWidth;

      const tl = gsap.timeline();

      const portfolioPattern = /^\/portfolio\//;

      const init = () => {
        if (previousRoute === "") {
          tl.fromTo(
            ".loading",
            {
              xPercent: -100,
              autoAlpha: 0,
            },
            {
              xPercent: 100,
              autoAlpha: 1,
              duration: 1.2,
            }
          )
            .fromTo(
              ".textOH",
              {
                autoAlpha: 0,
              },
              {
                autoAlpha: 1,
                // duration: 0.2,
              }
            )
            .fromTo(
              ".textHello",
              { y: 0 },
              {
                y: -40,
                duration: 0.5,
                delay: 0.5,
                onComplete: () => {
                  setTimeout(() => {
                    setIsLoading(false);
                  }, 800);
                },
              }
            )
            .fromTo(
              container.current,
              {
                x: screenWidth,
                autoAlpha: 0,
              },
              {
                x: 0,
                autoAlpha: 1,
                duration: 1,
                delay: 1,
                ease: "power2.out",
              }
            )
            .fromTo(
              ".brandText",
              {
                y: 30,
                opacity: 0,
              },
              { y: 0, opacity: 1 }
            );
        } else if (previousRoute === "/menu") {
          setIsLoading(false);
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
        } else if (
          previousRoute === "/portfolios/all" ||
          previousRoute === "/about-us" ||
          previousRoute === "/career" ||
          previousRoute === "/contact" ||
          previousRoute === "/thoughts" ||
          portfolioPattern.test(previousRoute)
        ) {
          setIsLoading(false);
          tl.fromTo(
            container.current,
            {
              x: -maxWidth,
            },
            {
              x: 0,
              ease: "power2.out",
              duration: 2,
            }
          );
        }
        // else if(portfolioPattern.test(previousRoute))
      };

      setTimeout(() => {
        init();
      }, 0.0001);
      if (pathname !== null) {
        setPreviousRoute(pathname);
      }

      console.log("previous route", previousRoute);

      timeline.add(
        gsap.to(container.current, {
          x: maxWidth,
          duration: 0.6,
          ease: "power2.in",
        })
      );
    },

    { scope: container }
  );

  return (
    <>
      {isLoading && (
        <div>
          <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 loading invisible">
            <div className="border-[2px] border-solid w-screen border-black"></div>
          </div>
          <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
            <div className="text-4xl invisible textOH font-semibold overflow-hidden w-fit h-10 gap-5 flex">
              OH!
              <div className="italic font-semibold textHello">
                <div>Hello</div>
                <div>Design</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <div>{!isLoading && <Nav />}</div>

        <div ref={container} id="mainContainer" className="">
          <div className="flex h-screen cursor-default ">
            <div className=" panel h-[75vh] my-auto  w-[96vw] pl-[4vw] flex-shrink-0 ">
              <EmblaCarousalDesktop />
            </div>

            <div className="bg-yellowBg panel h-[75vh] my-auto w-screen   flex-shrink-0 ">
              <HomeAboutUs />
            </div>
            <div className="bg-yellowBg panel h-[75vh] my-auto w-screen   flex-shrink-0 ">
              <HomeAboutUs2 />
            </div>
            <div className=" panel h-[75vh] my-auto w-screen   flex-shrink-0 ">
              <HomePortfolio />
            </div>
            <div className=" panel h-[75vh] my-auto w-screen   flex-shrink-0 ">
              <HomeClients />
            </div>
            <div className=" panel h-[75vh] my-auto w-screen  flex-shrink-0 ">
              <HomeNews />
            </div>
            <div className=" panel h-[75vh] my-auto w-screen  flex-shrink-0 ">
              <HomeThoughts />
            </div>
            {/* <div className=" panel h-[75vh] my-auto w-screen  flex-shrink-0 ">
              <HomeMenu />
            </div> */}
            <div className="panel h-[75vh] my-auto w-[96vw] pr-[4vw]   flex-shrink-0  cursor-default">
              <HomeFooter />
            </div>
            <div className="drag-proxy invisible absolute"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
