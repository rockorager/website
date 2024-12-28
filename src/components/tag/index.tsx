import classNames from "classnames";
import { Span } from "../text";
import s from "./Tag.module.css";

type TagColor =
  | "brand"
  | "blue"
  | "green"
  | "yellow"
  | "purple"
  | "red"
  | "orange"
  | "teal"
  | "gray"
  | "white";

export interface TagProps {
  name: string;
  color?: TagColor;
}

export default function Tag({ name, color = "brand" }: TagProps) {
  return (
    <div
      className={classNames(s.tag, {
        [s.brand]: color === "brand",
        [s.blue]: color === "blue",
        [s.green]: color === "green",
        [s.yellow]: color === "yellow",
        [s.purple]: color === "purple",
        [s.red]: color === "red",
        [s.orange]: color === "orange",
        [s.teal]: color === "teal",
        [s.gray]: color === "gray",
        [s.white]: color === "white",
      })}
    >
      <Span className={s.text}>{name}</Span>
    </div>
  );
}
