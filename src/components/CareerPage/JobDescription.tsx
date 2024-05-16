import React from "react";

const JobDescription = () => {
  return (
    <div className="px-[6.5vw] h-full flex justify-between gap-12">
      <div className="pt-[9.5vh] pb-[10vh] text-textGray">
        <div className="text-5xl font-semibold w-[22vw] ">
          Senior Copywriter
        </div>
        <div className="text-2xl mt-10 font-semibold">
          <li>Sub POINT 1</li>
          <li>Sub POINT 2</li>
        </div>
      </div>
      <div className="pt-[9.5vh] pb-[10vh] w-[27vw]">
        <div>
          Since Michael Ferdman founded Firstborn in 1997, we’ve seen the
          digital landscape change dramatically. Our industry has transformed,
          our clients’ businesses and their challenges have become more complex,
          consumer behavior has shifted, and we, as a company, have evolved with
          those changes and should be measured against an individual set of
          objectives for peopple all over
        </div>

        <div>
          <div className="text-textGray mt-8 text-2xl font-semibold">
            Key Duties:
          </div>
          <ul className="flex flex-col gap-2">
            <li>Comfort with multi-tasking and switching between projects</li>
            <li>
              Verbal identity framework development that includes articulation
              and tactical guidance around voice traits, key messaging, and
              brand stewardship
            </li>
            <li>
              Naming development that includes leadership over the entire naming
              process, from generation to shortlisting to finalizing
            </li>
          </ul>
        </div>
      </div>
      <div className="pt-[9.5vh] pb-[10vh] w-[27vw]">
        <div className="text-2xl  font-semibold text-textGray mb-4">
          Good to Have:
        </div>
        <div>
          <ul className="flex flex-col gap-2">
            <li>At least 4+ years video editing experience</li>
            <li>
              Must be well versed in Adobe Premiere (ideally knows - Photoshop
              and basic after effects as well)
            </li>
            <li>
              Experience editing content for Instagram, Twitter, Facebook, and
              YouTube or other online platforms & websites.
            </li>
            <li>
              Good visual communication skills - strong design sense with work
              to demonstrate
            </li>
            <li>Self-motivator, creative thinker & problem solver</li>
            <li>
              {" "}
              Excellent coordination, organization & prioritization skills
            </li>
            <li>Strong communication skills, both verbal & written</li>
          </ul>
        </div>

        <button className="bg-yellowBg border-0 py-1 px-5 ml-6 mt-4 text-lg font-semibold">
          APPLY
        </button>
      </div>
    </div>
  );
};

export default JobDescription;
