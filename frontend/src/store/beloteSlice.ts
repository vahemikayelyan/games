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
  isBetting: boolean;
  isPlaying: boolean;
}

const initialState: BeloteState = {
  players: [
    {
      username: "Vahe",
      pair: "Armen",
      next: "Sergey",
      cards: [],
      passed: 0,
    },
    {
      username: "Armen",
      pair: "Vahe",
      next: "Artur",
      cards: [],
      passed: 0,
    },
    {
      username: "Sergey",
      pair: "Artur",
      next: "Armen",
      cards: [],
      passed: 0,
    },
    {
      username: "Artur",
      pair: "Sergey",
      next: "Vahe",
      cards: [],
      passed: 0,
    },
  ],
  dealer: "Vahe",
  isBetting: false,
  isPlaying: false,
};

const contactSlice = createSlice({
  name: "belote",
  initialState,
  reducers: {
    startGame: (state) => {
      const dealer = state.players.find((p) => p.username === state.dealer);

      state.isBetting = true;
      state.players.forEach((p) => (p.cards = []));

      if (dealer) {
        state.bettor = dealer.next;
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
    setBettor: (
      state,
      action: PayloadAction<{ bettor: IPlayer; bet?: IBet }>
    ) => {
      const { bettor, bet } = action.payload;
      let player = state.players.find((p) => p.username === bettor.username);

      if (player) {
        let nextPlayer = state.players.find((p) => p.username === bettor.next);
        let foundNextBettor: boolean = false;

        if (bet) {
          const pair = state.players.find((p) => p.username === player?.pair);

          if (!player.isFirstBettor && !pair?.isFirstBettor) {
            player.isFirstBettor = true;
          }
          state.lastBet = { ...bet };
          player.bet = { ...bet };
        } else {
          player.passed++;

          if (state.players.every((p) => p.passed === 1) && !!!state.lastBet) {
            const lastDealer = state.players.find(
              (p) => p.username === state.dealer
            );

            state.dealer = lastDealer?.next;
            state.isBetting = false;
            state.players.forEach((p) => {
              p.cards = [];
              p.passed = 0;
            });

            return;
          }
        }

        while (!foundNextBettor) {
          let nextPlayerPair = nextPlayer?.pair;
          let pair = state.players.find((p) => p.username === nextPlayerPair);
          const nextOfNext = nextPlayer?.next;

          if (
            nextPlayer &&
            (nextPlayer.passed === 2 ||
              (pair &&
                nextPlayer.passed === 1 &&
                pair.passed === 1 &&
                !!!nextPlayer.bet &&
                !!!pair.bet))
          ) {
            nextPlayer = state.players.find((p) => p.username === nextOfNext);
            nextPlayerPair = nextPlayer?.pair;
          } else {
            state.bettor = nextPlayer?.username;
            foundNextBettor = true;
          }
        }
      }
    },
  },
});

export const { startGame, dealCards, playCard, setBettor } =
  contactSlice.actions;
export default contactSlice.reducer;
