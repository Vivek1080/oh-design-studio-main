"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";

interface FormData {
  resume: File | string;
  fullName: string;
  email: string;
  phone: string;
  currentCompany?: string;
  portfolioURL?: string;
  linkedin?: string;
  otherWebsite?: string;
  additionalInfo?: string;
}

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    resume: "",
    fullName: "",
    email: "",
    phone: "",
    currentCompany: "",
    portfolioURL: "",
    linkedin: "",
    otherWebsite: "",
    additionalInfo: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let newValue: string | File | undefined = value;

    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      const fileList = fileInput.files;
      newValue = fileList ? fileList[0] : undefined;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const validatePhoneNumber = (phone: string): boolean => {
    // Regular expression to match a valid Indian phone number
    const phoneRegex = /^\+?[91]?[6789]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate phone number
    if (!validatePhoneNumber(formData.phone)) {
      toast("Please enter a valid 10 Digit phone number");
      setIsSubmitting(false); // Re-enable the submit button
      return;
    }

    try {
      // Disable the submit button during submission
      setIsSubmitting(true);

      // Create FormData object
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          formDataToSend.append(key, value);
        } else {
          formDataToSend.append(key, JSON.stringify(value));
        }
      });

      // Send the form data to the backend
      const response = await fetch("/api/application-form", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Reset the form and enable the submit button after successful submission
      setIsSubmitting(false);
      toast("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      toast("Failed to submit form. Please try again later.");
    }
  };

  const isFormValid = (): boolean => {
    // Check if all required fields are filled
    return (
      formData.resume !== "" &&
      formData.fullName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== ""
    );
  };

  return (
    <div className="px-[6.5vw] h-full relative">
      <div className="absolute top-[6vh] font-semibold">
        SUBMIT YOUR APPLICATION
      </div>
      <form
        onSubmit={handleSubmit}
        className="pt-[9.5vh] pb-[10vh] grid grid-cols-2"
      >
        <div className="grid grid-cols-12 mt-4">
          <div className="col-span-4 space-y-10">
            <div>Resume/CV*</div>
            <div className="py-1">Full name*</div>
            <div className="py-1">Email*</div>
            <div className="py-1">Phone*</div>
            <div className="py-1">Current Company</div>
          </div>
          <div className="col-span-8 space-y-10">
            <input
              className="flex"
              type="file"
              name="resume"
              onChange={handleChange}
              required
            />
            <input
              className="flex p-1 w-[70%]"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              className="flex p-1 w-[70%]"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className="flex p-1 w-[70%]"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              className="flex p-1 w-[70%]"
              type="text"
              name="currentCompany"
              value={formData.currentCompany}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-lg font-semibold">LINKS</div>
          <div className="grid grid-cols-12 mt-9">
            <div className="col-span-4 space-y-10">
              <div>Portfolio URL</div>
              <div className="py-1">Linkedin</div>
              <div className="py-1">Other Website</div>
            </div>
            <div className="col-span-8 space-y-10">
              <input
                className="flex p-1 w-[70%]"
                type="text"
                name="portfolioURL"
                value={formData.portfolioURL}
                onChange={handleChange}
              />
              <input
                className="flex p-1 w-[70%]"
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
              />
              <input
                className="flex p-1 w-[70%]"
                type="text"
                name="otherWebsite"
                value={formData.otherWebsite}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-12 font-semibold">ADDITIONAL INFORMATION</div>
          <textarea
            className="mt-4 w-[81%] h-20"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
          />
          <button
            type="submit"
            className={`bg-yellowBg border-0 py-2 w-fit  px-5 mt-4 font-semibold ${
              !isFormValid || isSubmitting
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            disabled={!isFormValid || isSubmitting} // Disable button if form is invalid or submitting
          >
            {isSubmitting ? "SUBMITTING..." : "SUBMIT APPLICATION"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
