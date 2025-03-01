import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  problems: [],
};

const problemSlice = createSlice({
  name: "problems",
  initialState,
  reducers: {
    setProblems(state, action) {
      state.problems = action.payload;
    },
    addProblem: (state, action) => {
      state.problems.push(action.payload);
    },

  },
});

export const { setProblems ,addProblem } = problemSlice.actions;
export default problemSlice.reducer;

