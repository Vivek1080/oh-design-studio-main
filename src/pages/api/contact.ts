import { transporter, mailOptions } from "@/config/nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

type ContactFormData = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    // Extract the form data from the request body
    const formData: ContactFormData = req.body;

    // Log the form data
    console.log("Received form data:", formData);

    try {
      await transporter.sendMail({
        ...mailOptions,
        subject: `${formData.fullName} has submitted a contact form`,
        html: `
            <p><strong>Name:</strong> ${formData.fullName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Message:</strong> ${formData.message}</p>
          `,
      });
      res.status(200).json({ message: "Form data received successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "error while sending mail" });
    }

    // Respond with a success message
  } else {
    // Respond with a method not allowed error if the request method is not POST
    res.status(405).json({ message: "Method not allowed" });
  }
}
