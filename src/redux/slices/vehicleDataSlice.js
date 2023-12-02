import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NotificationManager } from 'react-notifications';
import API_URL from '../../helpers/environment';

const initialState = {
  vehiclesArray: [],
  matchedElements: [],
  loading: true,
  error: null,
};

// GET vehicles#index
export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async () => {
    try {
      const response = await axios.get(`${API_URL}/vehicles`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching vehicles: ${error.message}`);
    }
  },
);

// POST vehicles#create
export const createVehicle = createAsyncThunk(
  'vehicles/createVehicle',
  async (vehicleData) => {
    try {
      const response = await axios.post(`${API_URL}/vehicles`, vehicleData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (!response.status === 200) {
        NotificationManager.error('Vehículo no Creado', 'Fallo', 1250);
        throw new Error('Error creating vehicle');
      }

      NotificationManager.success('Vehículo Creado.', 'Exito', 1250);
      return response.data;
    } catch (error) {
      throw new Error(`Error creating vehicles: ${error.message}`);
    }
  },
);

// DELETE vehicles#destroy
export const destroyVehicle = createAsyncThunk(
  'vehicles/destroyVehicle',
  async (vehicleID) => {
    try {
      const response = await axios.delete(
        `${API_URL}/vehicles/${vehicleID}`,
        {},
      );

      if (response.status !== 204) {
        NotificationManager.error('Vehículo no Encontrado.', 'Fallo', 1250);
        throw new Error('Error deleting vehicle');
      }

      NotificationManager.success('Vehículo Eliminado.', 'Exito', 1250);
    } catch (error) {
      throw new Error(`Error deleting order: ${error.message}`);
    }
  },
);

// PUT vehicles#update
export const updateVehicle = createAsyncThunk(
  'vehicles/updateVehicle',
  async ({ vehicleData, vehicleID }) => {
    try {
      const response = await axios.put(
        `${API_URL}/vehicles/${vehicleID}`,
        vehicleData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );

      if (!response.status === 200) {
        const errorResponse = response.data;
        NotificationManager.error('Vehículo no Actualizado.', 'Exito', 1250);
        throw new Error(
          `Error updating vehicle: ${response.status} - ${errorResponse.message}`,
        );
      }
      NotificationManager.success('Vehículo Actualizado.', 'Exito', 1250);
    } catch (error) {
      throw new Error(`Error updating vehicles: ${error.message}`);
    }
  },
);

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    /* eslint-disable */
    startArrays: (state) => {
      state.matchedElements = state.vehiclesArray;
    },
    searchElement: (state, action) => {
      const searchFilter = action.payload.toUpperCase();
      state.matchedElements = state.vehiclesArray.filter(
        (element) =>
          element.placa.toUpperCase().includes(searchFilter) ||
          element.customer.nombre.toUpperCase().includes(searchFilter) ||
          element.marca.toUpperCase().includes(searchFilter),
      );
    },
    /* eslint-enable */
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVehicles.fulfilled, (state, action) => {
      state.vehiclesArray = action.payload;
      state.matchedElements = action.payload;
      state.loading = false;
    });
  },
});

export const vehicleDataActions = vehiclesSlice.actions;

export default vehiclesSlice.reducer;
