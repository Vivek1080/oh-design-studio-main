import ApplicationFormPage from "@/components/CareerPage/ApplicationFormPage";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const ApplicationForm = () => {
  return (
    <>
      <ApplicationFormPage />
      <Toaster className="bg-black" />
    </>
  );
};

export default ApplicationForm;
