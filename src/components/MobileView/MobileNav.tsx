import React from "react";

import logo from "@/assets/images/Logo .png";
import Menu from "@/assets/images/Menu Bar.png";

import Image from "next/image";
import Link from "next/link";
import { IoMdMenu } from "react-icons/io";

const MobileNav = () => {
  return (
    <div className="relative">
      <Link scroll={false} href="/menu">
        {/* <Image
          className="fixed top-[8.3vh] right-[6.3vw] cursor-pointer z-50"
          src={Menu}
          alt="Menu"
        /> */}
        <IoMdMenu className="fixed top-[5vh] right-[4.5vw] h-5 w-5 cursor-pointer z-50 text-black" />
      </Link>
    </div>
  );
};

export default MobileNav;
