import { createSlice } from "@reduxjs/toolkit";
// import { stat } from "fs";

const initialState = {
  user: null,
  address : null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; 
    },
    setAddress : (state , action) => {
      state.address = action.payload;
    },
    logout: (state) => {
      state.user = null; 
    },
  },
});

export const { setUser,setAddress , logout } = userSlice.actions;
export default userSlice.reducer;
