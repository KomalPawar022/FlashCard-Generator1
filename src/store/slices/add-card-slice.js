import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const cardSlice = createSlice({
  name: "addCard",
  initialState,
  reducers: {
    addCard(state, action) {
      console.log("in addCard");
      console.log(action.payload);
      state.push(action.payload);
    },
    removeCard(state, action) {
      return state.filter((item) => item.term != action.payload);
    },
  },
});
export const { addCard, removeCard } = cardSlice.actions;
export default cardSlice.reducer;
