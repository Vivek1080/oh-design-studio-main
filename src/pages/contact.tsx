import MainContact from "@/components/ContactPage/MainContact";
import Nav from "@/components/LandingPage/Nav";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const contact = () => {
  return (
    <>
      <Nav />
      <MainContact />
      <Toaster className="bg-gray-700" />
    </>
  );
};

export default contact;
