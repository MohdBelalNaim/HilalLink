import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./toggleSlice";
import settingsSlice from "./settingsSlice";
import userSlice from "./userSlice";
import exploreSlice from "./exploreSlice";
import searchSlice from "./searchSlice";

export const store = configureStore({
  reducer: {
    toggleSlice: toggleSlice,
    settingSlice: settingsSlice,
    userSlice: userSlice,
    exploreSlice: exploreSlice,
    searchSlice:searchSlice,
  },
});
