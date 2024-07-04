import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userRole: "",
};

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole: (state,action) => {
      state.userRole = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setRole } = roleSlice.actions

export default roleSlice.reducer