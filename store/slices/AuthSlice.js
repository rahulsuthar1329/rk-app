import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, sendOTP } from "../extraReducers/AuthReducers";
import showToast from "./../../components/Toast/Toast";

const initialState = {
  user: null,
  token: null,
  otp: "",
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch User Data
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false;
    });

    // Verification OTP
    builder.addCase(sendOTP.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendOTP.fulfilled, (state, action) => {
      state.otp = action.payload;
      state.loading = false;
      showToast(action.payload.message);
    });
    builder.addCase(sendOTP.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setLogin, logout } = authSlice.actions;
export default authSlice.reducer;
