import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardDetails } from "../components/belote/beloteHooks";
import { IPlayer } from "../components/belote/player/Player";

interface BeloteState {
  players: IPlayer[];
  dealer?: string;
  bettor?: string;
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
  },
});

export const { startGame, dealCards, playCard } = contactSlice.actions;
export default contactSlice.reducer;
