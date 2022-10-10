import { useDispatch } from "react-redux";
import { playCard } from "../../../store/beloteSlice";
import { CardDetails } from "../beloteHooks";
import Card from "../card/Card";
import "./player.css";

export interface IPlayer {
  pair?: string;
  left?: string;
  username?: string;
  cards?: CardDetails[];
  playedCard?: CardDetails;
}

const Player = ({ username, cards }: IPlayer) => {
  const dispatch = useDispatch();
  const handleClick = (card: CardDetails) => {
    dispatch(playCard([card, username || ""]));
  };

  return (
    <>
      <div className="player-details">{username}</div>
      <div className="cards">
        {cards?.map((card) => (
          <div
            onClick={() => handleClick(card)}
            key={card.suit + card.value}
            className="card-wrapper"
          >
            <Card {...card} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Player;
