import { ButtonLink, ButtonTheme } from "../link";
import s from "./ButtonLinks.module.css";

interface ButtonLinks {
  text: string;
  href: string;
  theme?: ButtonTheme;
}

interface ButtonLinkProps {
  links: ButtonLinks[];
  columns?: number;
  columnsWhenSmall?: number;
}

export default function ButtonLinks({
  links,
  columns = links.length,
  columnsWhenSmall = columns,
}: ButtonLinkProps) {
  return (
    <ul
      className={s.buttonLinks}
      style={
        {
          "--large-size-columns": columns,
          "--small-size-columns": columnsWhenSmall,
        } as React.CSSProperties
      }
    >
      {links.map(({ href, text, theme = "brand" }) => {
        return (
          <li>
            <ButtonLink href={href} text={text} theme={theme} size="large" />
          </li>
        );
      })}
    </ul>
  );
}
