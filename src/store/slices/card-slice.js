import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addCard(state, action) {
      state.push(action.payload);
      console.log("card saved");
    },

    removeCard(state, action) {
      return state.filter((item) => item.term != action.payload);
    },
  },
});
export const { addCard, removeCard } = cardSlice.actions;
export default cardSlice.reducer;
