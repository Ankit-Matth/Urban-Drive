import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isCommonLayoutVisible: true,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    showCommonLayout: (state) => {
      state.isCommonLayoutVisible = true;
    },
    hideCommonLayout: (state) => {
      state.isCommonLayoutVisible = false;
    },
  },
})

export const { showCommonLayout , hideCommonLayout } = layoutSlice.actions

export default layoutSlice.reducer