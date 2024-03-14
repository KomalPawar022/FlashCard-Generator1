import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addCard(state, action) {
      state.push(action.payload);
    },

    removeCard(state, action) {
      return state.filter((item) => item.term != action.payload);
    },
    adjustIds(state, action) {
      let index = 1;
      state.map((item) => {
        if (item.group === action.payload) {
          item.id = index;
          index++;
        }
      });
    },
  },
});
export const { addCard, removeCard, adjustIds } = cardSlice.actions;
export default cardSlice.reducer;
