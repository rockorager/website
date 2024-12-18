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
  const {
    sequence,
    unimplemented = false,
  } = props;
  let arr: [string] = typeof sequence === "string" ? [sequence] : sequence;

  // TODO: styling if unimplemented is set

  if (arr[0] === "CSI") {
    arr.shift();
    arr.unshift("ESC", "[");
  }

  return (
    <div className={s.vtsequence}>
      {arr.map((elem, i) => (
        <div key={`${i}${elem}`} className="shrink">
          <VTElem elem={elem} />
        </div>
      ))}
    </div>
  );
}

function VTElem({ elem }: { elem: string }) {
  const param = elem.length > 1 && elem[0] === "P";
  elem = param ? elem[1] : elem;
  const specialChar = special[elem] ?? elem.charCodeAt(0);
  const hex = specialChar.toString(16).padStart(2, "0").toUpperCase();

  return (
    <div className="vtelem">
      <div>{param ? "____" : `0x${hex}`}</div>
      <div>{elem}</div>
    </div>
  );
}

const special: { [key: string]: number } = {
  BEL: 0x07,
  BS: 0x08,
  TAB: 0x09,
  LF: 0x0a,
  CR: 0x0d,
  ESC: 0x1b,
};
