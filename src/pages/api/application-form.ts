// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { transporter, mailOptions } from "@/config/nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";
const multer = require("multer");
const fs = require("fs");

type FormData = {
  resume: File | string;
  fullName: string;
  email: string;
  phone: string;
  currentCompany?: string;
  portfolioURL?: string;
  linkedin?: string;
  otherWebsite?: string;
  additionalInfo?: string;
};

interface CustomNextApiRequest extends NextApiRequest {
  file: Express.Multer.File; // Assuming Express typings for Multer
}

// Multer configuration
const upload = multer({ dest: "public/uploads/" }); // Define upload directory

export default async function handler(
  req: CustomNextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    try {
      // Parse form data using multer
      upload.single("resume")(req, res, async (err: any) => {
        if (err instanceof multer.MulterError) {
          return res.status(500).json({ error: "File upload error" });
        } else if (err) {
          return res.status(500).json({ error: "Unknown error" });
        }

        // Access form data
        const formData: FormData = req.body;
        const resumeFile = req.file;

        const { originalname, path } = resumeFile;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newPath = path + "." + ext;
        fs.renameSync(path, newPath);

        // Process form data as needed
        console.log("Form data:", formData);
        console.log("Resume file:", resumeFile);

        try {
          const htmlContent = `
            <p><strong>Name:</strong> ${formData.fullName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            ${
              formData.currentCompany
                ? `<p><strong>Current Company:</strong> ${formData.currentCompany}</p>`
                : ""
            }
            ${
              formData.portfolioURL
                ? `<p><strong>Portfolio URL:</strong> ${formData.portfolioURL}</p>`
                : ""
            }
            ${
              formData.linkedin
                ? `<p><strong>LinkedIn:</strong> ${formData.linkedin}</p>`
                : ""
            }
            ${
              formData.otherWebsite
                ? `<p><strong>Other Website:</strong> ${formData.otherWebsite}</p>`
                : ""
            }
            ${
              formData.additionalInfo
                ? `<p><strong>Additional Info:</strong> ${formData.additionalInfo}</p>`
                : ""
            }
          `;

          await transporter.sendMail({
            ...mailOptions,
            subject: `${formData.fullName} has submitted an application`,
            html: htmlContent,
            attachments: [
              {
                filename: originalname,
                path: newPath,
              },
            ],
          });

          fs.unlinkSync(newPath);

          res.status(200).json({ message: "Form data received successfully" });
        } catch (error) {
          console.error(error);
          res.status(400).json({ message: "Error while sending mail" });
        }
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // Method Not Allowed
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable default body parser
  },
};
