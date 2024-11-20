import classNames from "classnames";
import { useEffect, useRef } from "react";
import { Code, P } from "../text";
import s from "./Terminal.module.css";

interface TerminalProps {
  className?: string;
  width: number;
  height: number;
  title?: string;
  lines?: string[];
}

export default function Terminal({ className, title, lines }: TerminalProps) {
  const codeEndRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (codeEndRef.current) {
      codeEndRef.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [lines]);

  return (
    <div className={classNames(s.terminal, className)}>
      <div className={s.header}>
        <ul className={s.windowControls}>
          <li></li>
          <li></li>
          <li></li>
        </ul>

        <P className={s.title}>{title}</P>
      </div>
      <Code className={s.content}>
        {lines?.map((line) => {
          return (
            <>
              {line}
              <br />
            </>
          );
        })}
        <div ref={codeEndRef} />
      </Code>
    </div>
  );
}
