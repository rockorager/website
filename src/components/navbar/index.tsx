import classNames from "classnames";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import GridContainer, { NavAndFooterGridConfig } from "../grid-container";
import Link, { ButtonLink, SimpleLink } from "../link";
import GhosttyWordmark from "./ghostty-wordmark.svg";
import s from "./Navbar.module.css";
import { P } from "../text";

export interface NavbarProps {
  className?: string;
  links?: SimpleLink[];
  cta?: SimpleLink;
}

const MOBILE_MENU_BREAKPOINT = 768;

export default function Navbar({ className, links, cta }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useLayoutEffect(() => {
    function handleSizeUpdated() {
      if (window.innerWidth > MOBILE_MENU_BREAKPOINT && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleSizeUpdated);
    return () => window.removeEventListener("resize", handleSizeUpdated);
  }, [mobileMenuOpen]);

  return (
    <nav className={classNames(s.navbar, className)}>
      <GridContainer
        className={s.gridContainer}
        gridConfig={NavAndFooterGridConfig}
      >
        <NextLink href="/">
          <Image src={GhosttyWordmark} alt="Ghostty" />
        </NextLink>
        <div className={s.desktopLinks}>
          {links && (
            <ul className={s.linkList}>
              {links.map((link) => {
                return (
                  <li key={link.text}>
                    <Link
                      className={classNames({
                        [s.active]: pathname == link.href,
                      })}
                      {...link}
                    />
                  </li>
                );
              })}
            </ul>
          )}
          {cta && (
            <ButtonLink
              className={s.cta}
              size="large"
              theme="brand"
              href={cta.href}
              text={cta.text}
            />
          )}
        </div>
        <div
          className={s.menuToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </div>
      </GridContainer>
      <div
        className={classNames(s.mobileContent, {
          [s.mobileMenuOpen]: mobileMenuOpen,
        })}
      >
        <P>TODO Mobile Menu</P>
      </div>
    </nav>
  );
}
