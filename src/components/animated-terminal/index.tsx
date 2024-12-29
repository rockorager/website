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
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  useEffect(() => {
    const reducedMotion =
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

    if (reducedMotion) {
      setCurrentFrame(20);
      return;
    }

    if (!isFocused) return;

    const interval = setInterval(() => {
      setCurrentFrame((currentFrame) => {
        return (currentFrame + 1) % frames.length;
      });
    }, frameLengthMs);
    return () => clearInterval(interval);
  }, [isFocused, frameLengthMs, frames.length]);

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
