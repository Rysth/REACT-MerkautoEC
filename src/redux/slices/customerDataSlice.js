import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NotificationManager } from 'react-notifications';

// Define an asynchronous thunk to fetch customers
export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async () => {
    try {
      const response = await fetch('http://localhost:4000/api/customers');
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching customers: ${error.message}`);
    }
  },
);
// Define an asynchronous thunk to fetch customers
export const createCustomer = createAsyncThunk(
  'customers/createCustomer',
  async (customerData) => {
    try {
      const response = await fetch('http://localhost:4000/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Include the CSRF token in the headers
        },
        credentials: 'include',
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        throw new Error('Error creating customer');
      }

      const newCustomer = await response.json();
      return newCustomer;
    } catch (error) {
      throw new Error(`Error creating  customers: ${error.message}`);
    }
  },
);

const initialState = {
  customersArray: [],
  matchedElements: [],
  loading: false,
  error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.customersArray = action.payload;
        state.matchedElements = action.payload;
        state.loading = false;
      })
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.customersArray = [...state.customersArray, action.payload];
        state.matchedElements = state.customersArray;
        state.loading = false;
      })
      .addCase(createCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const customerDataActions = customersSlice.actions;

export default customersSlice.reducer;
