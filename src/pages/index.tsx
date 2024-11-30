import InfoCardsSection from "@/components/info-cards-section";
import SectionWrapper from "@/components/section-wrapper";
import AnimatedTerminalPOC from "@/components/terminal-animated-poc";
import RootLayout from "@/layouts/root-layout";
import {
  AppWindow,
  Cpu,
  FileCheck,
  Files,
  MessageSquareWarning,
  SquareTerminal,
} from "lucide-react";
import s from "./Home.module.css";
import TabbedTerminalsSection from "@/components/tabbed-terminals-section";

export default function Home() {
  return (
    <RootLayout
      meta={{
        title: "Ghostty",
        description:
          "Fast, native, feature-rich terminal emulator pushing modern features.",
      }}
    >
      <main className={s.homePage}>
        <SectionWrapper>
          <AnimatedTerminalPOC className={s.terminal} />
        </SectionWrapper>

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
              lines: [
                "Last login: Fri Nov 22 20:31:52 on ttys005",
                'brandon@Brandons-Mac-Studio $ cowsay "Hello Tab One"',
                " ",
                "  _____________",
                "< Hello Tab One >",
                "  -------------",
                "         \\  ^__^",
                "          \\ (oo)_________",
                "            (__)\\        )/\\/",
                "                ||----w-|",
                "                ||     ||",
              ],
            },
            {
              title: "Modern, Opt-In Features",
              description:
                "Built to enable CLI tool developers to create more feature rich, interactive applications.",
              lines: [
                "Last login: Fri Nov 22 20:31:52 on ttys005",
                'brandon@Brandons-Mac-Studio $ cowsay "Hello Tab Two"',
                " ",
                "  _____________",
                "< Hello Tab Two >",
                "  -------------",
                "         \\  ^__^",
                "          \\ (oo)_________",
                "            (__)\\        )/\\/",
                "                ||----w-|",
                "                ||     ||",
              ],
            },
            {
              title: "Experimental Platform",
              description:
                "Built to enable CLI tool developers to create more feature rich, interactive applications.",
              lines: [
                "Last login: Fri Nov 22 20:31:52 on ttys005",
                'brandon@Brandons-Mac-Studio $ cowsay "Hello Tab Three"',
                " ",
                "  _______________",
                "< Hello Tab Three >",
                "  ---------------",
                "         \\  ^__^",
                "          \\ (oo)_________",
                "            (__)\\        )/\\/",
                "                ||----w-|",
                "                ||     ||",
              ],
            },
          ]}
        />
      </main>
    </RootLayout>
  );
}
