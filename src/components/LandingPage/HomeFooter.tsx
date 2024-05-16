import React from "react";
import Image from "next/image";
import linkBtn from "@/assets/images/linkBtn.png";
import {
  FaBehance,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { LiaCopyright } from "react-icons/lia";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const services = [
  "Brand Insights and Audit",
  "Brand Strategy and Positioning",
  "Brand Architecture",
  "Brand Story and Narratives",
  "Voice and Communication",
  "Naming and Identity System",
  "Branded Environment",
  "Brand Internalization",
  "Brand Governance",
  "Brand Insights and Audit",
  "Brand Strategy and Positioning",
  "Brand Architecture",
  "Brand Story and Narratives",
  "Voice and Communication",
  "Naming and Identity System",
  "Branded Environment",
  "Brand Internalization",
  "Brand Governance",
  "Brand Story and Narratives",
  "Voice and Communication",
  "Naming and Identity System",
  "Branded Environment",
  "Brand Internalization",
  "Brand Governance",

  // Add more services as needed
];

const HomeFooter = () => {
  const chunks = Array.from(
    { length: Math.ceil(services.length / 9) },
    (_, i) => services.slice(i * 9, i * 9 + 9)
  );

  return (
    <div className="px-[6.5vw] flex h-full gap-24 bg-yellowBg ">
      <div className="pt-[9.5vh] pb-[10vh] flex flex-col justify-between">
        {/* Contact Information */}
        <div>
          <div className="text-xl font-semibold">Address:</div>
          <div className="text-xl w-52">
            402, Makani Center, 35th Linking Road, Bandra(W), 400050.
          </div>
        </div>
        <div>
          <div className="text-xl font-semibold">Phone:</div>
          <div className="text-xl">+91 2661 6280</div>
        </div>
        <div>
          <div className="text-xl font-semibold">Inquiries:</div>
          <div className="flex items-center gap-4">
            <div className="text-xl">Lets talk</div>
            <Image src={linkBtn} width={17} height={17} alt="link" />
          </div>
        </div>
        <div>
          <div className="text-xl font-semibold">Careers:</div>
          <div className="flex items-center gap-4">
            <div className="text-xl">View openings</div>
            <Image src={linkBtn} width={17} height={17} alt="link" />
          </div>
        </div>
        <div>
          <div className="text-xl font-semibold">Follow:</div>
          <div className="flex gap-1">
            <FaTwitter className="bg-gray-900 rounded-full p-1 text-white" />
            <FaFacebook className="bg-gray-900 rounded-full p-1 text-white" />
            <FaInstagram className="bg-gray-900 rounded-full p-1 text-white" />
            <FaLinkedinIn className="bg-gray-900 rounded-full p-1 text-white" />
            <FaBehance className="bg-gray-900 rounded-full p-1 text-white" />
          </div>
        </div>
      </div>

      {/* Our Services */}
      <div className="pt-[9.5vh] pb-[10vh] flex flex-col justify-between">
        <div>
          <div className="text-xl font-semibold">Our Services:</div>
          <div className="text-xl">
            <Carousel opts={{ align: "start" }} orientation="vertical">
              <CarouselContent className="h-[16rem] w-[20vw] ">
                {chunks.map((chunk, index) => (
                  <CarouselItem key={index}>
                    <div>
                      {chunk.map((service, sIndex) => (
                        <li key={sIndex} className="list-none">
                          {service}
                        </li>
                      ))}
                    </div>
                  </CarouselItem>
                ))}

                {/* {services.map((service, index) => (
                  <div key={index}>
                    <li className="list-none h-8">{service}</li>
                  </div>
                ))} */}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>

        {/* Find Us */}
        <div>
          <div className="text-xl font-semibold">Find Us:</div>
          <div className="text-xl">(^) Google Map</div>
        </div>

        {/* Copyright */}
        <div>
          <div className="flex items-center gap-1">
            <LiaCopyright className="h-5 w-5" />
            <div className="text-xl font-semibold">Copyright 2024</div>
          </div>
          <div className="text-xl">All Rights Reserved</div>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
