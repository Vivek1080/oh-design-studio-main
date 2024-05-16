import Nav from "@/components/LandingPage/Nav";
import Transition from "@/components/Transition/Transition";
import { TransitionProvider } from "@/context/TransitionContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <TransitionProvider>
      <Transition>
        <Component key={router.route} {...pageProps} />
      </Transition>
    </TransitionProvider>
  );
}
