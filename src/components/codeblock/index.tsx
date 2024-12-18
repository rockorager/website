import classNames from "classnames";
import Highlight from "react-highlight";
import { jetbrainsMono } from "../text";
import s from "./CodeBlock.module.css";

interface CodeblockProps {
  children?: React.ReactNode;
}

export default function CodeBlock({ children }: CodeblockProps) {
  return (
    <Highlight className={classNames(s.codeBlock, jetbrainsMono.className)}>
      {children}
    </Highlight>
  );
}
