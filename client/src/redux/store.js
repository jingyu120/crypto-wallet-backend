import { configureStore } from "@reduxjs/toolkit";
import { PERSIST, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import messageReducer from "./messageSlice";
import cryptoReducer from "./cryptoSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, cryptoReducer);

export const store = configureStore({
  reducer: { message: messageReducer, crypto: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: { ignoreActions: [PERSIST] } }),
});
