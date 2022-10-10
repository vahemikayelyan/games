import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardDetails } from "../components/belote/beloteHooks";
import { IPlayer } from "../components/belote/player/Player";

interface BeloteState {
  players: IPlayer[];
  dealer: string;
}

const initialState: BeloteState = {
  players: [
    { username: "Vahe", pair: "Armen", left: "Sergey", cards: [] },
    { username: "Armen", pair: "Vahe", left: "Artur", cards: [] },
    { username: "Sergey", pair: "Artur", left: "Armen", cards: [] },
    { username: "Artur", pair: "Sergey", left: "Vahe", cards: [] },
  ],
  dealer: "",
};

const contactSlice = createSlice({
  name: "belote",
  initialState,
  reducers: {
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

export const { dealCards, playCard } = contactSlice.actions;
export default contactSlice.reducer;
