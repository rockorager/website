import { useEffect, useState } from "react";
import Terminal from "../terminal";

interface AnimatedTerminalPocProps {
  className?: string;
}

export default function AnimatedTerminalPOC({
  className,
}: AnimatedTerminalPocProps) {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prevLines) => [...prevLines, new Date().toString()]);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <Terminal
      className={className}
      columns={20}
      rows={8}
      title="Ghostty"
      fontSize="medium"
      lines={lines}
    />
  );
}
