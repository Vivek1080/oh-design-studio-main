import Nav from "@/components/LandingPage/Nav";
import SinglePortFolioDesignMobile from "@/components/MobileView/SinglePortFolioDesignMobile";
import SinglePortFolioDesign from "@/components/PortfolioPage/SinglePortFolioDesign";
import React from "react";

import { GetStaticPropsContext } from "next";

interface MyContext extends GetStaticPropsContext {
  params: {
    slug: string;
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
  data: PortfolioEntry;
}

const SinglePortfolio: React.FC<WorkProps> = (props) => {
  const { data } = props;

  return (
    <>
      <div className="hidden sm:block">
        <Nav />
        <SinglePortFolioDesign data={data} />
      </div>
      <div className="sm:hidden">
        <SinglePortFolioDesignMobile />
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const id = "all";

  const apiUrl = process.env.PROD_API_URL || "http://localhost:3000";

  const response = await fetch(`${apiUrl}/api/portfolio`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug: id }),
  });

  const data = await response.json();

  const allPortfolioSlug = data.map((d: PortfolioData) => d.slug);

  console.log(allPortfolioSlug);

  return {
    paths: allPortfolioSlug.map((slug: string) => ({ params: { slug: slug } })),
    fallback: false,
  };
};

export const getStaticProps = async (context: MyContext) => {
  const id = context.params.slug;

  const apiUrl = process.env.PROD_API_URL || "http://localhost:3000";

  const response = await fetch(`${apiUrl}/api/single-portfolio`, {
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

export default SinglePortfolio;
