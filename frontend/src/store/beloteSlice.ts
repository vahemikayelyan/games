import { createSlice } from "@reduxjs/toolkit";
import { IPlayer } from "../components/belote/player/Player";

interface BeloteState {
  players: IPlayer[];
}

const initialState: BeloteState = {
  players: [
    { username: "Vahe", pair: "Armen", left: "Sergey6" },
    { username: "Armen", pair: "Vahe", left: "Artur" },
    { username: "Sergey", pair: "Artur", left: "Armen" },
    { username: "Artur", pair: "Sergey", left: "Vahe" },
  ],
};

const contactSlice = createSlice({
  name: "belote",
  initialState,
  reducers: {},
});

//export const {} = contactSlice.actions;
export default contactSlice.reducer;
