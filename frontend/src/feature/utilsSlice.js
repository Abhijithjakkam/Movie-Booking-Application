import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
  openAlert: false,
  profilePicture: localStorage.getItem("profilePic"),
};

export const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    changeModalState: (state) => {
      state.openModal = !state.openModal;
    },
    changeAlert: (state) => {
      state.openModal = !state.openModal;
    },
    setProfileImage: (state, action) => {
      state.profilePicture = action.payload;
    },
  },
});
export const { changeModalState, changeAlert, setProfileImage } =
  utilsSlice.actions;
export default utilsSlice.reducer;
