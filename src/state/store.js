import { configureStore } from '@reduxjs/toolkit';
import gameSlice from './gameSlice';

const store = configureStore({
  devTools: true,
  reducer: {
    game: gameSlice,
  },
});

export default store;
