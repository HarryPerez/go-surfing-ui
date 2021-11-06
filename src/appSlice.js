import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  authUser: null,
};

const AppSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setIsAthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
  },
});

export const { setIsAthenticated, setAuthUser } = AppSlice.actions;
export default AppSlice.reducer;
