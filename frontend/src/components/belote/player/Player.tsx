import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { IBet, playCard } from "../../../store/beloteSlice";
import { CardDetails } from "../beloteHooks";
import Betting from "../betting/Betting";
import Card from "../card/Card";
import "./player.css";

export interface IPlayer {
  bet?: IBet;
  pair?: string;
  next?: string;
  username?: string;
  cards?: CardDetails[];
  playedCard?: CardDetails;
  isFirstBettor?: boolean;
  passed: number;
}

const Player = (props: IPlayer) => {
  const { username, next, cards } = props;
  const bettor = useSelector((state: RootState) => state.belote.bettor);
  const isBetting = useSelector((state: RootState) => state.belote.isBetting);
  const isPlaying = useSelector((state: RootState) => state.belote.isPlaying);
  const dispatch = useDispatch();
  const handleClick = (card: CardDetails) => {
    if (isPlaying) {
      dispatch(playCard([card, props.username || ""]));
    }
  };

  return (
    <>
      <div className="player-details">
        {username}
        {isBetting && next && username === bettor && <Betting {...props} />}
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
