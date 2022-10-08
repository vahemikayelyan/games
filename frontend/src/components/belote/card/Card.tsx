import { CardDetails } from "../beloteHooks";
import "./card.css";
import Club from "./Club";
import Diamond from "./Diamond";
import Heart from "./Heart";
import Spade from "./Spade";

const Card = (props: CardDetails) => {
  const { suit } = props;

  function Suit(suitProps: { rotate?: boolean }) {
    switch (suit) {
      case "club":
        return <Club {...suitProps} />;
      case "diamond":
        return <Diamond {...suitProps} />;
      case "heart":
        return <Heart {...suitProps} />;
      default:
        return <Spade {...suitProps} />;
    }
  }

  return (
    <div className="card">
      <span style={{ position: "absolute", left: "1px", top: 0 }}>
        {props.value}
      </span>
      {props.positions.map((pos) => {
        return (
          <div
            key={suit + pos.column + pos.row}
            style={{
              gridColumnStart: pos.column,
              gridRowStart: pos.row,
              gridRowEnd: pos.rowSpan ? "span 3" : undefined,
            }}
          >
            <Suit rotate={pos.rotate} />
          </div>
        );
      })}
    </div>
  );
};

export default Card;
