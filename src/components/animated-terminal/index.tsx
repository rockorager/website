import { useEffect, useState } from "react";
import Terminal, { TerminalProps } from "../terminal";

export type AnimationFrame = string[];

export type AnimatedTerminalProps = Omit<TerminalProps, "lines"> & {
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
}: AnimatedTerminalProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  useEffect(() => {
    const reducedMotion =
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

    if (reducedMotion) {
      setCurrentFrame(16);
      return;
    }

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
