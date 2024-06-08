import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchSlice",
  initialState: {
    current: "All",
  },
  reducers: {
    setMenu: (state, action) => {
      state.current = action.payload;
    },
  },
});
export const { setMenu } = searchSlice.actions;
export default searchSlice.reducer;