import classNames from "classnames";
import Link, { LinkProps } from "../link";
import { P } from "../text";
import s from "./Footer.module.css";

interface FooterProps {
  className?: string;
  links?: LinkProps[];
  copyright: string;
}

export default function Footer({ className, links, copyright }: FooterProps) {
  return (
    <footer className={classNames(s.footer, className)}>
      {links && (
        <ul className={s.linkList}>
          {links.map((link) => {
            return (
              <li key={link.text}>
                <Link {...link} />
              </li>
            );
          })}
        </ul>
      )}
      <P>{copyright}</P>
    </footer>
  );
}
