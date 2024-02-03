import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import path from "../../path";

export const sendOTP = createAsyncThunk("auth/send_auth_otp", async (email) => {
  try {
    const response = await axios.post(`${path}/auth/send_auth_otp`, {
      email: email.trim(),
    });
    console.log("send otp response: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    throw error;
  }
});

export const fetchUsers = createAsyncThunk("auth/fetch_user", async () => {
  const response = await fetch("https://reqres.in/api/users?delay=1");
  return (await response.json()).data;
});
