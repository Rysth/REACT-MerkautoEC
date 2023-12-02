import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NotificationManager } from 'react-notifications';
import API_URL from '../../helpers/environment';

const initialState = {
  ordersArray: [],
  matchedElements: [],
  loading: true,
  error: null,
};

// GET orders#index
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching orders: ${error.message}`);
  }
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    /* eslint-disable */
    startArrays: (state) => {
      state.matchedElements = state.ordersArray;
    },
    searchElement: (state, action) => {
      const searchFilter = action.payload.toUpperCase();
      state.matchedElements = state.ordersArray.filter((element) =>
        element.vehiculo.toUpperCase().includes(searchFilter),
      );
    },
    /* eslint-enable */
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.ordersArray = action.payload;
      state.matchedElements = action.payload;
      state.loading = false;
    });
  },
});

export const orderDataActions = ordersSlice.actions;

export default ordersSlice.reducer;
