import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NotificationManager } from 'react-notifications';

const initialState = {
  vehiclesArray: [],
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

// GET vehicles#index
export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async () => {
    try {
      const response = await fetch('http://localhost:4000/api/vehicles');
      const data = await response.json();
      return data;
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
      const csrfToken = await fetchCsrfToken();
      const response = await fetch('http://localhost:4000/api/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(vehicleData),
      });

      if (!response.ok) {
        NotificationManager.error('Vehículo no Creado', 'Fallo', 1250);
        throw new Error('Error creating vehicle');
      }

      NotificationManager.success('Vehículo Creado.', 'Exito', 1250);
      const newVehicle = await response.json();
      return newVehicle;
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
      const csrfToken = await fetchCsrfToken();
      const response = await fetch(
        `http://localhost:4000/api/vehicles/${vehicleID}`,
        {
          method: 'DELETE',
          headers: {
            'X-CSRF-Token': csrfToken,
          },
        },
      );

      if (response.status !== 204) {
        NotificationManager.error('Vehículo no Encontrado.', 'Fallo', 1250);
        throw new Error('Error deleting vehicle');
      }

      NotificationManager.success('Vehículo Eliminado.', 'Exito', 1250);
    } catch (error) {
      throw new Error(`Error deleting vehicles: ${error.message}`);
    }
  },
);

// PUT vehicles#update
export const updateVehicle = createAsyncThunk(
  'vehicles/updateVehicle',
  async ({ vehicleData, vehicleID }) => {
    try {
      const csrfToken = await fetchCsrfToken();
      const response = await fetch(
        `http://localhost:4000/api/vehicles/${vehicleID}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
          credentials: 'include',
          body: JSON.stringify(vehicleData),
        },
      );

      if (!response.ok) {
        const errorResponse = await response.json();
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
    searchVehicle: (state, action) => {
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
