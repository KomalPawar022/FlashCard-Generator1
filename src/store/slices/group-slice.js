import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const groupSlice = createSlice({
  name: "cardGroup",
  initialState,
  reducers: {
    addGroup(state, action) {
      state.push(action.payload);
    },
    removeGroup(state, action) {
      return state.filter((item) => item.group != action.payload);
    },
    changeNoOfCards(state, action) {
      state.map((item) => {
        if (item.group === action.payload.group) {
          item.noOfCards = action.payload.noOfCards;
        }
      });
    },
  },
});
export const { addGroup, removeGroup, changeNoOfCards } = groupSlice.actions;
export default groupSlice.reducer;
