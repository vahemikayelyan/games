import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { dealCards } from "../../../store/beloteSlice";
import { useNewDeck } from "../beloteHooks";
import Card from "../card/Card";
import { IPlayer } from "../player/Player";
import "./table.css";

const Table = ({
  top,
  bottom,
  left,
  right,
}: {
  top: IPlayer | undefined;
  bottom: IPlayer | undefined;
  left: IPlayer | undefined;
  right: IPlayer | undefined;
}) => {
  const players = useSelector((state: RootState) => state.belote.players);
  const dispatch = useDispatch();
  let newDeck = useNewDeck();

  const handleDealCards = () => {
    let player = players.find((p) => p.username === "Vahe");

    while (newDeck.length > 0) {
      const nextPlayer = player?.left || "";
      dispatch(dealCards([newDeck.splice(0, 4), nextPlayer]));
      player = players.find((p) => p.username === nextPlayer);
    }
  };

  return (
    <div className="table">
      <div>
        <button onClick={handleDealCards}>Deal cards</button>
      </div>
      <div style={{ gridRow: "1 / span 3" }}>
        {left?.playedCard && <Card {...left?.playedCard} />}
      </div>
      <div style={{ gridColumnStart: 2, gridRowStart: 1 }}>
        {top?.playedCard && <Card {...top?.playedCard} />}
      </div>
      <div style={{ gridColumnStart: 3, gridRow: "1 / span 3" }}>
        {right?.playedCard && <Card {...right?.playedCard} />}
      </div>
      <div style={{ gridColumnStart: 2, gridRowStart: 3 }}>
        {bottom?.playedCard && <Card {...bottom?.playedCard} />}
      </div>
    </div>
  );
};

export default Table;
