import classNames from "classnames";
import { H6, P } from "../text";
import s from "./Sidecar.module.css";

interface SidecarItem {
  id: string;
  title: string;
  active?: boolean;
}

interface SidecarProps {
  className?: string;
  title: string;
  items: SidecarItem[];
}

export default function Sidecar({ className, title, items }: SidecarProps) {
  return (
    <div className={classNames(s.sidecar, className)}>
      <H6 className={s.title}>{title}</H6>
      <ul>
        {items.map(({ id, title, active = false }) => {
          return (
            <li className={classNames({ [s.active]: active })}>
              {/* Intentionally using an a tag and not next/link:
              as we want our :target selectors to trigger here.
              See: https://github.com/vercel/next.js/issues/51346
              Also, we're remaining on the same page always here,
              so no client-side routing handing is needed. */}
              <a href={`#${id}`}>
                <P weight={active ? "medium" : "regular"}>{title}</P>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
