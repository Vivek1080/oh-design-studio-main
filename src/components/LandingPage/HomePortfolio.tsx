import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";

type PortfolioEntry = {
  title: string;
  client_name: string;
  headline1: string;
  headline2: string;
  portfolio_category: string;
  description: string;
  project_bg_image: string;
  portfolio_images: (string | null)[];
};

type PortfolioData = {
  slug: string;
  entry: PortfolioEntry;
};

type Portfolios = PortfolioData[];

const HomePortfolio = () => {
  const container = useRef<HTMLDivElement>(null);

  const [portfolioData, setPortfolioData] = useState<Portfolios>([]);

  // console.log("gfdhjs", portfolioData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/portfolio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug: "all" }),
        });
        const data = await response.json();
        setPortfolioData(data);
      } catch (error) {
        console.error("Error fetching carousel data:", error);
      }
    };

    fetchData();
  }, []);

  useGSAP(
    () => {
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
    { scope: container, dependencies: [portfolioData] }
  );

  return (
    <div ref={container} className="grid grid-cols-3 h-full w-full">
      {portfolioData.map((item, index) => (
        <div
          key={index}
          className=" boxes z-50 h-[37.5vh] relative overflow-hidden cursor-pointer"
        >
          <Image
            src={item.entry.project_bg_image}
            width={500}
            height={500}
            alt="ima"
            className="h-full w-full"
          />
          <Link href={`/portfolios/${item.slug}`}>
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
      ))}
    </div>
  );
};

export default HomePortfolio;
