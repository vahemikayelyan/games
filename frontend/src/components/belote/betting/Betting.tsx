import { useState } from "react";
import { getSuits } from "../beloteHooks";
import "./betting.css";

const Betting = () => {
  const suits = getSuits();
  const [bet, setBet] = useState<string>("8");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBet(e.target.value);
  };

  return (
    <div className="betting">
      <select>
        {suits.map((suit) => (
          <option key={suit}>{suit}</option>
        ))}
        <option key="anghoz">Anghoz</option>
      </select>
      <input type={"number"} value={bet} onChange={handleChange} />
    </div>
  );
};

export default Betting;
