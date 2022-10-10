import { useSelector } from "react-redux";
import { RootState } from "../../store";

export type Suit = "heart" | "club" | "spade" | "diamond";
export type Value = "7" | "8" | "9" | "J" | "Q" | "K" | "10" | "A";

export interface Position {
  column: number;
  row: number;
  rotate?: boolean;
  rowSpan?: boolean;
}

export interface CardDetails {
  suit: Suit;
  value: Value;
  positions: Position[];
}

export function usePlayers(username: string) {
  const players = useSelector((state: RootState) => state.belote.players);
  let top = players.find((player) => player.pair === username);
  let bottom = players.find((player) => player.username === username);
  let left = players.find((player) => player.username === bottom?.left);
  let right = players.find((player) => player.username === left?.pair);

  return {
    top,
    bottom,
    left,
    right,
  };
}

export function useNewDeck() {
  let deck: CardDetails[] = [];

  getSuits().forEach((suit) => {
    getValues().forEach((value) => {
      deck.push({ suit, value, positions: getPositions(value) });
    });
  });

  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }

  return deck;
}

function getPositions(value: Value) {
  let positions: Position[] = [
    { column: 1, row: 1 },
    { column: 3, row: 1 },
    { column: 2, row: 2, rowSpan: true },
    { column: 1, row: 4 },
    { column: 3, row: 4 },
    { column: 1, row: 7, rotate: true },
    { column: 3, row: 7, rotate: true },
  ];

  switch (value) {
    case "7":
    case "8":
      if (value === "8") {
        positions.splice(5, 0, {
          column: 2,
          row: 5,
          rotate: true,
          rowSpan: true,
        });
      }
      break;
    case "9":
    case "10":
      positions = [
        { column: 1, row: 1 },
        { column: 3, row: 1 },
        { column: 1, row: 3 },
        { column: 3, row: 3 },
        { column: 2, row: 4 },
        { column: 1, row: 5, rotate: true },
        { column: 3, row: 5, rotate: true },
        { column: 1, row: 7, rotate: true },
        { column: 3, row: 7, rotate: true },
      ];
      if (value === "10") {
        positions[4].row = 2;
        positions.splice(7, 0, { column: 2, row: 6, rotate: true });
      }
      break;
    default:
      positions = [{ column: 2, row: 4 }];
      break;
  }

  return positions;
}

const getSuits = (): Suit[] => {
  const values: Suit[] = ["heart", "club", "spade", "diamond"];

  return values;
};

const getValues = (): Value[] => {
  const values: Value[] = ["7", "8", "9", "J", "Q", "K", "10", "A"];

  return values;
};
