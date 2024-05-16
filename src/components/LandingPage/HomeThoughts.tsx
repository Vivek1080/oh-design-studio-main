import React from "react";

import CarouselBlog from "../MoreComponents/CarouselBlog";

const HomeThoughts = () => {
  return (
    <div className="px-[6.5vw] h-full flex overflow-hidden cursor-default relative ">
      <div className="pt-[9.5vh] pb-[6.5vh] flex justify-between flex-col ">
        <div className="text-textGray text-6xl font-semibold">Thoughts</div>

        <CarouselBlog />
      </div>
    </div>
  );
};
export default HomeThoughts;
