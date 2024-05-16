import { TransitionContext } from "@/context/TransitionContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext, useRef } from "react";

const PortfolioMenu = () => {
  const container = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const { timeline } = useContext(TransitionContext);
  const { previousRoute } = useContext(TransitionContext);
  const { setPreviousRoute } = useContext(TransitionContext);

  useGSAP(
    () => {
      gsap.set(".overlay", { xPercent: -101 });

      const screenWidth = window.innerWidth;

      gsap.fromTo(
        container.current,
        { x: -screenWidth },
        {
          x: 0,
          duration: 1,
          ease: "power2.out",
        }
      );

      if (pathname !== null) {
        setPreviousRoute(pathname);
      }

      timeline.add(
        gsap.to(container.current, {
          x: -screenWidth,
          duration: 0.5,
          ease: "power2.in",
        })
      );
    },
    { scope: container }
  );

  const onMouseEnter = (className: string) => {
    gsap.to(`.${className} .overlay`, { xPercent: 0 });
  };

  const onMouseLeave = (className: string) => {
    gsap.to(`.${className} .overlay`, { xPercent: -101 });
  };

  return (
    <>
      <div ref={container} className="h-screen flex">
        <div className=" my-auto text-3xl w-full flex text-white panel h-[75vh] flex-col items-center">
          <div className="justify-between flex flex-col h-full overflow-hidden">
            <Link
              href="/portfolios/all"
              scroll={false}
              className=" w-fit text-[13.5vh] leading-none font-semibold text-black us px-2 relative no-underline"
              onMouseEnter={() => onMouseEnter("us")}
              onMouseLeave={() => onMouseLeave("us")}
            >
              <div className="w-fit">
                All.
                <div className="bg-yellowMenu absolute w-full  h-full top-0 left-0 -z-10 overlay"></div>
              </div>
            </Link>

            <Link
              href="/portfolios/print"
              scroll={false}
              className=" text-[13.5vh] leading-none  w-fit font-semibold text-black px-2 work relative no-underline"
              onMouseEnter={() => onMouseEnter("work")}
              onMouseLeave={() => onMouseLeave("work")}
            >
              <div className="w-fit">
                Print.
                <div className="bg-yellowMenu absolute w-full  h-full top-0 left-0 -z-10 overlay"></div>
              </div>
            </Link>

            <Link
              href="/portfolios/digital"
              scroll={false}
              className=" text-[13.5vh] leading-none  w-fit font-semibold thoughts text-black px-2 relative no-underline"
              onMouseEnter={() => onMouseEnter("thoughts")}
              onMouseLeave={() => onMouseLeave("thoughts")}
            >
              <div className="w-fit">
                Digital.
                <div className="bg-yellowMenu absolute w-full  h-full top-0 left-0 -z-10 overlay"></div>
              </div>
            </Link>

            <Link
              href="/portfolios/packaging"
              scroll={false}
              className=" text-[13.5vh] leading-none  w-fit font-semibold career text-black px-2 relative no-underline"
              onMouseEnter={() => onMouseEnter("career")}
              onMouseLeave={() => onMouseLeave("career")}
            >
              <div className="w-fit">
                Packaging.
                <div className="bg-yellowMenu absolute w-full  h-full top-0 left-0 -z-10 overlay"></div>
              </div>
            </Link>

            <Link
              href="/portfolios/environmental"
              scroll={false}
              className=" text-[13.5vh] leading-none  w-fit font-semibold contact text-black px-2 relative no-underline"
              onMouseEnter={() => onMouseEnter("contact")}
              onMouseLeave={() => onMouseLeave("contact")}
            >
              <div className="w-fit">
                Environmental.
                <div className="bg-yellowMenu absolute w-full  h-full top-0 left-0 -z-10 overlay"></div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioMenu;
