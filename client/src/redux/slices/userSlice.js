import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../thunkMethods/authService";

// Get user from LocalStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  message: "",
  isSuccess: false,
  isError: false,
  loading: false,
};

// Register
export const register = createAsyncThunk(
  "auth/register",
  async (inputData, thunkAPI) => {
    try {
      return await authService.register(inputData);
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (inputData, thunkAPI) => {
    try {
      return await authService.login(inputData);
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.loading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.message = action.payload.msg;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.message = action.payload.msg;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
