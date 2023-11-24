import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customersArray: [
    {
      id: '1',
      cedula: '0931237663',
      nombre: 'John Palacios',
      celular: '0988949117',
      email: 'johnpalacios.t@gmail.com',
      estado: 'Activo',
    },
    {
      id: '2',
      cedula: '0934567890',
      nombre: 'Maria Rodriguez',
      celular: '0998765432',
      email: 'maria.rodriguez@example.com',
      estado: 'Inactivo',
    },
    {
      id: '3',
      cedula: '0939876543',
      nombre: 'Carlos Gomez',
      celular: '0976543210',
      email: 'carlos.gomez@example.com',
      estado: 'Activo',
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

      state.customersArray = [
        ...state.customersArray,
        { ...customerData, id: customerQuantity, estado: 'Activo' },
      ];
      state.matchedElements = state.customersArray;
    },
    /* eslint-enable */
  },
});

export const customerDataActions = customersSlice.actions;

export default customersSlice.reducer;
