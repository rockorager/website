import { H2, P } from "../text";
import s from "./GenericCard.module.css";

interface GenericCardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function GenericCard({
  title,
  description,
  children,
}: GenericCardProps) {
  return (
    <div className={s.genericCard}>
      <H2 className={s.title}>{title}</H2>
      <P className={s.description}>{description}</P>
      <div className={s.buttons}>{children}</div>
    </div>
  );
}
