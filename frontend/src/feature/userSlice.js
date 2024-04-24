import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../port";
import Cookies from "js-cookie";
const initialState = {
  userName: "",
  userEmail: "",
  isLoggedIn: false,
  upCommingShows: [],
  previousShows: [],
};
export const getUserLoggedIn = createAsyncThunk("user/loginUser", async () => {
  try {
    window.location.href = `${BASE_URL}/api/auth/google`;
    return true;
  } catch (err) {
    return false;
  }
});
export const getViewList = createAsyncThunk("user/getMovieList", async () => {
  try {
    const res = await axios.post(`${BASE_URL}/api/booking/my_bookings`);
    const bookings = res.data;
    let upComming = [];
    let previous = [];
    bookings.map((booking) => {
      const newDate = new Date(booking.showTime);
      if (newDate.getDate() >= Date.now()) {
        upComming.push(booking);
      } else {
        previous.push(booking);
      }
    });
    return { upComming: upComming, previos: previous };
  } catch (err) {
    console.log(err);
  }
});
export const getUserLoggedOut = createAsyncThunk(
  "user/logoutUser",
  async () => {
    try {
      document.cookie =
        "authToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax";
      return false;
    } catch (err) {
      console.log(err);
      return true;
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserLoggedIn: (state, action) => {
      (state.userName = action.payload.userName),
        (state.userEmail = action.payload.userEmail),
        (state.isLoggedIn = true);
    },
    updateSignOut: (state, action) => {
      (state.userName = ""), (state.userEmail = ""), (state.isLoggedIn = false);
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserLoggedIn.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLoggedIn = true;
      }
    });
    builder.addCase(getUserLoggedOut.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload;
    });
    builder.addCase(getViewList.fulfilled, (state, action) => {
      state.upCommingShows = action.payload?.upComming;
      state.previousShows = action.payload?.previos;
    });
  },
});
export const { updateSignOut, updateUserLoggedIn } = userSlice.actions;
export default userSlice.reducer;
