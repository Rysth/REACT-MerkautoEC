import { createSlice } from '@reduxjs/toolkit';
import { NotificationManager } from 'react-notifications';

const initialState = {
  customersArray: [
    {
      id: '1',
      cedula: '0931237663',
      nombre: 'John Palacios',
      celular: '0988949117',
      email: 'johnpalacios.t@gmail.com',
    },
    {
      id: '2',
      cedula: '0934567890',
      nombre: 'Maria Rodriguez',
      celular: '0998765432',
      email: 'maria.rodriguez@example.com',
    },
    {
      id: '3',
      cedula: '0939876543',
      nombre: 'Carlos Gomez',
      celular: '0976543210',
      email: 'carlos.gomez@example.com',
    },
  ],
  matchedElements: [],
};

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    /* eslint-disable */
    startArrays: (state) => {
      state.matchedElements = state.customersArray;
    },
    searchCustomer: (state, action) => {
      const searchFilter = action.payload.toUpperCase();
      state.matchedElements = state.customersArray.filter((element) =>
        element.cedula.toUpperCase().includes(searchFilter),
      );
    },
    deleteCustomer: (state, action) => {
      const elementID = action.payload.toUpperCase();
      const newArray = state.customersArray.filter(
        (element) => element.id !== elementID,
      );
      state.customersArray = newArray;
      state.matchedElements = state.customersArray;
    },
    addNewCustomer: (state, action) => {
      const customerData = action.payload;
      const customerQuantity = state.customersArray.length + 1;
      const customerExist = state.customersArray.find(
        (element) =>
          element.cedula.toUpperCase() === customerData.cedula.toUpperCase(),
      );

      if (!customerExist) {
        state.customersArray = [
          ...state.customersArray,
          { ...customerData, id: customerQuantity, estado: 'Activo' },
        ];
        state.matchedElements = state.customersArray;
        NotificationManager.success('¡Cliente Registrado!', 'Éxito');
        return;
      }
      NotificationManager.error('¡Cliente ya Existe!', 'Fallo');
    },
    /* eslint-enable */
  },
});

export const customerDataActions = customersSlice.actions;

export default customersSlice.reducer;
