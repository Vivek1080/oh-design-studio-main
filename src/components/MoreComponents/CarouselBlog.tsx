import { useRef, useState } from "react";
import { gsap } from "gsap";

import linkBtn from "@/assets/images/linkBtn.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const blogs = [
  [
    {
      id: "01",
      title: "Branding & Design Blog",
      subject: "Header or subject",
      content:
        "Since Michael Ferdman founded firstborn in 1997, weve seen the digital landscape change dramatically. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint consequuntur, consequatur vel sequi eligendi amet tempore autem placeat doloremque perferendis sunt excepturi qui dolorem explicabo sit vitae officia fugit! Doloribus sapiente, ipsum nihil placeat nulla enim tempore fuga qui nostrum, sunt ex quam sed accusantium esse incidunt culpa illum numquam minus quis dignissimos sequi. Blanditiis quia veritatis quasi iste labore similique soluta tempora..",
    },
    {
      id: "02",
      title: "Branding & Design Blog",
      subject: "Header or subject",
      content:
        "Since Michael Ferdman founded firstborn in 1997, weve seen the digital landscape change dramatically. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint consequuntur, consequatur vel sequi eligendi amet tempore autem pla! Doloribus sapiente, ipsum nihil placeat nulla enim tempore fuga qui nostrum, sunt ex quam sed accusantium esse incidunt culpa illum numquam minus quis dignissimos sequi. Blanditiis quia veritatis quasi iste labore similique soluta tempora..",
    },
    {
      id: "03",
      title: "Branding & Design Blog",
      subject: "Header or subject",
      content:
        "Since Michael Ferdman founded firstborn in 1997, weve seen the digital landscape change dramatically. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint consequuntur, consequatur vel sequi eligendi amet tempore autem placeat doloremque perferendis sunt excepturi qui dolorem explicabo sit vitae officia fugit! Doloribus sapiente, ipsum nihil placeat nulla enim tempore fuga qui nostrum, sunt ex quam sed accusantium esse incidunt culpa illum numquam minus quis dignissimos sequi. Blanditiis quia veritatis quasi iste labore similique soluta tempora..",
    },
  ],
  [
    {
      id: "04",
      title: "Branding & Design Blog",
      subject: "Header or subject",
      content:
        "Since Michael Ferdman founded firstborn in 1997, weve seen the digital landscape change dramatically. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint consequuntur, consequatur vel sequi eligendi amet tempore autem placeat doloremque perferendis sunt excepturi qui dolorem explicabo sit vitae officia fugit! Doloribus sapiente, ipsum nihil placeat nulla enim tempore fuga qui nostrum, sunt ex quam sed accusantium esse incidunt culpa illum numquam minus quis dignissimos sequi. Blanditiis quia veritatis quasi iste labore similique soluta tempora..",
    },
    {
      id: "05",
      title: "Branding & Design Blog",
      subject: "Header or subject",
      content:
        "Since Michael Ferdman founded firstborn in 1997, weve seen the digital landscape change dramatically. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint consequuntur, consequatur vel sequi eligendi amet tempore autem placeat doloremque perferendis sunt excepturi qui dolorem explicabo sit vitae officia fugit! Doloribus sapiente, ipsum nihil placeat nulla enim tempore fuga qui nostrum, sunt ex quam sed accusantium esse incidunt culpa illum numquam minus quis dignissimos sequi. Blanditiis quia veritatis quasi iste labore similique soluta tempora..",
    },
    {
      id: "06",
      title: "Branding & Design Blog",
      subject: "Header or subject",
      content:
        "Since Michael Ferdman founded firstborn in 1997, weve seen the digital landscape change dramatically. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint consequuntur, consequatur vel sequi eligendi amet tempore autem placeat doloremque perferendis sunt excepturi qui dolorem explicabo sit vitae officia fugit! Doloribus sapiente, ipsum nihil placeat nulla enim tempore fuga qui nostrum, sunt ex quam sed accusantium esse incidunt culpa illum numquam minus quis dignissimos sequi. Blanditiis quia veritatis quasi iste labore similique soluta tempora..",
    },
  ],
  [
    {
      id: "07",
      title: "Branding & Design Blog",
      subject: "Header or subject",
      content:
        "Since Michael Ferdman founded firstborn in 1997, weve seen the digital landscape change dramatically. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint consequuntur, consequatur vel sequi eligendi amet tempore autem placeat doloremque perferendis sunt excepturi qui dolorem explicabo sit vitae officia fugit! Doloribus sapiente, ipsum nihil placeat nulla enim tempore fuga qui nostrum, sunt ex quam sed accusantium esse incidunt culpa illum numquam minus quis dignissimos sequi. Blanditiis quia veritatis quasi iste labore similique soluta tempora..",
    },
    {
      id: "08",
      title: "Branding & Design Blog",
      subject: "Header or subject",
      content:
        "Since Michael Ferdman founded firstborn in 1997, weve seen the digital landscape change dramatically. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint consequuntur, consequatur vel sequi eligendi amet tempore autem placeat doloremque perferendis sunt excepturi qui dolorem explicabo sit vitae officia fugit! Doloribus sapiente, ipsum nihil placeat nulla enim tempore fuga qui nostrum, sunt ex quam sed accusantium esse incidunt culpa illum numquam minus quis dignissimos sequi. Blanditiis quia veritatis quasi iste labore similique soluta tempora..",
    },
    // Add more blog objects as needed
  ],
];

export default function BlogCarousel() {
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const linesRef = useRef<Array<HTMLDivElement | null>>([]);

  const handleMouseEnter = (blogIndex: number) => {
    gsap.to(linesRef.current[blogIndex], {
      width: "80px",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (blogIndex: number) => {
    gsap.to(linesRef.current[blogIndex], {
      width: "0",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <Carousel
      opts={{ align: "start" }}
      orientation="vertical"
      className="w-[87vw] h-fit"
    >
      <CarouselContent className="h-[48vh] ">
        {blogs.map((blogGroup, groupIndex) => (
          <CarouselItem key={groupIndex}>
            <div className="grid grid-cols-3  mx-[5.5vw] h-[48vh]">
              {blogGroup.map((blog, index) => (
                <div
                  key={blog.id}
                  onMouseEnter={() => handleMouseEnter(groupIndex * 3 + index)}
                  onMouseLeave={() => handleMouseLeave(groupIndex * 3 + index)}
                  className={`flex flex-col gap-6 px-7 h-[48vh] border-r border-solid border-0 border-textGray ${
                    (groupIndex * 3 + index) % 3 === 2 ? "border-r-0" : ""
                  }`}
                >
                  <div className="flex flex-col justify-around h-full">
                    <div>
                      <div className="mb-8 flex flex-row">
                        <div className="flex gap-3 items-center">
                          <div
                            ref={(el) => {
                              linesRef.current[groupIndex * 3 + index] = el;
                            }}
                            className="bg-textGray h-[2px]  "
                          />
                          <div className="text-textGray">{blog.id}</div>
                        </div>
                      </div>
                      <div className="text-textGray text-2xl font-semibold">
                        <div>{blog.title}</div>
                        <div>{blog.subject}</div>
                      </div>
                    </div>
                    <div className="flex flex-col h-[30vh] justify-between">
                      <div className="text-sm leading-4 w-[75%] mt-4 overflow-hidden">
                        {blog.content}
                      </div>
                      <Image src={linkBtn} alt="link" className="" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
