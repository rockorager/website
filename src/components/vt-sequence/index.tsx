import { useMemo } from "react";
import s from "./VTSequence.module.css";

interface VTSequenceProps {
  sequence: string | [string];
  unimplemented?: boolean;
}

// Draw a diagram showing the VT sequence.
//
// There are some special sequence elements that can be used:
//
//   - CSI will be replaced with ESC [.
//   - Pn will be considered a parameter
//
export default function VTSequence(props: VTSequenceProps) {
  const { sequence, unimplemented = false } = props;
  const sequenceElements = useMemo(() => parseSequence(sequence), [sequence]);

  // TODO: styling if unimplemented is set

  return (
    <ol className={s.vtsequence}>
      {sequenceElements.map(({ value, hex }, i) => (
        <li key={i} className={s.vtelem}>
          <dl>
            <dt>{hex ? `0x${hex}` : "____"}</dt>
            <dd>{value}</dd>
          </dl>
        </li>
      ))}
    </ol>
  );
}

const special: Record<string, number> = {
  BEL: 0x07,
  BS: 0x08,
  TAB: 0x09,
  LF: 0x0a,
  CR: 0x0d,
  ESC: 0x1b,
};

function parseSequence(sequence: string | string[]) {
  let sequenceArray = typeof sequence === "string" ? [sequence] : sequence;
  if (sequenceArray[0] === "CSI") {
    sequenceArray.shift();
    sequenceArray.unshift("ESC", "[");
  }

  return sequenceArray.map((value) => {
    // Pn is a param with name n.
    const param = value.match(/\P(\w)/)?.[1];
    if (param) return { value: param };

    // All sequence elements have hex except params.
    const specialChar = special[value] ?? value.charCodeAt(0);
    const hex = specialChar.toString(16).padStart(2, "0").toUpperCase();
    return { value, hex };
  });
}
