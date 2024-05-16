import React, { useRef, useState } from "react";
import { gsap } from "gsap";

interface IData {
  id: number;
  headerText: string;
  heading: string;
  subheadings: string[];
  description: string;
}

const data: IData[] = [
  {
    id: 1,
    headerText: "Capabilities",
    heading: "Branding & Design",
    subheadings: ["Subheading 1", "Subheading 2", "Subheading 3"],
    description: `
      Since Michael Ferdman founded Firstborn in 1997, we’ve seen the digital
      landscape change dramatically. Our industry has transformed, our
      clients’ businesses and their challenges have become more complex,
      consumer behavior has shifted, and we, as a company.`,
  },
  {
    id: 2,
    headerText: "Capabilities",
    heading: "Packaging & Design",
    subheadings: ["Subheading 4", "Subheading 5", "Subheading 6"],
    description: `
      Since Michael Ferdman founded Firstborn in 1997, we’ve seen the digital
      landscape change dramatically. Our industry has transformed, our
      clients’ businesses and their challenges have become more complex,
      consumer behavior has shifted, and we, as a company.`,
  },
  {
    id: 3,
    headerText: "Capabilities",
    heading: "Digital Marketing",
    subheadings: ["Subheading 7", "Subheading 8", "Subheading 9"],
    description: `
      Since Michael Ferdman founded Firstborn in 1997, we’ve seen the digital
      landscape change dramatically. Our industry has transformed, our
      clients’ businesses and their challenges have become more complex,
      consumer behavior has shifted, and we, as a company.`,
  },
  {
    id: 4,
    headerText: "Capabilities",
    heading: "Environmental Graphics",
    subheadings: ["Subheading 10", "Subheading 11", "Subheading 12"],
    description: `
      Since Michael Ferdman founded Firstborn in 1997, we’ve seen the digital
      landscape change dramatically. Our industry has transformed, our
      clients’ businesses and their challenges have become more complex,
      consumer bmpany. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aspernatur qui non sequi dicta blanditiis iure quas totam commodi modi, rem odio quia voluptas excepturi libero corrupti odit placeat ratione?`,
  },
];

const HomeAboutUs2: React.FC = () => {
  const [currentDescription, setCurrentDescription] = useState<string>("");
  const [currentSubHeadings, setCurrentSubHeadings] = useState<string[]>([]);

  const descriptionRef = useRef<HTMLDivElement>(null);
  const headerTextRef = useRef<Array<null | HTMLDivElement>>(
    Array(data.length).fill(null)
  );

  const linesRef = useRef<Array<HTMLDivElement | null>>(
    Array(data.length).fill(null)
  );
  const headingsRef = useRef<Array<HTMLDivElement | null>>(
    Array(data.length).fill(null)
  );

  const handleMouseEnter = (index: number) => {
    setCurrentDescription(data[index].description);
    setCurrentSubHeadings(data[index].subheadings);

    gsap.to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.5 });
    gsap.to(headingsRef.current[index], { opacity: 1, duration: 0.5 });
    gsap.to(linesRef.current[index], {
      width: "60px",
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(headerTextRef.current[index], { opacity: 1 });
  };

  const handleMouseLeave = (index: number) => {
    setCurrentDescription("");
    setCurrentSubHeadings([]);

    gsap.to(descriptionRef.current, { opacity: 0, y: 20, duration: 0.5 });
    gsap.to(headingsRef.current[index], { opacity: 0.6, duration: 0.5 });
    gsap.to(linesRef.current[index], {
      width: "0px",
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(headerTextRef.current[index], { opacity: 0 });
  };

  return (
    <div className="pr-[6.5vw] pl-[13vw] flex h-full justify-between">
      <div className="pt-[9.5vh] pb-[10vh] flex flex-col justify-between text-textGray">
        {data.map((item, index) => (
          <div
            key={item.id}
            className="flex gap-2 relative"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div className="flex gap-2 items-center h-fit">
              <div
                // ref={headerTextRef.current[index]}
                ref={(el) => {
                  headerTextRef.current[index] = el;
                }}
                className="text-xl font-medium opacity-0"
              >
                {item.headerText}
              </div>
              <div className="text-sm aboutUsText2">0{item.id}</div>
              <div
                ref={(el) => {
                  linesRef.current[index] = el;
                }}
                className="bg-textGray h-[2px]"
              ></div>
            </div>
            <div
              ref={(el) => {
                headingsRef.current[index] = el;
              }}
              className="md:text-4xl text-3xl lg:text-5xl font-semibold opacity-60 cursor-pointer aboutUsText2"
            >
              {item.heading}
            </div>
          </div>
        ))}
      </div>
      <div
        className="text-sm pt-[9.5vh] pb-[10vh] max-w-[25vw] opacity-0"
        ref={descriptionRef}
      >
        <div>{currentDescription}</div>
        <ul>
          {currentSubHeadings.map((subheading, index) => (
            <li key={index}>{subheading}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeAboutUs2;
