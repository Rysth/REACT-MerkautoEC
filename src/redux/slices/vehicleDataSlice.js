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
      const vehicleID = action.payload.placa;
      const vehicleArray = [...state.vehicleArray];
      const vehicleSelected = vehicleArray.find(
        (vehicle) => vehicle.placa.toUpperCase() === vehicleID.toUpperCase(),
      );

      if (!vehicleSelected) {
        state.vehicleArray = [...state.vehicleArray, action.payload];
        localStorage.setItem('vehiculos', JSON.stringify(state.vehicleArray));
        NotificationManager.success('¡Vehículo Registrado!', 'Exíto');
      }
    },
    getVehicleByID: (state, action) => {
      const vehicleID = action.payload;
      const vehicleArray = [...state.vehicleArray];
      const vehicleSelected = vehicleArray.find(
        (vehicle) => vehicle.placa.toUpperCase() === vehicleID.toUpperCase(),
      );

      if (vehicleSelected) {
        NotificationManager.success('Vehículo Encontrado!', 'Exíto');
        state.selectedVehicle = vehicleSelected;
      } else {
        NotificationManager.error('¡Vehículo no Encontrado!', 'Fallo');
        state.selectedVehicle = {};
      }
    },
    setDefaultValue: (state) => {
      state.selectedVehicle = {};
    },
  },
});

export const vehicleDataActions = vehicleDataSlice.actions;

export default vehicleDataSlice.reducer;
