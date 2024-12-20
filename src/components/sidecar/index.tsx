import classNames from "classnames";
import { H6, P } from "../text";
import s from "./Sidecar.module.css";

interface SidecarItem {
  id: string;
  title: string;
  depth: number;
}

interface SidecarProps {
  className?: string;
  title: string;
  items: SidecarItem[];
  inViewHeaderIDs: string[];
}

// If there's less items than this, the sidecar content won't render
// it does not make sense to have a single item in the sidecar.
const MIN_SIDECAR_ITEMS = 2;

export default function Sidecar({
  className,
  title,
  items,
  inViewHeaderIDs,
}: SidecarProps) {
  // Calculate the first header that's in view
  var activeHeaderID: null | string;
  for (const item of items) {
    if (inViewHeaderIDs.includes(item.id.substring(1))) {
      activeHeaderID = item.id;
      break;
    }
  }
  return (
    <div className={classNames(s.sidecar, className)}>
      {items.length > MIN_SIDECAR_ITEMS && (
        <>
          <H6 className={s.title}>{title}</H6>
          <ul>
            {items.map(({ id, title, depth }) => {
              const active = id === activeHeaderID;
              return (
                <li
                  key={`${id}${active}`}
                  className={classNames({ [s.active]: active })}
                  style={
                    {
                      "--depth": depth,
                    } as React.CSSProperties
                  }
                >
                  {/* Intentionally using an a tag and not next/link:
              as we want our :target selectors to trigger here.
              See: https://github.com/vercel/next.js/issues/51346
              Also, we're remaining on the same page always here,
              so no client-side routing handing is needed. */}
                  <a href={id}>
                    <P weight={active ? "medium" : "regular"}>{title}</P>
                  </a>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
