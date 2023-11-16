import { createSlice } from '@reduxjs/toolkit';
import { NotificationManager } from 'react-notifications';

const getOrderArrayFromLocalStorage = JSON.parse(
  localStorage.getItem('ordenes'),
);

const initialState = {
  orderArray: getOrderArrayFromLocalStorage || [],
  selectedOrder: {},
};

export const orderDataSlice = createSlice({
  name: 'orderData',
  initialState,
  reducers: {
    addNewOrder: (state, action) => {
      state.orderArray = [...state.orderArray, action.payload];
      localStorage.setItem('ordenes', JSON.stringify(state.orderArray));
      NotificationManager.success('¡Orden Registrada!', 'Exíto');
    },
    getOrderByID: (state, action) => {
      const orderID = action.payload;
      const orderArray = [...state.orderArray];
      const orderSelected = orderArray.find(
        (order) => order.id.toUpperCase() === orderID.toUpperCase(),
      );

      if (orderSelected) {
        NotificationManager.success('¡Orden Encontrada!', 'Exíto');
        state.selectedOrder = orderSelected;
      } else {
        NotificationManager.error('¡Orden no Encontrada!', 'Fallo');
        state.selectedOrder = {};
      }
    },
  },
});

export const orderDataActions = orderDataSlice.actions;

export default orderDataSlice.reducer;
