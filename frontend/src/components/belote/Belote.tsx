import "./belote.css";
import { usePlayers } from "./beloteHooks";
import Player from "./player/Player";
import Table from "./table/Table";

const Belote = () => {
  const { top, bottom, left, right } = usePlayers("Sergey");

  return (
    <>
      <div className="grid-container">
        <div className="top space">
          <Player {...top} />
        </div>
        <div className="left space">
          <Player {...left} />
        </div>
        <div className="space">
          <Table {...{ top, bottom, left, right }} />
        </div>
        <div className="right space">
          <Player {...right} />
        </div>
        <div className="bottom space">
          <Player {...bottom} />
        </div>
      </div>
    </>
  );
};

export default Belote;
