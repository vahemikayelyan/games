import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setBettor, setLastBet } from "../../../store/beloteSlice";
import { getSuits, Suit } from "../beloteHooks";
import "./betting.css";

const Betting = ({ username }: { username: string }) => {
  const minRate = "8";
  const suits = getSuits();
  const [rate, setRate] = useState<string>(minRate);
  const [canBet, setCanBet] = useState<boolean>(true);
  const [selectedSuit, setSelectedSuit] = useState<Suit>();
  const lastBet = useSelector((state: RootState) => state.belote.lastBet);

  const dispatch = useDispatch();

  const handleSuitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSuit(e.target.value as Suit);
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
      setRate(String(lastBet.rate));
      setSelectedSuit(lastBet.suit);
    }
  }, [lastBet]);

  useEffect(() => {
    if (lastBet) {
      setCanBet(false);
    }
  }, [lastBet]);

  return (
    <div className="betting">
      <button>Pass</button>
      <select value={selectedSuit} onChange={handleSuitChange}>
        <option key="empty"></option>
        {suits.map((suit) => (
          <option key={suit}>{suit}</option>
        ))}
        <option key="anghoz">Anghoz</option>
      </select>
      <input type={"number"} value={rate} onChange={handleRateChange} />
      <button
        disabled={!canBet || !selectedSuit}
        onClick={() => {
          if (selectedSuit) {
            dispatch(setLastBet({ suit: selectedSuit, rate: Number(rate) }));
            dispatch(setBettor(username));
          }
        }}
      >
        Bet
      </button>
    </div>
  );
};

export default Betting;
