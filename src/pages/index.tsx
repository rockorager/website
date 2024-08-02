import Button from "@/components/button";
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
        <div className={s.centerWrapper}>
          <h1>Ghostty</h1>
          <p>
            Ghostty is a cross-platform, GPU-accelerated terminal emulator that
            aims to push the boundaries of what is possible with a terminal
            emulator by exposing modern, opt-in features that enable CLI tool
            developers to build more feature rich, interactive applications.
          </p>
          <div className={s.buttonList}>
            <Button className={s.getStarted} theme="brand" size="large">
              Get started
            </Button>
            <Button className={s.getStarted} size="large">
              Learn more
            </Button>
          </div>
        </div>
      </main>
    </RootLayout>
  );
}
