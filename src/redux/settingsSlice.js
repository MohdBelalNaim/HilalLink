import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: "privacy",
};

const settingSlice = createSlice({
  name: "settingSlice",
  initialState,
  reducers: {
    changeMenu: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const {changeMenu} = settingSlice.actions
export default settingSlice.reducer
