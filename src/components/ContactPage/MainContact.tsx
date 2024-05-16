import ContactPage from "@/components/AboutUsPage/ContactPage";
import { TransitionContext } from "@/context/TransitionContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext, useRef } from "react";

const MainContact = () => {
  const container = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const { timeline } = useContext(TransitionContext);
  const { previousRoute } = useContext(TransitionContext);
  const { setPreviousRoute } = useContext(TransitionContext);

  useGSAP(
    () => {
      gsap.set(".overlay", { xPercent: -101 });

      const screenWidth = window.innerWidth;

      const init = () => {
        gsap.fromTo(
          container.current,
          {
            x: screenWidth,
            autoAlpha: 0,
          },
          {
            x: 0,
            duration: 1,
            autoAlpha: 1,
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

      timeline.add(
        gsap.to(container.current, {
          x: screenWidth,
          duration: 0.5,
          ease: "power2.in",
        })
      );
    },
    { scope: container }
  );

  return (
    <div ref={container} className="h-screen flex invisible">
      <div className="bg-bgGray  panel h-[75vh] my-auto  w-[92vw] mx-[4vw] flex-shrink-0 ">
        <ContactPage />
      </div>
    </div>
  );
};

export default MainContact;
