import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ordersArray: [
    {
      id: '0000001',
      cliente: 'John Doe',
      vehiculo: 'GJS-2050',
      fecha: '2023-11-23',
      estado: 'Activo',
    },
    {
      id: '0000002',
      cliente: 'Jane Smith',
      vehiculo: 'ABC-1234',
      fecha: '2023-11-24',
      estado: 'Completo',
    },
    {
      id: '0000003',
      cliente: 'Bob Johnson',
      vehiculo: 'XYZ-5678',
      fecha: '2023-11-25',
      estado: 'Activo',
    },
    {
      id: '0000004',
      cliente: 'Alice Brown',
      vehiculo: 'DEF-9876',
      fecha: '2023-11-26',
      estado: 'Completo',
    },
    {
      id: '0000005',
      cliente: 'Charlie White',
      vehiculo: 'MNO-5432',
      fecha: '2023-11-27',
      estado: 'Activo',
    },
    {
      id: '0000006',
      cliente: 'David Black',
      vehiculo: 'PQR-2468',
      fecha: '2023-11-28',
      estado: 'Completo',
    },
    {
      id: '0000007',
      cliente: 'Eva Green',
      vehiculo: 'UVW-1357',
      fecha: '2023-11-29',
      estado: 'Activo',
    },
    {
      id: '0000008',
      cliente: 'Frank Grey',
      vehiculo: 'JKL-9101',
      fecha: '2023-11-30',
      estado: 'Completo',
    },
    {
      id: '0000009',
      cliente: 'Grace Red',
      vehiculo: 'HIJ-2468',
      fecha: '2023-12-01',
      estado: 'Activo',
    },
    {
      id: '0000010',
      cliente: 'Henry Blue',
      vehiculo: 'LMN-3690',
      fecha: '2023-12-02',
      estado: 'Completo',
    },
    {
      id: '0000011',
      cliente: 'Isaac Green',
      vehiculo: 'OPQ-1111',
      fecha: '2023-12-03',
      estado: 'Activo',
    },
    {
      id: '0000012',
      cliente: 'Hannah Brown',
      vehiculo: 'RST-2222',
      fecha: '2023-12-04',
      estado: 'Completo',
    },
    {
      id: '0000013',
      cliente: 'Oliver Black',
      vehiculo: 'UVW-3333',
      fecha: '2023-12-05',
      estado: 'Activo',
    },
    {
      id: '0000014',
      cliente: 'Zoe White',
      vehiculo: 'XYZ-4444',
      fecha: '2023-12-06',
      estado: 'Completo',
    },
    {
      id: '0000015',
      cliente: 'Nathan Grey',
      vehiculo: 'JKL-5555',
      fecha: '2023-12-07',
      estado: 'Activo',
    },
  ],
  matchedOrders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    /* eslint-disable */
    startArrays: (state) => {
      state.matchedOrders = state.ordersArray;
    },
    searchOrder: (state, action) => {
      const searchFilter = action.payload.toUpperCase();
      state.matchedOrders = state.ordersArray.filter((element) =>
        element.vehiculo.toUpperCase().includes(searchFilter),
      );
    },
    /* eslint-enable */
  },
});

export const orderDataActions = ordersSlice.actions;

export default ordersSlice.reducer;
