import s from "./NavFooterLayout.module.css";
import { SimpleLink } from "@/components/link";
import Navbar from "@/components/navbar";
import RootLayout, { RootLayoutProps } from "../root-layout";
import Footer from "@/components/footer";
import { NavTreeNode } from "@/components/nav-tree";
import { useState } from "react";
import classNames from "classnames";

const navLinks: Array<SimpleLink> = [
  {
    text: "Docs",
    href: "/docs",
  },
  {
    text: "Discord",
    href: "https://discord.gg/ghostty",
  },
  {
    text: "GitHub",
    href: "https://github.com/ghostty-org/ghostty",
  },
];

type NavFooterLayoutProps = RootLayoutProps & {
  docsNavTree: NavTreeNode[];
};

export default function NavFooterLayout(props: NavFooterLayoutProps) {
  const { children, docsNavTree, className, ...otherProps } = props;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <RootLayout
      className={classNames(s.navFooterLayout, className)}
      {...otherProps}
    >
      <Navbar
        onMobileMenuOpen={(opened) => setMobileMenuOpen(opened)}
        links={navLinks}
        docsNavTree={docsNavTree}
        cta={{
          href: "/download",
          text: "Download",
        }}
      />
      <div
        className={classNames({
          [s.displayNone]: mobileMenuOpen,
        })}
      >
        {children}
      </div>

      <Footer
        links={[
          ...navLinks,
          {
            text: "Download",
            href: "/download",
          },
        ]}
        copyright="© 2024 Mitchell Hashimoto"
      />
    </RootLayout>
  );
}
