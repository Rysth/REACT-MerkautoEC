import { configureStore } from '@reduxjs/toolkit';
import loginDataReducer from './slices/loginDataSlice';

const store = configureStore({
  reducer: {
    credentials: loginDataReducer,
  },
});

export default store;
