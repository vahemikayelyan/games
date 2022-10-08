import { configureStore } from "@reduxjs/toolkit";
import beloteReducer from "./beloteSlice";

export const store = configureStore({
  reducer: { belote: beloteReducer },
});

export type RootState = ReturnType<typeof store.getState>;
