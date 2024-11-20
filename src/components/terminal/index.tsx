import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import { Code, P } from "../text";
import s from "./Terminal.module.css";

interface TerminalProps {
  className?: string;
  columns: number;
  rows: number;
  title?: string;
  lines?: string[];
}

export default function Terminal({
  columns,
  rows,
  className,
  title,
  lines,
}: TerminalProps) {
  const codeEndRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    codeEndRef.current?.scrollIntoView({
      behavior: "instant",
      block: "nearest",
    });
  }, [lines]);

  return (
    <div
      className={classNames(s.terminal, className)}
      style={
        {
          "--columns": columns,
          "--rows": rows,
        } as React.CSSProperties
      }
    >
      <div className={s.header}>
        <ul className={s.windowControls}>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <P className={s.title}>{title}</P>
      </div>
      <Code className={s.content}>
        {lines?.map((line, i) => {
          return (
            <span key={i + line}>
              {line}
              <br />
            </span>
          );
        })}
        <div ref={codeEndRef} />
      </Code>
    </div>
  );
}
