import s from "./Blockquote.module.css";

interface BlockquoteProps {
  children?: React.ReactNode;
}

export default function Blockquote({ children }: BlockquoteProps) {
  return <blockquote className={s.blockquote}>{children}</blockquote>;
}
