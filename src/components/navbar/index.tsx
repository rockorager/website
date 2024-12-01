import classNames from "classnames";
import { Menu } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import GridContainer, { NavAndFooterGridConfig } from "../grid-container";
import Link, { ButtonLink, SimpleLink } from "../link";
import GhosttyWordmark from "./ghostty-wordmark.svg";
import s from "./Navbar.module.css";

export interface NavbarProps {
  className?: string;
  links?: SimpleLink[];
  cta?: SimpleLink;
}

export default function Navbar({ className, links, cta }: NavbarProps) {
  const pathname = usePathname();
  return (
    <nav className={classNames(s.navbar, className)}>
      <GridContainer
        className={s.gridContainer}
        gridConfig={NavAndFooterGridConfig}
      >
        <Image src={GhosttyWordmark} alt="Ghostty" />
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
        <Menu className={s.menuToggle} />
      </GridContainer>
    </nav>
  );
}
