import Footer from "@/components/footer";
import { SimpleLink } from "@/components/link";
import Navbar from "@/components/navbar";
import { jetbrainsMono, pretendardVariable } from "@/components/text";
import classNames from "classnames";
import Head from "next/head";
import s from "./RootLayout.module.css";

const navLinks: Array<SimpleLink> = [
  {
    text: "About",
    href: "/",
  },
  {
    text: "Docs",
    href: "/docs",
  },
  {
    text: "Discord",
    href: "https://discord.gg/ghostty",
  },
  {
    text: "Github",
    href: "https://github.com/ghostty-org",
  },
];

export interface PageMeta {
  title: string;
  description: string;
}

export interface RootLayoutProps {
  meta: PageMeta;
  children?: React.ReactNode;
  className?: string;
}

export default function RootLayout({
  meta: { title, description },
  className,
  children,
}: RootLayoutProps) {
  return (
    <div
      className={classNames(
        s.rootLayout,
        pretendardVariable.variable,
        jetbrainsMono.variable,
        className
      )}
    >
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        links={navLinks}
        cta={{
          href: "/downloads",
          text: "Download",
        }}
      />
      {children}
      <Footer links={navLinks} copyright="© Ghostty 2024" />
    </div>
  );
}
