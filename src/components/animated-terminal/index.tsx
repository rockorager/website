import { useEffect, useState } from "react";
import Terminal, { TerminalProps } from "../terminal";

export type AnimationFrame = string[];

export type AnimatedTerminalPocProps = Omit<TerminalProps, "lines"> & {
  frames: AnimationFrame[];
  frameLengthMs: number;
};

export default function AnimatedTerminal({
  className,
  columns,
  rows,
  fontSize,
  title,
  frames,
  whitespacePadding,
  frameLengthMs,
}: AnimatedTerminalPocProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((currentFrame) => {
        return (currentFrame + 1) % frames.length;
      });
    }, frameLengthMs);
    return () => clearInterval(interval);
  }, []);
  return (
    <Terminal
      className={className}
      columns={columns}
      whitespacePadding={whitespacePadding}
      rows={rows}
      title={title}
      fontSize={fontSize}
      lines={frames[currentFrame]}
      disableScrolling={true}
    />
  );
}
