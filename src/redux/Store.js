import { configureStore } from '@reduxjs/toolkit';
import customerDataReducer from './slices/customerDataSlice';
import equipmentDataReducer from './slices/equipmentDataSlice';

const store = configureStore({
  reducer: { customer: customerDataReducer, equipment: equipmentDataReducer },
});

export default store;
