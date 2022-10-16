import { Suit } from "../beloteHooks";
import Club from "./Club";
import Diamond from "./Diamond";
import Heart from "./Heart";
import Spade from "./Spade";

const CardSuit = (props: { suit: Suit; rotate?: boolean }) => {
  switch (props.suit) {
    case "club":
      return <Club {...props} />;
    case "diamond":
      return <Diamond {...props} />;
    case "heart":
      return <Heart {...props} />;
    default:
      return <Spade {...props} />;
  }
};
export default CardSuit;
