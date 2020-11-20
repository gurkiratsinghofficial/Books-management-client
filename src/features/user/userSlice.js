import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { getJwt } from "../../helpers/jwt";

const initialState = {
  user: [],
  status: "idle",
  error: null,
};

/**get JWT token from local storage */
const jwt = getJwt();

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (userInfo) => {
    const response = await Axios.post(
      "http://localhost:8080/api/users",
      userInfo
    );
    return response.data;
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userInfo) => {
    const response = await Axios.post(
      "http://localhost:8080/api/users/login",
      userInfo
    );
    localStorage.setItem("JWT", response.data.token);
    return response.data;
  }
);
export const logOut = createAsyncThunk("user/logoutUser", async () => {
  localStorage.removeItem("JWT");
  return;
});

export const editUser = createAsyncThunk("books/editUser", async (userInfo) => {
  const response = await Axios.put(
    "http://localhost:8080/api/users",
    userInfo,
    { headers: { Authorization: `${jwt}` } }
  );
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSignup(state, action) {},
  },
  extraReducers: {
    [signupUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [signupUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [signupUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = state.user.concat(action.payload);
    },
    [logOut.fulfilled]: (state, action) => {
      state.status = "succeeded";
      const emptyState = [];
      state.user = emptyState;
    },
    [editUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user[0].userinfo = action.payload;
    },
  },
});
export default userSlice.reducer;
export const { bookAdded } = userSlice.actions;
export const selectUser = (state) => state.user.user;
