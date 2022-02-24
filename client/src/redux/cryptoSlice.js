import { createSlice } from "@reduxjs/toolkit";

export const cryptoSlice = createSlice({
  name: "messages",
  initialState: { balance: 0 },
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const { setBalance } = cryptoSlice.actions;
export default cryptoSlice.reducer;
