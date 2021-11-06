import { configureStore } from "@reduxjs/toolkit";
import ReduxLogger from "redux-logger";
import appReducer from "./appSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ReduxLogger),
  reducer: {
    app: appReducer,
  },
});
