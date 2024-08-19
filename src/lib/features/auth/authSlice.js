import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthRequired: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthRequired: (state,action) => {
      state.isAuthRequired = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setIsAuthRequired } = authSlice.actions

export default authSlice.reducer