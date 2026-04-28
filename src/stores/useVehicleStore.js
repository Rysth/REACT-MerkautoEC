import { create } from 'zustand';

const initialVehicles = JSON.parse(localStorage.getItem('vehiculos')) || [];

export const useVehicleStore = create((set, get) => ({
	vehicleArray: initialVehicles,
	selectedVehicle: {},

	addNewVehicle: (vehicle) => {
		const exists = get().vehicleArray.find(
			(v) => v.placa.toUpperCase() === vehicle.placa.toUpperCase(),
		);
		if (exists) return;
		const next = [...get().vehicleArray, vehicle];
		localStorage.setItem('vehiculos', JSON.stringify(next));
		set({ vehicleArray: next });
	},

	getVehicleByID: (placa) => {
		const found = get().vehicleArray.find(
			(v) => v.placa.toUpperCase() === placa.toUpperCase(),
		);
		set({ selectedVehicle: found || {} });
	},

	setDefaultValue: () => set({ selectedVehicle: {} }),
}));
