"use client";

import Image from "next/image";
import React, { ChangeEvent, FormEvent, useState } from "react";

import { FaBehance, FaFacebook } from "react-icons/fa";
import linkBtn from "@/assets/images/linkBtn.png";

import { FaTwitter } from "react-icons/fa";

import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { toast } from "sonner";

const ContactPage = () => {
  const [formData, setFormData] = useState<{
    fullName: string;
    email: string;
    phone: string;
    message: string;
  }>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validatePhoneNumber = (phone: string): boolean => {
    // Regular expression to match a valid Indian phone number
    const phoneRegex = /^\+?[91]?[789]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Disable the submit button during submission
    setIsSubmitting(true);

    // Validate phone number
    if (!validatePhoneNumber(formData.phone)) {
      toast("Please enter a valid 10 Digit phone number");
      setIsSubmitting(false); // Re-enable the submit button
      return;
    }

    try {
      // Send the form data to the backend
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Reset the form and enable the submit button after successful submission
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsSubmitting(false);
      toast("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      toast("Failed to submit form. Please try again later.");
    }
  };

  // Check if all fields are filled
  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  return (
    <div className="px-[6.5vw] h-full">
      <div className="pt-[9.5vh] pb-[10vh] grid-cols-12 grid">
        <div className="col-span-4 pr-10">
          <div className="text-6xl font-semibold text-textGray">Lets talk</div>
          <p>
            We are always happy to make valuable new contacts and are looking
            forward to receiving your mail or call. Even if youre not sure well
            be the right ones for your project. Were always open to a chat and
            will be happy to help - of course also in person, wherever you are.
          </p>
        </div>
        <div className="col-span-4 ">
          <form className="flex flex-col gap-4 pl-10" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="flex py-2">
                Full name
              </label>
              <input
                className="w-full p-1"
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="flex py-2">
                Email
              </label>
              <input
                className="w-full p-1"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="flex py-2">
                Phone
              </label>
              <input
                className="w-full p-1"
                type="tel" // Changed type to "tel" for better mobile support
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="flex py-2">
                Message
              </label>
              <textarea
                className="w-full p-1 h-14"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className={`bg-yellowBg border-0 py-2 w-fit  px-5 mt-4 font-semibold ${
                !isFormValid || isSubmitting
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              disabled={!isFormValid || isSubmitting} // Disable button if form is invalid or submitting
            >
              {isSubmitting ? "SENDING..." : "SEND"}
            </button>
          </form>
        </div>
        <div className="col-span-4 flex gap-6 flex-col pl-20">
          <div>
            <div className="text-xl font-semibold">Address:</div>
            <div className="text-xl w-52">
              402, Makani Center, 35th Linking Road, Bandra(W), 400050.
            </div>
          </div>
          <div>
            <div className="text-xl font-semibold">Phone:</div>
            <div className="text-xl ">+91 2661 6280</div>
          </div>
          <div>
            <div className="text-xl font-semibold">Email:</div>
            <div className="flex items-center gap-4">
              <div className="text-xl ">letstalk@ohdesignstudio.com</div>
              <Image src={linkBtn} width={17} height={17} alt="link" />
            </div>
          </div>
          <div>
            <div className="text-xl font-semibold">Find Us:</div>
            <div className="text-xl ">(^) Google Map</div>
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
      </div>
    </div>
  );
};

export default ContactPage;
