import { CardDetails } from "../beloteHooks";
import Card from "../card/Card";
import "./player.css";

export interface IPlayer {
  pair?: string;
  left?: string;
  username?: string;
  cards?: CardDetails[];
}

const Player = ({ username, cards }: IPlayer) => {
  return (
    <>
      <div className="player-details">{username}</div>
      <div className="cards">
        {cards?.map((card) => (
          <div key={card.suit + card.value} className="card-wrapper">
            <Card {...card} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Player;
