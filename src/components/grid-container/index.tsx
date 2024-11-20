import classNames from "classnames";
import s from "./GridContainer.module.css";

interface GridContainerProps {
  className?: string;
  children?: React.ReactNode;
}

export default function GridContainer({
  className,
  children,
}: GridContainerProps) {
  return (
    <div className={classNames(s.gridContainer, className)}>{children}</div>
  );
}
