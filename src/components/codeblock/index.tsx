import classNames from "classnames";
import "highlight.js/styles/gruvbox-dark.css";
import { Source_Code_Pro } from "next/font/google";
import Highlight from "react-highlight";
import s from "./CodeBlock.module.css";

const font = Source_Code_Pro({
  subsets: ["latin"],
  display: "auto",
  weight: ["400"],
});

interface CodeblockProps {
  children?: React.ReactNode;
}

export default function CodeBlock({ children }: CodeblockProps) {
  return (
    <Highlight className={classNames(s.codeBlock, font.className)}>
      {children}
    </Highlight>
  );
}
