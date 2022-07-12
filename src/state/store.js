import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';

const store = configureStore({
  devTools: true,
  reducer: {
    player: playerReducer,
  },
});

export default store;
