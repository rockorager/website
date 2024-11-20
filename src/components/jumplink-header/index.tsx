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
  const id = headerDeeplinkIdentifier(children);
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
        <Text className={className} as={as} font="display" weight="medium">
          {children}
        </Text>
        <a href={`#${id}`} className={s.jumplinkCopy}>
          <Link size={20} />
        </a>
      </div>
    </div>
  );
}

/**
 * @param children the MDX children node of the header element
 * @returns The resulting id string which should be applied to the jumplink-header
 */
function headerDeeplinkIdentifier(children?: React.ReactNode): string {
  const unexpectedError = () => {
    return new Error(`We have encountered an unsupported MDX element in a Header,
and are unable to generate an identifier for it. This likely a bug
with the function which threw this error.

Header MDX:
${JSON.stringify(children, null, 2)}`);
  };

  if (typeof children === "string") {
    // # Some simple string header
    return slugify(children, { lower: true });
  } else if (Array.isArray(children)) {
    // # Some `multi-component` header
    var flattenedTitle = "";
    children.forEach((value) => {
      if (typeof value === "string") {
        flattenedTitle += value;
      } else if (typeof value === "object" && value.type === "code") {
        flattenedTitle += value.props.children;
      } else {
        throw unexpectedError();
      }
    });
    return slugify(flattenedTitle, { lower: true });
  } else if (children != null && typeof children === "object") {
    if ((children as any).type === "code") {
      // # `just-some-code`
      return slugify((children as any).props.children, { lower: true });
    }
    throw unexpectedError();
  } else {
    throw unexpectedError();
  }
}
