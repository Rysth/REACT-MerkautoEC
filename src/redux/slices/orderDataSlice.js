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
  name: 'customerData',
  initialState,
  reducers: {
    addNewOrder: (state, action) => {
      state.orderArray = [...state.orderArray, action.payload];
      localStorage.setItem('ordenes', JSON.stringify(state.orderArray));
      NotificationManager.success('¡Orden Guardada!', 'Exíto');
    },
    getOrderByID: (state, action) => {
      const orderID = action.payload;
      const orderArray = [...state.orderArray];
      const orderSelected = orderArray.find((order) => order.id === orderID);

      if (orderSelected) {
        NotificationManager.success('¡Orden Encontrada!', 'Exíto');
        state.selectedOrder = orderSelected;
      } else {
        NotificationManager.warning('¡Orden no Encontrada!', 'Fallo');
        state.selectedOrder = null;
      }
    },
  },
});

export const orderDataActions = orderDataSlice.actions;

export default orderDataSlice.reducer;
