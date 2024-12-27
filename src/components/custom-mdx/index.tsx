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
import { useStore } from "@/lib/use-store";
import { useEffect } from "react";

interface CustomMDXProps {
  content: MDXRemoteSerializeResult;
}

export default function CustomMDX({ content }: CustomMDXProps) {
  const resetHeaderIdsInView = useStore((state) => state.resetHeaderIdsInView);
  useEffect(() => {
    // When we do a client-side navigation to another page
    // the content will change & we will need to do a reset.
    resetHeaderIdsInView();
  }, [content]);

  return (
    <div className={s.customMDX}>
      <MDXRemote
        {...content}
        components={{
          h1: (props) => JumplinkHeader({ ...props, as: "h1" }),
          h2: (props) => JumplinkHeader({ ...props, as: "h2" }),
          h3: (props) => JumplinkHeader({ ...props, as: "h3" }),
          h4: (props) => JumplinkHeader({ ...props, as: "h4" }),
          h5: (props) => JumplinkHeader({ ...props, as: "h5" }),
          h6: (props) => JumplinkHeader({ ...props, as: "h6" }),
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
