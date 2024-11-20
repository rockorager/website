import classNames from "classnames";
import localFont from "next/font/local";
import s from "./Text.module.css";

// https://github.com/orioncactus/pretendard
export const pretendardVariable = localFont({
  src: "./font/PretendardVariable.woff2",
  display: "auto",
  variable: "--pretendard-variable",
});

interface TextProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  as: "p" | "span" | "li" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  font?: "display" | "body";
  weight?: "light" | "regular" | "medium";
}

export default function Text({
  as: Tag,
  children,
  className,
  id,
  font = "body",
  weight = "light",
}: TextProps) {
  return (
    <Tag
      id={id}
      className={classNames(s.text, className, {
        [pretendardVariable.className]: font === "display" || font === "body",
        [s.weightLight]: weight === "light",
        [s.weightMedium]: weight === "medium",
      })}
    >
      {children}
    </Tag>
  );
}

type SpecificTagTextProps = Omit<TextProps, "as">;

export function LI(props: SpecificTagTextProps) {
  return Text({
    font: "body",
    weight: "light",
    as: "li",
    ...props,
  });
}

export function BodyParagraph(props: SpecificTagTextProps) {
  const { className, ...otherProps } = props;
  return Text({
    font: "body",
    weight: "regular",
    as: "p",
    className: classNames(s.body, className),
    ...otherProps,
  });
}

export function P(props: SpecificTagTextProps) {
  return Text({
    font: "body",
    weight: "light",
    as: "p",
    ...props,
  });
}

export function Span(props: SpecificTagTextProps) {
  return Text({
    font: "body",
    weight: "light",
    as: "span",
    ...props,
  });
}

export function H1(props: SpecificTagTextProps) {
  return Text({
    font: "display",
    weight: "medium",
    as: "h1",
    ...props,
  });
}

export function H2(props: SpecificTagTextProps) {
  return Text({
    font: "display",
    weight: "medium",
    as: "h2",
    ...props,
  });
}

export function H3(props: SpecificTagTextProps) {
  return Text({
    font: "display",
    weight: "medium",
    as: "h3",
    ...props,
  });
}

export function H4(props: SpecificTagTextProps) {
  return Text({
    font: "display",
    weight: "medium",
    as: "h4",
    ...props,
  });
}

export function H5(props: SpecificTagTextProps) {
  return Text({
    font: "display",
    weight: "medium",
    as: "h5",
    ...props,
  });
}

export function H6(props: SpecificTagTextProps) {
  return Text({
    font: "display",
    weight: "medium",
    as: "h6",
    ...props,
  });
}
