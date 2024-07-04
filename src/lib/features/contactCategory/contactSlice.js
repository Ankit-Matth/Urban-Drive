import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  contactCategory: "",
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContactCategory: (state,action) => {
      state.contactCategory = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setContactCategory } = contactSlice.actions

export default contactSlice.reducer