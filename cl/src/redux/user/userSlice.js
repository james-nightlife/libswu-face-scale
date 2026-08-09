import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  rating: 0,
  service: null,
  serviceName: null,
  serviceNameEN: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setService: (state, action) => {
      state.service = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
    },
    setServiceName: (state, action) => {
      state.serviceName = action.payload;
    },
    setServiceNameEN: (state, action) => {
      state.serviceNameEN = action.payload;
    },
  },
});

export const { signInSuccess, setRating, setService, signOut, setServiceName, setServiceNameEN } =
  userSlice.actions;
export default userSlice.reducer;
