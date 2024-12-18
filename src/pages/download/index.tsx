import SectionWrapper from "@/components/section-wrapper";
import { H1 } from "@/components/text";
import NavFooterLayout from "@/layouts/nav-footer-layout";
import s from "./DownloadPage.module.css";

export default function Download() {
  return (
    <NavFooterLayout
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
    </NavFooterLayout>
  );
}
