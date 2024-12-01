import classNames from "classnames";
import { SquareArrowOutUpRight } from "lucide-react";
import { pretendardVariable } from "../text";
import s from "./Link.module.css";

export interface LinkProps {
  text: string;
  href: string;
  weight?: "light" | "regular" | "medium";
}

export default function Link({ text, href, weight = "light" }: LinkProps) {
  const isExternal = !href.startsWith("/");
  return (
    <a
      className={classNames(s.link, pretendardVariable.className, {
        [s.weightLight]: weight === "light",
        [s.weightRegular]: weight === "regular",
        [s.weightMedium]: weight === "medium",
      })}
      href={href}
      target={isExternal ? "_blank" : ""}
    >
      {text} {isExternal && <SquareArrowOutUpRight size={16} />}
    </a>
  );
}
