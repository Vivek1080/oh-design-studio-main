"use client";

import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TransitionContext } from "@/context/TransitionContext";

gsap.registerPlugin(useGSAP);

const Transition = ({ children }: { children: ReactNode }) => {
  const [displayChildren, setDisplayChildren] = useState(children);

  const { timeline } = useContext(TransitionContext);

  useGSAP(() => {
    if (
      (children as React.ReactElement).key !==
      (displayChildren as React.ReactElement).key
    ) {
      timeline.play().then(() => {
        window.scrollTo(0, 0);
        setDisplayChildren(children);
        timeline.pause().clear();
      });
    }
  }, [children]);

  return <div>{displayChildren}</div>;
};

export default Transition;
