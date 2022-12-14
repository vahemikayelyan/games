import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setBettor } from "../../../store/beloteSlice";
import { getSuits, Suit, useCanStart, usePair } from "../beloteHooks";
import { IPlayer } from "../player/Player";
import "./betting.css";

const Betting = (props: IPlayer) => {
  const minRate = "8";
  const suits = getSuits();
  const [suit, setSuit] = useState<Suit>();
  const [rate, setRate] = useState<string>(minRate);
  const [canBet, setCanBet] = useState<boolean>(true);
  const lastBet = useSelector((state: RootState) => state.belote.lastBet);
  const canStart = useCanStart(props.username);
  const pair = usePair(props.pair);

  const dispatch = useDispatch();

  const handleSuitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSuit(e.target.value as Suit);
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentRate = Number(e.target.value);

    if (
      (!lastBet && currentRate >= Number(minRate)) ||
      (lastBet && currentRate >= lastBet?.rate)
    ) {
      setRate(e.target.value);
    }
    if (lastBet) {
      setCanBet(currentRate > lastBet.rate);
    }
  };

  useEffect(() => {
    if (lastBet) {
      setCanBet(false);
      setRate(String(lastBet.rate));
      setSuit(props.bet?.suit || pair?.bet?.suit);
    }
  }, [lastBet, pair, props.bet?.suit]);

  let betButton;

  if (canStart) {
    betButton = <button onClick={() => {}}>Start the game</button>;
  } else {
    betButton = (
      <button
        disabled={!canBet || !suit}
        onClick={() => {
          if (suit) {
            dispatch(
              setBettor({
                bettor: props,
                bet: { suit, rate: Number(rate) },
              })
            );
          }
        }}
      >
        Bet
      </button>
    );
  }

  return (
    <div className="betting">
      {!canStart && (
        <button
          onClick={() => {
            dispatch(setBettor({ bettor: props }));
          }}
        >
          Pass
        </button>
      )}
      <select
        value={suit}
        onChange={handleSuitChange}
        disabled={props.passed > 0 && !props.isFirstBettor}
      >
        {!!!props.bet && <option key="empty"></option>}
        {suits.map((suit) => (
          <option key={suit}>{suit}</option>
        ))}
        <option key="anghoz">Anghoz</option>
      </select>
      <input type={"number"} value={rate} onChange={handleRateChange} />
      {betButton}
    </div>
  );
};

export default Betting;
