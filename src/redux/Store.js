import { configureStore } from '@reduxjs/toolkit';
import loginDataReducer from './slices/loginDataSlice';
import orderDataReducer from './slices/orderDataSlice';
import customerDataReducer from './slices/customerDataSlice';

const store = configureStore({
  reducer: {
    credentials: loginDataReducer,
    orders: orderDataReducer,
    customers: customerDataReducer,
  },
});

export default store;
