import { configureStore } from '@reduxjs/toolkit';
import customerDataReducer from './slices/customerDataSlice';
import equipmentDataReducer from './slices/equipmentDataSlice';
import loginDataReducer from './slices/loginDataSlice';

const store = configureStore({
  reducer: {
    customer: customerDataReducer,
    equipment: equipmentDataReducer,
    credentials: loginDataReducer,
  },
});

export default store;
