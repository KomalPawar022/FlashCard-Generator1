import { createSlice } from "@reduxjs/toolkit";

//Card is saved as:-
//Card {
//   id,
//   term,
//   definition,
//   img,
//   group
// }

//Note that Cards are not saved within the Group they are stored separately
//They are bound by groupName

//To extract saved cards from localStorage
const initialState = () => {
  if (localStorage.getItem("cards")) {
    return JSON.parse(localStorage.getItem("cards"));
  } else return [];
};
const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addCard(state, action) {
      state.push(action.payload);
      localStorage.setItem("cards", JSON.stringify(state));
    },

    removeCard(state, action) {
      let temp = state.filter((item) => item.term != action.payload);
      localStorage.setItem("cards", JSON.stringify(temp));
      return temp;
    },

    //If a card in between is deleted to serially arrange the Ids
    adjustIds(state, action) {
      let index = 1;
      state.map((item) => {
        if (item.group === action.payload) {
          item.id = index;
          index++;
        }
      });
      localStorage.setItem("cards", JSON.stringify(state));
    },
    editTerm(state, action) {
      state.map((item) => {
        if (item.term === action.payload.prevTerm) {
          item.term = action.payload.newTerm;
        }
      });
      localStorage.setItem("cards", JSON.stringify(state));
    },
    editDefinition(state, action) {
      state.map((item) => {
        if (item.term === action.payload.term) {
          item.definition = action.payload.definition;
        }
      });
      localStorage.setItem("cards", JSON.stringify(state));
    },
    editImg(state, action) {
      state.map((item) => {
        if (item.term === action.payload.term) {
          item.img = action.payload.img;
        }
      });

      localStorage.setItem("cards", JSON.stringify(state));
    },
    //When a group is deleted all the cards bound to it are deleted
    removeAll(state, action) {
      let temp = state.filter((item) => item.group != action.payload);
      localStorage.setItem("cards", JSON.stringify(temp));
      return temp;
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
  removeAll,
} = cardSlice.actions;
export default cardSlice.reducer;
