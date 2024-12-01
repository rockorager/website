import RootLayout from "@/layouts/root-layout";
import s from "./DownloadPage.module.css";
import { H1 } from "@/components/text";
import SectionWrapper from "@/components/section-wrapper";

export default function Download() {
  return (
    <RootLayout
      meta={{
        title: "Ghostty",
        description:
          "Fast, native, feature-rich terminal emulator pushing modern features.",
      }}
    >
      <main className={s.downloadPage}>
        <SectionWrapper>
          {" "}
          <H1>Download Page TODO</H1>
        </SectionWrapper>
      </main>
    </RootLayout>
  );
}
