import AnimatedTerminal, { AnimatedTerminalProps } from "@/components/animated-terminal";
import RootLayout from "@/layouts/root-layout";
import {
  loadAllTerminalFiles,
  TerminalsMap,
} from "@/lib/fetch-terminal-content";
import { useLayoutEffect, useState } from "react";
import s from "./Home.module.css";
import Button from "@/components/button";
import { ButtonLink } from "@/components/link";
import SectionWrapper from "@/components/section-wrapper";
import GridContainer from "@/components/grid-container";

export async function getServerSideProps(context: any): Promise<{ props: HomePageProps }> {
  const userAgent = context.req.headers['user-agent'];

  // TODO(pluiedev): This is a really rudimentary test, but it works for now
  // Note that Android is also technically Linux :)
  const isLinux = /Linux/i.test(userAgent);

  return {
    props: {
      terminalData: await loadAllTerminalFiles("/home"),
      platformStyle: isLinux ? 'adwaita' : 'macos'
    },
  };
}

interface HomePageProps {
  terminalData: TerminalsMap;
  platformStyle: AnimatedTerminalProps['platformStyle']
}

function useWindowWidth() {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return width;
}

export default function Home({ terminalData, platformStyle }: HomePageProps) {
  const animationFrames = Object.keys(terminalData)
    .filter((k) => {
      return k.startsWith("home/animation_frames");
    })
    .map((k) => terminalData[k]);

  const windowWidth = useWindowWidth();
  return (
    <RootLayout
      meta={{
        title: "Ghostty",
        description:
          "Fast, native, feature-rich terminal emulator pushing modern features.",
      }}
    >
      <main className={s.homePage}>
        <section className={s.terminalWrapper}>
          <AnimatedTerminal
            title={"👻 Ghostty"}
            fontSize={
              windowWidth > 1100
                ? "small"
                : windowWidth > 674
                ? "tiny"
                : "xtiny"
            }
            whitespacePadding={
              windowWidth > 950 ? 20 : windowWidth > 850 ? 10 : 0
            }
            className={s.animatedTerminal}
            columns={100}
            rows={41}
            frames={animationFrames}
            frameLengthMs={31}
            platformStyle={platformStyle}
          />
        </section>
        <GridContainer className={s.buttonsList}>
          <ButtonLink href="/download" text="Download" size="large" />
          <ButtonLink
            href="/docs"
            text="Documentation"
            size="large"
            theme="neutral"
          />
        </GridContainer>
      </main>
    </RootLayout>
  );
}
