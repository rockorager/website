import classNames from "classnames";
import { jetbrainsMono } from "../text";
import s from "./CodeBlock.module.css";

interface CodeblockProps {
  children?: React.ReactNode;
}

export default function CodeBlock({ children }: CodeblockProps) {
  return (
    <pre className={classNames(s.codeBlock, jetbrainsMono.className)}>
      {children}
    </pre>
  );
}
