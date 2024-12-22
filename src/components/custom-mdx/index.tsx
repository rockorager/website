import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Blockquote from "../blockquote";
import ButtonLinks from "../button-links";
import Callout, { Caution, Important, Note, Tip, Warning } from "../callout";
import CardLinks from "../card-links";
import CodeBlock from "../codeblock";
import JumplinkHeader from "../jumplink-header";
import { BodyParagraph, LI } from "../text";
import VTSequence from "../vt-sequence";
import s from "./CustomMDX.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";

type MemoizedCustomMDX = Omit<CustomMDXProps, "onHeaderInViewChanged"> & {
  onHeadersInViewChanged: (headerIDs: string[]) => void;
};

export default function MemoizedCustomMDX({
  content,
  onHeadersInViewChanged,
}: MemoizedCustomMDX) {
  const [lastHeaderInView, setLastHeaderInView] = useState<string | null>(null);
  const [headersInView, setHeadersInView] = useState<string[]>([]);

  useEffect(() => {
    // When we do a client-side navigation to another page
    // the content will change & we will need to do a reset.
    setHeadersInView([]);
    setLastHeaderInView(null);
  }, [content]);

  useEffect(() => {
    // Notify the consumer
    if (headersInView.length > 0) {
      onHeadersInViewChanged(headersInView);
    } else if (lastHeaderInView != null) {
      onHeadersInViewChanged([lastHeaderInView]);
    }
  }, [headersInView, lastHeaderInView]);

  const onHeaderInViewChanged = useCallback((inView: boolean, id: string) => {
    if (inView) {
      if (!headersInView.includes(id)) {
        setHeadersInView((prev) => [...prev, id]);
        setLastHeaderInView(id);
      }
    } else {
      setHeadersInView((prev) => prev.filter((item) => item !== id));
    }
  }, []);

  // We have to memoize this, else this will cause a circular re-render
  // situation. We want simplify the interface for the callback to
  // the consumer of this to just simply be able to get notified when
  // there is a change to the in-view headers.
  const customMDX = useMemo(
    () => (
      <CustomMDX
        content={content}
        onHeaderInViewChanged={onHeaderInViewChanged}
      />
    ),
    [content]
  );

  return customMDX;
}

interface CustomMDXProps {
  content: MDXRemoteSerializeResult;
  onHeaderInViewChanged?: (inView: boolean, id: string) => void;
}

function CustomMDX({ content, onHeaderInViewChanged }: CustomMDXProps) {
  return (
    <div className={s.customMDX}>
      <MDXRemote
        {...content}
        components={{
          h1: (props) =>
            JumplinkHeader({
              ...props,
              as: "h1",
              onInViewChanged: onHeaderInViewChanged,
            }),
          h2: (props) =>
            JumplinkHeader({
              ...props,
              as: "h2",
              onInViewChanged: onHeaderInViewChanged,
            }),
          h3: (props) =>
            JumplinkHeader({
              ...props,
              as: "h3",
              onInViewChanged: onHeaderInViewChanged,
            }),
          h4: (props) =>
            JumplinkHeader({
              ...props,
              as: "h4",
              onInViewChanged: onHeaderInViewChanged,
            }),
          h5: (props) =>
            JumplinkHeader({
              ...props,
              as: "h5",
              onInViewChanged: onHeaderInViewChanged,
            }),
          h6: (props) =>
            JumplinkHeader({
              ...props,
              as: "h6",
              onInViewChanged: onHeaderInViewChanged,
            }),
          li: LI,
          p: BodyParagraph,
          pre: CodeBlock,
          blockquote: Blockquote,
          img: (props) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img className={s.image} src={props.src} alt={props.alt} />
          ),
          VTSequence,
          CardLinks,
          ButtonLinks,
          /* Callout Variants */
          Callout,
          Note,
          Tip,
          Important,
          Warning,
          Caution,
          "callout-title": () => null,
        }}
      />
    </div>
  );
}
