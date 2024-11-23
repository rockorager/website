import s from "./Link.module.css";
import { SquareArrowOutUpRight } from "lucide-react";

export interface LinkProps {
  text: string;
  href: string;
}

export default function Link({ text, href }: LinkProps) {
  const isExternal = !href.startsWith("/");
  return (
    <a className={s.link} href={href} target={isExternal ? "_blank" : ""}>
      {text} {isExternal && <SquareArrowOutUpRight size={16} />}
    </a>
  );
}
