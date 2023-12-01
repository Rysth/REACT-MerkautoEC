import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NotificationManager } from 'react-notifications';
import API_URL from '../../helpers/environment';

const initialState = {
  customersArray: [],
  matchedElements: [],
  loading: true,
  error: null,
};

// GET customers#index
export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async () => {
    try {
      const response = await axios.get(`${API_URL}/customers`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching customers: ${error.message}`);
    }
  },
);

// POST customers#create
export const createCustomer = createAsyncThunk(
  'customers/createCustomer',
  async (customerData) => {
    try {
      const response = await axios.post(`${API_URL}/customers`, customerData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (!response.status === 200) {
        NotificationManager.error('Cliente no Creado', 'Fallo', 1250);
        throw new Error('Error creating customer');
      }

      NotificationManager.success('Cliente Creado.', 'Exito', 1250);
      return response.data;
    } catch (error) {
      throw new Error(`Error creating  customers: ${error.message}`);
    }
  },
);

// DELETE customers#destroy
export const destroyCustomer = createAsyncThunk(
  'customers/destroyCustomer',
  async (customerID) => {
    try {
      const response = await axios.delete(`${API_URL}/customers/${customerID}`);

      if (response.status !== 204) {
        NotificationManager.error('Cliente no Eliminado', 'Fallo', 1250);
        throw new Error('Error deleting customer');
      }

      NotificationManager.success('Cliente Eliminado.', 'Exito', 1250);
    } catch (error) {
      NotificationManager.error('Cliente tiene Vehículos.', 'Fallo', 1250);
      throw new Error(`Error deleting customers: ${error.message}`);
    }
  },
);

// PUT customers#update
export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async ({ customerData, customerID }) => {
    try {
      const response = await axios.put(
        `${API_URL}/customers/${customerID}`,
        customerData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );

      if (!response.status === 200) {
        const errorResponse = response.data;
        NotificationManager.error('Cliente no Actualizado.', 'Exito', 1250);
        throw new Error(
          `Error updating customer: ${response.status} - ${errorResponse.message}`,
        );
      }
      NotificationManager.success('Cliente Actualizado.', 'Exito', 1250);
    } catch (error) {
      throw new Error(`Error updating customers: ${error.message}`);
    }
  },
);

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    /* eslint-disable */
    startArrays: (state) => {
      state.matchedElements = state.customersArray;
    },
    searchElement: (state, action) => {
      const searchFilter = action.payload.toUpperCase();
      state.matchedElements = state.customersArray.filter(
        (element) =>
          element.cedula.toUpperCase().includes(searchFilter) ||
          element.nombre.toUpperCase().includes(searchFilter) ||
          element.email.toUpperCase().includes(searchFilter),
      );
    },
    /* eslint-enable */
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.customersArray = action.payload;
      state.matchedElements = action.payload;
      state.loading = false;
    });
  },
});

export const customerDataActions = customersSlice.actions;

export default customersSlice.reducer;
