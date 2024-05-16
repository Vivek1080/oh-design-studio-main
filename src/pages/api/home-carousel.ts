// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import reader from "@/lib/keystatic";
import type { NextApiRequest, NextApiResponse } from "next";

type CarouselItem = {
  slug: string;
  entry: {
    title: string;
    client_name: string;
    headline1: string;
    headline2: string;
    project_link: string;
    project_image: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CarouselItem[] | { error: string }>
) {
  try {
    const carouselData = await reader.collections.home_carousel.all();

    res.status(200).json(carouselData);
  } catch (error) {
    console.error("Error fetching carousel data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
