// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import sideBarReducer from './slices/sideBarSlice';

const store = configureStore({
  reducer: {
    sidebar: sideBarReducer
  }
});

export default store;
