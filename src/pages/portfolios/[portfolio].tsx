import Portfolio from "@/components/PortfolioPage/Portfolio";
import PortfolioNav from "@/components/PortfolioPage/PortfolioNav";
import React from "react";

import { GetStaticPropsContext } from "next";

interface MyContext extends GetStaticPropsContext {
  params: {
    portfolio: string;
  };
  locales?: string[];
  locale?: string;
  defaultLocale?: string;
}

interface PortfolioImage {
  image: string | null;
  width: number;
  height: number;
}

interface PortfolioEntry {
  title: string;
  client_name: string;
  headline1: string;
  headline2: string;
  portfolio_category: ("print" | "digital" | "packaging" | "environmental")[];
  description: string;
  project_bg_image: string;
  portfolio_images: PortfolioImage[];
}

interface PortfolioData {
  slug: string;
  entry: PortfolioEntry;
}

interface WorkProps {
  data: PortfolioData[];
}

const Work: React.FC<WorkProps> = ({ data }) => {
  return (
    <>
      <PortfolioNav />
      <Portfolio data={data} />
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { portfolio: "all" } },
      { params: { portfolio: "print" } },
      { params: { portfolio: "digital" } },
      { params: { portfolio: "packaging" } },
      { params: { portfolio: "environmental" } },
    ],
    fallback: false,
  };
};

export const getStaticProps = async (context: MyContext) => {
  const id = context.params.portfolio;

  const apiUrl = process.env.PROD_API_URL || "http://localhost:3000";

  const response = await fetch(`${apiUrl}/api/portfolio`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug: id }),
  });

  const data = await response.json();

  return {
    props: {
      data,
    },
  };
};

export default Work;
