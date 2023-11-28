import { configureStore } from '@reduxjs/toolkit';
import loginDataReducer from './slices/loginDataSlice';
import customerDataReducer from './slices/customerDataSlice';
import vehicleDataReducer from './slices/vehicleDataSlice';

const store = configureStore({
  reducer: {
    credentials: loginDataReducer,
    customers: customerDataReducer,
    vehicles: vehicleDataReducer,
  },
});

export default store;
