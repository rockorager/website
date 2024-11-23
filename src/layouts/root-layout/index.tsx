import { H4, pretendardVariable, jetbrainsMono } from "@/components/text";
import classNames from "classnames";
import Head from "next/head";
import s from "./RootLayout.module.css";

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
      <header>
        <H4>Header</H4>
      </header>
      {children}
      <footer>
        <H4>Footer</H4>
      </footer>
    </div>
  );
}
