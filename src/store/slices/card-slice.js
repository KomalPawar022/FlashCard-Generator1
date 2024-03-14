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
      console.log("editedCard", state);
    },
    editDefinition(state, action) {
      state.map((item) => {
        if (item.term === action.payload.term) {
          item.definition = action.payload.definition;
        }
      });
      console.log("editedCard", state);
    },
  },
});
export const { addCard, removeCard, adjustIds, editTerm, editDefinition } =
  cardSlice.actions;
export default cardSlice.reducer;
