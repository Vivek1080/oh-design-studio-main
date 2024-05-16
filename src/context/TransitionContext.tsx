import gsap from "gsap";
import React, { ReactNode, createContext, useState, useEffect } from "react";

interface TransitionContextProps {
  timeline: gsap.core.Timeline;
  setTimeline: React.Dispatch<React.SetStateAction<gsap.core.Timeline>>;
  previousRoute: string;
  setPreviousRoute: React.Dispatch<React.SetStateAction<string>>;
}

const TransitionContext = createContext<TransitionContextProps>({
  timeline: gsap.timeline({ paused: true }),
  setTimeline: () => {},
  previousRoute: "",
  setPreviousRoute: () => {},
});

const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [timeline, setTimeline] = useState(() => {
    return gsap.timeline({ paused: true });
  });
  const [previousRoute, setPreviousRoute] = useState("");

  return (
    <TransitionContext.Provider
      value={{
        timeline,
        setTimeline,
        previousRoute,
        setPreviousRoute,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export { TransitionContext, TransitionProvider };
