import classNames from "classnames";
import GridContainer from "../grid-container";
import s from "./SectionWrapper.module.css";

interface SectionWrapperProps {
  children?: React.ReactNode;
}

export default function SectionWrapper({ children }: SectionWrapperProps) {
  return (
    <section className={classNames(s.sectionWrapper)}>
      <GridContainer>{children}</GridContainer>
    </section>
  );
}
