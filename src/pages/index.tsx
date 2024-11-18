import SectionWrapper from "@/components/section-wrapper";
import RootLayout from "@/layouts/root-layout";
import s from "./Home.module.css";

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
          <h2>
            Ghostty is a cross-platform, GPU-accelerated terminal emulator
            designed to eerily-enhance and expand CLI capabilities.
          </h2>
        </SectionWrapper>
      </main>
    </RootLayout>
  );
}
