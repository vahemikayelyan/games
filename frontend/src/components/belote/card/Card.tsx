import { CardDetails } from "../beloteHooks";
import "./card.css";
import CardSuit from "./CardSuit";

const Card = (props: CardDetails) => {
  const { suit } = props;

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
            <CardSuit suit={suit} rotate={pos.rotate} />
          </div>
        );
      })}
    </div>
  );
};

export default Card;
