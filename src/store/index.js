import { configureStore } from "@reduxjs/toolkit";
import groupReducer from "./slices/group-slice";
import cardReducer from "./slices/card-slice";

const store = configureStore({
  reducer: {
    cardGroup: groupReducer,
    card: cardReducer,
  },
});
export default store;
