import classNames from "classnames";
import { Nunito, Outfit } from "next/font/google";
import Head from "next/head";
import s from "./RootLayout.module.css";

const displayFont = Outfit({
  subsets: ["latin"],
  display: "auto",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
});

const bodyFont = Nunito({
  subsets: ["latin"],
  display: "auto",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

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
        displayFont.variable,
        bodyFont.variable,
        className
      )}
    >
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header></header>
      {children}
      <footer></footer>
    </div>
  );
}
