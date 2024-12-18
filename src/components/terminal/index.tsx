import classNames from "classnames";
import React, { UIEvent, useEffect, useRef, useState } from "react";
import { Code, P } from "../text";
import s from "./Terminal.module.css";

export interface TerminalProps {
  className?: string;
  columns: number;
  rows: number;
  fontSize?: "xtiny" | "tiny" | "small" | "medium" | "large";
  title?: string;
  lines?: string[];
  whitespacePadding?: number;
  disableScrolling?: boolean;
}

export default function Terminal({
  columns,
  rows,
  fontSize = "medium",
  className,
  title,
  lines,
  whitespacePadding = 0,
  disableScrolling = false,
}: TerminalProps) {
  const [autoScroll, setAutoScroll] = useState(true);
  const handleScroll = (e: UIEvent<HTMLElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement;
    const position = Math.ceil(
      (scrollTop / (scrollHeight - clientHeight)) * 100
    );
    if (position < 100) {
      setAutoScroll(false);
    }
    if (position == 100) {
      setAutoScroll(true);
    }
  };

  const codeRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (autoScroll) {
      codeRef.current?.scrollTo({
        top: codeRef.current.scrollHeight,
        behavior: "instant",
      });
    }
  }, [lines?.length, autoScroll]);

  const padding = " ".repeat(whitespacePadding);
  return (
    <div
      className={classNames(s.terminal, className, {
        [s.fontXTiny]: fontSize === "xtiny",
        [s.fontTiny]: fontSize === "tiny",
        [s.fontSmall]: fontSize === "small",
        [s.fontMedium]: fontSize === "medium",
        [s.fontLarge]: fontSize === "large",
      })}
      style={
        {
          "--columns": columns + 2 * whitespacePadding,
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
      <Code
        ref={codeRef}
        className={classNames(s.content, {
          [s.disableScrolling]: disableScrolling,
        })}
        onScroll={handleScroll}
      >
        {lines?.map((line, i) => {
          return (
            <div
              key={i + line}
              dangerouslySetInnerHTML={{
                __html: `${padding}${line}${padding}`,
              }}
            />
          );
        })}
      </Code>
    </div>
  );
}
