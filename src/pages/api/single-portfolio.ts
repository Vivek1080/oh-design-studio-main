import reader from "@/lib/keystatic";
import { NextApiRequest, NextApiResponse } from "next";

type PortfolioImage = {
  image: string | null;
  width: number;
  height: number;
};

type PortfolioEntry = {
  title: string;
  client_name: string;
  headline1: string;
  headline2: string;
  portfolio_category: ("print" | "digital" | "packaging" | "environmental")[];
  description: string;
  project_bg_image: string;
  portfolio_images: PortfolioImage[];
};

type PortfolioData = {
  slug: string;
  entry: PortfolioEntry;
};

type Portfolios = PortfolioData[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PortfolioEntry | { error: string }>
) {
  try {
    const { slug } = req.body;

    const singlePortfolioData = await reader.collections.portfolios.read(slug);

    if (singlePortfolioData) {
      const filteredSinglePortfolioData: PortfolioEntry | { error: string } = {
        ...singlePortfolioData,
        portfolio_images: singlePortfolioData.portfolio_images.filter(
          (image) => image !== null
        ),
        portfolio_category: singlePortfolioData.portfolio_category.slice(), // Convert to mutable array
      };

      res.status(200).json(filteredSinglePortfolioData);
    } else {
      res.status(404).json({ error: "Portfolio not found" });
    }
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
