import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NotificationManager } from 'react-notifications';

const initialState = {
  customersArray: [],
  matchedElements: [],
  loading: true,
  error: null,
};

async function fetchCsrfToken() {
  try {
    const response = await fetch('http://localhost:4000/api/csrf_token');
    const data = await response.json();
    return data.token;
  } catch (error) {
    return null;
  }
}

// GET customers#index
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

// POST customers#create
export const createCustomer = createAsyncThunk(
  'customers/createCustomer',
  async (customerData) => {
    try {
      const csrfToken = await fetchCsrfToken();
      const response = await fetch('http://localhost:4000/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
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

// DELETE customers#destroy
export const destroyCustomer = createAsyncThunk(
  'customers/destroyCustomer',
  async (customerID) => {
    try {
      const csrfToken = await fetchCsrfToken();
      const response = await fetch(
        `http://localhost:4000/api/customers/${customerID}`,
        {
          method: 'DELETE',
          headers: {
            'X-CSRF-Token': csrfToken,
          },
        },
      );

      if (response.status !== 204) {
        NotificationManager.error('Cliente no Encontrado.', 'Fallo', 1500);
        throw new Error('Error deleting customer');
      }

      NotificationManager.success('Cliente Eliminado.', 'Exito', 1500);
    } catch (error) {
      throw new Error(`Error deleting customers: ${error.message}`);
    }
  },
);

// PUT customers#update
export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async ({ customerData, customerID }) => {
    try {
      const csrfToken = await fetchCsrfToken();
      const response = await fetch(
        `http://localhost:4000/api/customers/${customerID}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
          credentials: 'include',
          body: JSON.stringify(customerData),
        },
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          `Error updating customer: ${response.status} - ${errorResponse.message}`,
        );
      }
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
    searchCustomer: (state, action) => {
      const searchFilter = action.payload.toUpperCase();
      state.matchedElements = state.customersArray.filter((element) =>
        element.cedula.toUpperCase().includes(searchFilter),
      );
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
