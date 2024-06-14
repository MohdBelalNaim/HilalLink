import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "https://hilal-backend.vercel.app";
//const url = "http://localhost:5050";

export const loginUser = createAsyncThunk("user/loginUser", async () => {
  const res = await fetch(`${url}/user/my`, {
    method: "POST",
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const data = await res.json();
  return data;
});

const userSlice = createSlice({
  name: "useSlice",

  initialState: {
    base_url: url,
    user: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      });
  },
});
export const { getUser } = userSlice.actions;
export default userSlice.reducer;
