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
    editTerm(state, action) {
      state.map((item) => {
        if (item.term === action.payload.prevTerm) {
          item.term = action.payload.newTerm;
        }
      });
    },
    editDefinition(state, action) {
      state.map((item) => {
        if (item.term === action.payload.term) {
          item.definition = action.payload.definition;
        }
      });
    },
    editImg(state, action) {
      state.map((item) => {
        if (item.term === action.payload.term) {
          item.img = action.payload.img;
        }
      });
    },
  },
});
export const {
  addCard,
  removeCard,
  adjustIds,
  editTerm,
  editDefinition,
  editImg,
} = cardSlice.actions;
export default cardSlice.reducer;
