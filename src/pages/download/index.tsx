import { ButtonLink } from "@/components/link";
import SectionWrapper from "@/components/section-wrapper";
import { H1, H2, P } from "@/components/text";
import NavFooterLayout from "@/layouts/nav-footer-layout";
import { CodeXml, Download, Package } from "lucide-react";
import Image from "next/image";
import { parseStringPromise } from 'xml2js';
import SVGIMG from "../../../public/ghostty-logo.svg";
import s from "./DownloadPage.module.css";

export async function getStaticProps() {
  // We should move this out to a library function but what we're doing
  // here is using the same appcast we use for Sparkle updates to get the
  // latest version of the app.
  const appcastUrl = 'https://release.files.ghostty.org/appcast.xml';
  const response = await fetch(appcastUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch XML: ${response.statusText}`);
  }

  const xmlContent = await response.text();
  const parsedXml = await parseStringPromise(
    xmlContent,
    { explicitArray: false }
  );

  // Extract items
  const items = parsedXml.rss.channel.item;

  // Convert items to an array if it's not already
  const itemsArray = Array.isArray(items) ? items : [items];

  // Find the item with the highest version
  const latestItem = itemsArray.reduce((maxItem, currentItem) => {
    const currentVersion = parseInt(currentItem['sparkle:version'], 10);
    const maxVersion = parseInt(maxItem['sparkle:version'], 10);
    return currentVersion > maxVersion ? currentItem : maxItem;
  });

  const shortVersionString = latestItem['sparkle:shortVersionString'];

  return {
    props: {
      latestVersion: shortVersionString,
    },
  };
}

interface DownloadPageProps {
  latestVersion: string;
}

export default function DownloadPage({
  latestVersion,
}: DownloadPageProps) {
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
              title="macOS"
              description="A universal binary that works on both Apple Silicon and Intel machines. Requires macOS 13+ (Ventura or later)."
            >
              <ButtonLink
                size="large"
                href={`https://release.files.ghostty.org/${latestVersion}/Ghostty.dmg`}
                text="Universal Binary"
                icon={<Download strokeWidth={2} size={17} />}
                showExternalIcon={false}
              />
            </DownloadCard>
            <DownloadCard
              title="Linux"
              description="Choose a pre-built package for quick setup on your Linux distribution, or build source for complete control."
            >
              <div className={s.linuxLinks}>
                <ButtonLink
                  size="large"
                  href="/docs/install/binary#linux"
                  text="Package Manager"
                  icon={<Package strokeWidth={2} size={18} />}
                  showExternalIcon={false}
                />
                <ButtonLink
                  size="large"
                  href="/docs/install/build"
                  text="Build From Source"
                  icon={<CodeXml strokeWidth={2} size={18} />}
                  showExternalIcon={false}
                />
              </div>
            </DownloadCard>
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
