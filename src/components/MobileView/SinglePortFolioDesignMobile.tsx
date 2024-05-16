import React from "react";

import fisrt from "@/assets/portfolio/01.jpg";
import Image from "next/image";

import {
  FaBehance,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { LiaCopyright } from "react-icons/lia";

const images = [
  { src: require("@/assets/portfolio/01.jpg"), alt: "Image 1" },
  { src: require("@/assets/portfolio/02.jpg"), alt: "Image 2" },
  { src: require("@/assets/portfolio/03.jpg"), alt: "Image 3" },
  { src: require("@/assets/portfolio/04.jpg"), alt: "Image 4" },
  { src: require("@/assets/portfolio/05.jpg"), alt: "Image 5" },
  { src: require("@/assets/portfolio/06.jpg"), alt: "Image 6" },
  { src: require("@/assets/portfolio/07.jpg"), alt: "Image 7" },
  { src: require("@/assets/portfolio/08.jpg"), alt: "Image 8" },
  { src: require("@/assets/portfolio/09.jpg"), alt: "Image 9" },
  { src: require("@/assets/portfolio/10.jpg"), alt: "Image 10" },
  // Add more images as needed
];

const SinglePortFolioDesignMobile = () => {
  return (
    <div className="mx-[10vw]">
      <div className="rotate-image h-[80vw] bg-yellowBg flex justify-center items-center mt-[4vh] ">
        <div className=" flex flex-col justify-center h-full pl-[18%] pr-[10%]">
          <div className=" text-5xl font-semibold text-textGray mb-3">
            Tata Housing
          </div>
          <div className="mb-3 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            laboriosam repellat unde numquam nemo. Tempore adipisci impedit
          </div>
          <div className="text-sm">
            Sound Interesting? Scroll for more team vibes.
          </div>
        </div>
      </div>

      {images.map((image, index) => (
        <div
          key={index}
          className="h-[80vw] relative w-full rotate-image bg-yellow-400"
        >
          <Image src={image.src} alt={image.alt} layout="fill" />
        </div>
      ))}

      <div className="rotate-image h-[80vw] flex justify-center items-center">
        <div className="panel h-[80vw] my-auto  flex-shrink-0 flex justify-center items-end">
          <div className="h-44 flex flex-col justify-between">
            <div className="w-40">
              402, Makani Center, 35th Linking Road, Bandra(W), 400050.
            </div>
            <div>Leave a message</div>
            <div>
              <div className="flex gap-1">
                <FaTwitter className="bg-gray-900 rounded-full p-1 text-white" />
                <FaFacebook className="bg-gray-900 rounded-full p-1 text-white" />
                <FaInstagram className="bg-gray-900 rounded-full p-1 text-white" />
                <FaLinkedinIn className="bg-gray-900 rounded-full p-1 text-white" />
                <FaBehance className="bg-gray-900 rounded-full p-1 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1  mt-1">
              <LiaCopyright className="h-5 w-5" />
              <div className=" font-semibold">Copyright 2024</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePortFolioDesignMobile;
