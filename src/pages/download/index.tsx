import SectionWrapper from "@/components/section-wrapper";
import { H1, H2, P } from "@/components/text";
import NavFooterLayout from "@/layouts/nav-footer-layout";
import s from "./DownloadPage.module.css";
import Image from "next/image";
import SVGIMG from "../../../public/ghostty-logo.svg";
import { ButtonLink } from "@/components/link";
import { Download } from "lucide-react";
import Button from "@/components/button";

export default function DownloadPage() {
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
          <div className={s.header}>
            <Image src={SVGIMG} alt={""} />
            <H1 className={s.pageTitle}>Download Ghostty</H1>
          </div>
          <div className={s.downloadCards}>
            <DownloadCard
              title="MacOS"
              description="A universal binary that works on both Apple Silicon and Intel machines."
            >
              <ButtonLink
                size="large"
                href="https://github.com/ghostty-org/ghostty/releases/download/tip/ghostty-macos-universal.zip"
                text="Universal Binary"
                icon={<Download strokeWidth={2} size={16} />}
                showExternalIcon={false}
              />
            </DownloadCard>
            <DownloadCard
              title="Linux"
              description="Choose a pre-built package for quick setup on your Linux distribution, or build source for complete control."
            />
          </div>
        </SectionWrapper>
      </main>
    </NavFooterLayout>
  );
}

interface DownloadCardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

function DownloadCard({ title, description, children }: DownloadCardProps) {
  return (
    <div className={s.downloadCard}>
      <H2 className={s.title}>{title}</H2>
      <P className={s.description}>{description}</P>
      <div className={s.buttons}>{children}</div>
    </div>
  );
}
