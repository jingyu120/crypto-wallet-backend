import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import messageReducer from "./messageSlice";

export const store = configureStore({
  reducer: { counter: counterReducer, message: messageReducer },
});
