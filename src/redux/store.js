import { configureStore } from '@reduxjs/toolkit';
import analisisReducer from '../features/analisisSlice';
import socketMiddleware from '../middlewares/socketMiddleware';

export const store = configureStore({
  reducer: {
    analisis: analisisReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat([socketMiddleware])
  }
});