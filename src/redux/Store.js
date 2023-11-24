import { configureStore } from '@reduxjs/toolkit';
import loginDataReducer from './slices/loginDataSlice';
import orderDataReducer from './slices/orderDataSlice';

const store = configureStore({
  reducer: {
    credentials: loginDataReducer,
    orders: orderDataReducer,
  },
});

export default store;
