import { createSlice } from "@reduxjs/toolkit";

const exploreSlice = createSlice({
  name: "exploreSlice",
  initialState: {
    current: "All",
  },
  reducers: {
    setMenu: (state, action) => {
      state.current = action.payload;
    },
  },
});
export const { setMenu } = exploreSlice.actions;
export default exploreSlice.reducer;
