import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { playCard } from "../../../store/beloteSlice";
import { CardDetails } from "../beloteHooks";
import Betting from "../betting/Betting";
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
  const bettor = useSelector((state: RootState) => state.belote.bettor);
  const dispatch = useDispatch();
  const handleClick = (card: CardDetails) => {
    dispatch(playCard([card, username || ""]));
  };

  return (
    <>
      <div className="player-details">
        {username}
        {username === bettor && <Betting />}
      </div>
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
