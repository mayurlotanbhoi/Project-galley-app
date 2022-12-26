import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const userSlicer = createSlice({
  name: "user",
  initialState: {
    data: {},
    status: STATUSES.IDLE,
    access: "logout",
    About: {},
  },

  reducers: {
    logout(state, action) {
      state.access = "logout";
      state.data = {};
    },
    removedata(state, action) {
      state.data = {};
    },
    aboutme(state, action) {
      state.About = action.payload;
      console.log(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.data = action.payload;
        state.status = STATUSES.IDLE;
        state.access = "login";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = STATUSES.ERRORS;
      });
  },
});

export const fetchUser = createAsyncThunk("user/data", async () => {
  try {
    // console.log("call");
    const res = await fetch("http://localhost:8000/user", {
      method: "get",
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export default userSlicer.reducer;

export const { logout, removedata, aboutme } = userSlicer.actions;
