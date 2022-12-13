import "./belote.css";
import { usePlayers } from "./beloteHooks";
import Player from "./player/Player";
import Table from "./table/Table";

const Belote = () => {
  const { top, bottom, left, right } = usePlayers("Vahe");

  return (
    <>
      <div className="grid-container">
        <div className="top space">{top && <Player {...top} />}</div>
        <div className="left space">{left && <Player {...left} />}</div>
        <div className="space">
          <Table {...{ top, bottom, left, right }} />
        </div>
        <div className="right space">{right && <Player {...right} />}</div>
        <div className="bottom space">{bottom && <Player {...bottom} />}</div>
      </div>
    </>
  );
};

export default Belote;
