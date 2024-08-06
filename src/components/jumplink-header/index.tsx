import classNames from "classnames";
import { Link } from "lucide-react";
import slugify from "slugify";
import Text from "../text";
import s from "./JumplinkHeader.module.css";

interface JumplinkHeaderProps {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  children?: React.ReactNode;
}

export default function JumplinkHeader({
  className,
  children,
  as,
}: JumplinkHeaderProps) {
  const id = slugify(children as string, {
    lower: true,
  });
  return (
    <div className={s.jumplinkHeader} id={id}>
      <div
        className={classNames(s.content, {
          [s.h1]: as === "h1",
          [s.h2]: as === "h2",
          [s.h3]: as === "h3",
          [s.h4]: as === "h4",
          [s.h5]: as === "h5",
          [s.h6]: as === "h6",
        })}
      >
        <Text className={className} as={as} font="display" weight="500">
          {children}
        </Text>
        <a href={`#${id}`} className={s.jumplinkCopy}>
          <Link size={20} />
        </a>
      </div>
    </div>
  );
}
