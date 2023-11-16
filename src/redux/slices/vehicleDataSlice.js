import { createSlice } from '@reduxjs/toolkit';
import { NotificationManager } from 'react-notifications';

const getVehicleArrayFromLocalStorage = JSON.parse(
  localStorage.getItem('vehiculos'),
);

const initialState = {
  vehicleArray: getVehicleArrayFromLocalStorage || [],
  selectedVehicle: {},
};

export const vehicleDataSlice = createSlice({
  name: 'vehicleData',
  initialState,
  reducers: {
    addNewVehicle: (state, action) => {
      state.vehicleArray = [...state.vehicleArray, action.payload];
      localStorage.setItem('vehiculos', JSON.stringify(state.vehicleArray));
      NotificationManager.success('¡Vehículo Registrado!', 'Exíto');
    },
    getOrderByID: (state, action) => {
      const vehicleID = action.payload;
      const vehicleArray = [...state.vehicleArray];
      const vehicleSelected = vehicleArray.find(
        (vehicle) => vehicle.id === vehicleID,
      );

      if (vehicleSelected) {
        NotificationManager.success('Vehículo Encontrado!', 'Exíto');
        state.selectedVehicle = vehicleSelected;
      } else {
        NotificationManager.error('¡Vehículo no Encontrado!', 'Fallo');
        state.selectedVehicle = {};
      }
    },
  },
});

export const vehicleDataActions = vehicleDataSlice.actions;

export default vehicleDataSlice.reducer;
