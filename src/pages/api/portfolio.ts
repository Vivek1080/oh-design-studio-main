import reader, { portfolioType } from "@/lib/keystatic";
import type { NextApiRequest, NextApiResponse } from "next";

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
  portfolio_category: ReadonlyArray<
    "print" | "digital" | "packaging" | "environmental"
  >;
  description: string;
  project_bg_image: string;
  portfolio_images: ReadonlyArray<PortfolioImage>;
};

type PortfolioData = {
  slug: string;
  entry: PortfolioEntry;
};

type Portfolios = ReadonlyArray<PortfolioData>;

// Update the handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Portfolios | { error: string }>
) {
  try {
    const { slug } = req.body;

    console.log(slug);

    const portfolioData = await reader.collections.portfolios.all();

    const filteredPortfolioData: Portfolios = portfolioData.filter((item) => {
      if (
        slug === "print" ||
        slug === "digital" ||
        slug === "packaging" ||
        slug === "environmental"
      ) {
        return item.entry.portfolio_category.includes(slug);
      } else if (slug === "all") {
        return true; // Return full data if slug is not one of the specified values
      }
    });

    res.status(200).json(filteredPortfolioData);
  } catch (error) {
    console.error("Error fetching carousel data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
