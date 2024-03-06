import { configureStore } from "@reduxjs/toolkit";
import groupReducer from "./slices/group-slice";
import cardReducer from "./slices/add-card-slice";

const store = configureStore({
  reducer: {
    group: groupReducer,
    addcard: cardReducer,
  },
});
export default store;
