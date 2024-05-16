import React, { useContext, useRef } from "react";

import portfolio1 from "@/assets/portfolio/portFolio1.png";
import portfolio2 from "@/assets/portfolio/thumb.jpg";
import Image from "next/image";
import Link from "next/link";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { TransitionContext } from "@/context/TransitionContext";

gsap.registerPlugin(useGSAP);

const PortfolioMobile = () => {
  const { timeline } = useContext(TransitionContext);

  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      timeline.add(
        gsap.to(container.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        })
      );
    },
    { scope: container }
  );

  return (
    <div ref={container} className="h-screen">
      <div className="h-1/2">
        <Link scroll={false} href="/single-portfolio">
          <Image
            className="h-full w-screen object-cover"
            src={portfolio1}
            alt="home1 Image"
          />
        </Link>
      </div>
      <div className="h-1/2">
        <Link scroll={false} href="/single-portfolio">
          <Image
            className="h-full w-full object-cover"
            src={portfolio2}
            alt="home1 Image"
          />
        </Link>
      </div>
    </div>
  );
};

export default PortfolioMobile;
