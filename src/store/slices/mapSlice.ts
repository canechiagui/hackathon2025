// src/slices/sideBarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    isMoved: true
  },
  reducers: {
    startMoveToLocation: (state) => {
      state.isMoved = true;
    },
    finishMoveToLocation: (state) => {
      state.isMoved = false;
    }
  }
});

export const { startMoveToLocation, finishMoveToLocation } = mapSlice.actions;
export default mapSlice.reducer;
