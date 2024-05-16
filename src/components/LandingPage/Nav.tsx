import React from "react";

import logo from "@/assets/images/Logo .png";
import Menu from "@/assets/images/Menu Bar.png";

import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  return (
    <div className="relative">
      <Link scroll={false} href="/">
        <Image
          className="fixed top-[8.3vh] left-[6.3vw] cursor-pointer z-50"
          src={logo}
          alt="Logo"
        />
      </Link>

      <Link scroll={false} href="/menu">
        <Image
          className="fixed top-[8.3vh] right-[6.3vw] cursor-pointer z-50"
          src={Menu}
          alt="Menu"
        />
      </Link>
    </div>
  );
};

export default Nav;
