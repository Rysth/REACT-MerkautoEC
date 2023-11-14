import { createSlice } from '@reduxjs/toolkit';
import { NotificationManager } from 'react-notifications';

const getOrderArrayFromLocalStorage = JSON.parse(
  localStorage.getItem('ordenes'),
);

const initialState = {
  orderArray: getOrderArrayFromLocalStorage || [],
};

export const orderDataSlice = createSlice({
  name: 'customerData',
  initialState,
  reducers: {
    addNewOrder: (state, action) => {
      state.orderArray = [...state.orderArray, action.payload];
      console.log('called');
      localStorage.setItem('ordenes', JSON.stringify(state.orderArray));
      NotificationManager.success('¡Orden Guardada!', 'Exíto');
    },
  },
});

export const orderDataActions = orderDataSlice.actions;

export default orderDataSlice.reducer;
