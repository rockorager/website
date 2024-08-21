import classNames from "classnames";
import s from "./NavTree.module.css";

interface NavTreeProps {
  className?: string;
}

export default function NavTree({ className }: NavTreeProps) {
  return (
    <div className={classNames(s.navTree, className)}>
      <h6>Nav Tree</h6>
    </div>
  );
}
