import { configureStore } from '@reduxjs/toolkit';
import customerDataReducer from './slices/customerDataSlice';
import vehicleDataReducer from './slices/vehicleDataSlice';

const store = configureStore({
  reducer: {
    customers: customerDataReducer,
    vehicles: vehicleDataReducer,
  },
});

export default store;
