import { configureStore } from '@reduxjs/toolkit';
import loginDataReducer from './slices/loginDataSlice';
import customerDataReducer from './slices/customerDataSlice';
import vehicleDataReducer from './slices/vehicleDataSlice';
import orderDataReducer from './slices/orderDataSlice';

const store = configureStore({
  reducer: {
    credentials: loginDataReducer,
    customers: customerDataReducer,
    vehicles: vehicleDataReducer,
    orders: orderDataReducer,
  },
});

export default store;
