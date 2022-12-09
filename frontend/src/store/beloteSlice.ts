import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardDetails, Suit } from "../components/belote/beloteHooks";
import { IPlayer } from "../components/belote/player/Player";

export interface IBet {
  suit: Suit;
  rate: Number;
}

interface BeloteState {
  players: IPlayer[];
  dealer?: string;
  bettor?: string;
  lastBet?: IBet;
  isStarted: boolean;
}

const initialState: BeloteState = {
  players: [
    { username: "Vahe", pair: "Armen", left: "Sergey", cards: [] },
    { username: "Armen", pair: "Vahe", left: "Artur", cards: [] },
    { username: "Sergey", pair: "Artur", left: "Armen", cards: [] },
    { username: "Artur", pair: "Sergey", left: "Vahe", cards: [] },
  ],
  dealer: "Vahe",
  isStarted: false,
};

const contactSlice = createSlice({
  name: "belote",
  initialState,
  reducers: {
    startGame: (state) => {
      const dealer = state.players.find((p) => p.username === state.dealer);

      state.isStarted = true;
      state.players.forEach((p) => (p.cards = []));

      if (dealer) {
        state.bettor = dealer.left;
      }
    },
    dealCards: (state, action: PayloadAction<[CardDetails[], string]>) => {
      let player = state.players.find((p) => p.username === action.payload[1]);

      if (player) {
        player.cards?.push(...action.payload[0]);
      }
    },
    playCard: (state, action: PayloadAction<[CardDetails, string]>) => {
      let player = state.players.find((p) => p.username === action.payload[1]);
      const card = action.payload[0];

      if (player) {
        player.playedCard = card;
        player.cards = player.cards?.filter(
          (c) => c.suit !== card.suit || c.value !== card.value
        );
      }
    },
    setLastBet: (state, action: PayloadAction<IBet>) => {
      state.lastBet = { ...action.payload };
    },
    setBettor: (state, action: PayloadAction<string>) => {
      const bettor = state.players.find((p) => p.username === action.payload);
      state.bettor = bettor?.left;
    },
  },
});

export const { startGame, dealCards, playCard, setLastBet, setBettor } =
  contactSlice.actions;
export default contactSlice.reducer;
