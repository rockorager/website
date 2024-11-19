import classNames from "classnames";
import { ReactNode } from "react";
import SectionWrapper from "../section-wrapper";
import s from "./InfoCards.module.css";

interface InfoCardsSectionProps {
  className?: string;
  title: string;
  infoCards: InfoCard[];
}

interface InfoCard {
  title: string;
  description: string;
  icon: ReactNode;
}

export default function InfoCardsSection({
  className,
  title,
  infoCards,
}: InfoCardsSectionProps) {
  return (
    <SectionWrapper className={classNames(s.infoCardsSection, className)}>
      <h2 className={s.sectionTitle}>{title}</h2>
      <ul className={s.infoCards}>
        {infoCards.map((infoCard, i) => {
          return (
            <li key={i}>
              <div className={s.iconContainer}>{infoCard.icon}</div>
              <h3>{infoCard.title}</h3>
              <p>{infoCard.description}</p>
            </li>
          );
        })}
      </ul>
    </SectionWrapper>
  );
}
