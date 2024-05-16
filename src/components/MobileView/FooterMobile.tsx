import React from "react";
import linkBtn from "@/assets/images/linkBtn.png";
import Image from "next/image";

import { LiaCopyright } from "react-icons/lia";

import {
  FaBehance,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const FooterMobile = () => {
  return (
    <div className="h-screen bg-yellowBg">
      <div className="pt-[17vh] pb-[5vh] h-[65vh] px-[4.5vw] flex flex-col justify-between ">
        <div>
          <div className="text-lg font-semibold">Address:</div>
          <div className="text-lg w-52">
            402, Makani Center, 35th Linking Road, Bandra(W), 400050.
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold">Phone:</div>
          <div className="text-lg">+91 2661 6280</div>
        </div>
        <div>
          <div className="text-lg font-semibold">Inquiries:</div>
          <div className="flex items-center gap-4">
            <div className="text-lg">Lets talk</div>
            <Image src={linkBtn} width={17} height={17} alt="link" />
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold">Careers:</div>
          <div className="flex items-center gap-4">
            <div className="text-lg">View openings</div>
            <Image src={linkBtn} width={17} height={17} alt="link" />
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold">Follow:</div>
          <div className="flex gap-1">
            <FaTwitter className="bg-gray-900 rounded-full p-1 text-white" />
            <FaFacebook className="bg-gray-900 rounded-full p-1 text-white" />
            <FaInstagram className="bg-gray-900 rounded-full p-1 text-white" />
            <FaLinkedinIn className="bg-gray-900 rounded-full p-1 text-white" />
            <FaBehance className="bg-gray-900 rounded-full p-1 text-white" />
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold">Find Us:</div>
          <div className="text-lg">(^) Google Map</div>
        </div>

        {/* Copyright  */}
        <div>
          <div className="flex items-center gap-1">
            <LiaCopyright className="h-5 w-5" />
            <div className="text-lg font-semibold">Copyright 2024</div>
          </div>
          <div className="text-lg">All Rights Reserved</div>
        </div>
      </div>
    </div>
  );
};

export default FooterMobile;
