import React from "react";

import logo from "@/assets/images/Logo .png";
import Menu from "@/assets/images/Menu Bar.png";
import { FiSearch } from "react-icons/fi";

import Image from "next/image";
import Link from "next/link";

const PortfolioNav = () => {
  return (
    <div className="relative">
      <Link scroll={false} href="/">
        <Image
          className="fixed top-[8.3vh] left-[6.3vw] cursor-pointer z-50"
          src={logo}
          alt="Logo"
        />
      </Link>

      {/* <Image
          className="fixed top-[8.3vh] left-[6.3vw] cursor-pointer z-50"
          src={logo}
          alt="Logo"
        /> */}

      <div className="fixed top-[8.3vh] right-[6.3vw] cursor-pointer z-50 flex items-center gap-5">
        <Link scroll={false} href="/filter" className="no-underline">
          <div className="flex items-center gap-1 text-black ">
            <FiSearch />
            <div>Filter</div>
          </div>
        </Link>

        <Link scroll={false} href="/menu">
          <Image src={Menu} alt="Menu" />
        </Link>
      </div>
    </div>
  );
};

export default PortfolioNav;
