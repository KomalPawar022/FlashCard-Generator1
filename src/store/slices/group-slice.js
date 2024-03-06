import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    addGroup(state, action) {
      state.push(action.payload);
    },
    removeGroup(state, action) {
      return state.filter((item) => item.group != action.payload);
    },
  },
});
export const { addGroup, removeGroup } = groupSlice.actions;
export default groupSlice.reducer;
