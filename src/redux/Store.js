import { configureStore } from '@reduxjs/toolkit';
import customerDataReducer from './slices/customerDataSlice';

const store = configureStore({
  reducer: { customer: customerDataReducer },
});

export default store;
