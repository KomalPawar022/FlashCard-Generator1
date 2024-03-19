import { createSlice } from "@reduxjs/toolkit";
//Group is saved as:-
// Group{
//   group,
//   description,
//   groupImg,
//   noOfCards,
// }

//To extract saved Groups from localStorage
const initialState = () => {
  if (localStorage.getItem("groups")) {
    return JSON.parse(localStorage.getItem("groups"));
  } else return [];
};
const groupSlice = createSlice({
  name: "cardGroup",
  initialState,
  reducers: {
    addGroup(state, action) {
      state.push(action.payload);
      localStorage.setItem("groups", JSON.stringify(state));
    },
    removeGroup(state, action) {
      let temp = state.filter((item) => item.group != action.payload);
      localStorage.setItem("groups", JSON.stringify(temp));
      return temp;
    },
    //When new cards are added
    changeNoOfCards(state, action) {
      state.map((item) => {
        if (item.group === action.payload.group) {
          item.noOfCards = action.payload.noOfCards;
        }
      });
      localStorage.setItem("groups", JSON.stringify(state));
    },
  },
});
export const { addGroup, removeGroup, changeNoOfCards } = groupSlice.actions;
export default groupSlice.reducer;
