import AnimatedTerminal from "@/components/animated-terminal";
import InfoCardsSection from "@/components/info-cards-section";
import TabbedTerminalsSection from "@/components/tabbed-terminals-section";
import TerminalCardsSection from "@/components/terminal-cards-section";
import RootLayout from "@/layouts/root-layout";
import {
  loadAllTerminalFiles,
  TerminalsMap,
} from "@/lib/fetch-terminal-content";
import {
  AppWindow,
  Cpu,
  FileCheck,
  Files,
  MessageSquareWarning,
  SquareTerminal,
} from "lucide-react";
import { useLayoutEffect, useState } from "react";
import s from "./Home.module.css";

export async function getStaticProps() {
  return {
    props: {
      terminalData: await loadAllTerminalFiles("/home"),
    },
  };
}
interface HomePageProps {
  terminalData: TerminalsMap;
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

export default function Home({ terminalData }: HomePageProps) {
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
            title={"Ghostty"}
            fontSize={
              windowWidth > 1300
                ? "medium"
                : windowWidth > 1100
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
          />
        </section>

        <InfoCardsSection
          title="Ghostty is a cross-platform, GPU-accelerated terminal emulator designed to eerily-enhance and expand CLI capabilities."
          infoCards={[
            {
              title: "GPU-Accelerated",
              description:
                "Faster performance and improved responsiveness through the use of GPU power.",
              icon: <Cpu size={28} strokeWidth={1} />,
            },
            {
              title: "Terminfo",
              description:
                "Ghostty ships with its own terminfo entry to tell software about its capabilities.",
              icon: <SquareTerminal size={28} strokeWidth={1} />,
            },
            {
              title: "Drop-in Replacement",
              description:
                "Faster performance and improved responsiveness through the use of GPU power.",
              icon: <Files size={28} strokeWidth={1} />,
            },
            {
              title: "Standards Compliant",
              description:
                "Fully standards compliant with all existing shells and terminal software for seamless integration.",
              icon: <FileCheck size={28} strokeWidth={1} />,
            },
            {
              title: "Crash Reports",
              description:
                "Built-in crash reporter that automatically generates and saves crash reports to disk.",
              icon: <MessageSquareWarning size={28} strokeWidth={1} />,
            },
            {
              title: "Richer Windowing",
              description:
                "Multi-window, tabbing, and pane support for seamless session organization and switching.",
              icon: <AppWindow size={28} strokeWidth={1} />,
            },
          ]}
        />

        <TabbedTerminalsSection
          title="Built to spook the boundaries of terminal emulation."
          terminalTabs={[
            {
              title: "Configuration",
              description:
                "Built to enable CLI tool developers to create more feature rich, interactive applications.",
              lines: terminalData["home/tabbed-terminals/configuration"],
            },
            {
              title: "Modern, Opt-In Features",
              description:
                "Built to enable CLI tool developers to create more feature rich, interactive applications.",
              lines: terminalData["home/tabbed-terminals/opt-in-features"],
            },
            {
              title: "Experimental Platform",
              description:
                "Built to enable CLI tool developers to create more feature rich, interactive applications.",
              lines:
                terminalData["home/tabbed-terminals/experimental-platform"],
            },
          ]}
        />

        <TerminalCardsSection
          title="Create richer, more interactive CLI applications. Wicked."
          description="Modern, opt-in features offer CLI developers new ways to build richer, more interactive applications, all while ensuring full compatibility with existing shells and software."
          cards={[
            {
              title: "Configuration",
              description:
                "Personalize your terminal experience with customized configurations, or select from over 300+ built-in themes.",
              terminal: {
                title: "~",
                lines: terminalData["home/terminal-cards/1"],
              },
            },
            {
              title: "Modern, Opt-In Features",
              description:
                "Built to enable CLI tool developers to create more feature rich, interactive applications.",
              terminal: {
                title: "~",
                lines: terminalData["home/terminal-cards/2"],
              },
            },
            {
              title: "Experimental Platform",
              description:
                "Built as a platform to experiment with modern, non-standard features, enhancing CLI application capabilities.",
              terminal: {
                title: "~",
                lines: terminalData["home/terminal-cards/3"],
              },
            },
          ]}
        />
      </main>
    </RootLayout>
  );
}
