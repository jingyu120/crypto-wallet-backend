import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./messageSlice";
import cryptoReducer from "./cryptoSlice";

export const store = configureStore({
  reducer: { message: messageReducer, crypto: cryptoReducer },
});
