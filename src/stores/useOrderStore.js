import { create } from 'zustand';
import { toast } from 'react-toastify';
import { sendSoapRequest } from './soapClient';

const initialOrders = JSON.parse(localStorage.getItem('ordenes')) || [];

export const useOrderStore = create((set, get) => ({
	orderArray: initialOrders,
	selectedOrder: {},
	cedulaExists: false,

	addNewOrder: (order) => {
		const next = [...get().orderArray, order];
		localStorage.setItem('ordenes', JSON.stringify(next));
		set({ orderArray: next });
	},

	getOrderByID: (orderID) => {
		const found = get().orderArray.find((o) => o.id?.toUpperCase() === orderID.toUpperCase());
		set({ selectedOrder: found || {} });
	},

	setDefaultOrderSelected: () => set({ selectedOrder: {} }),

	saveOrder: async (jsonData) => {
		try {
			const payload = { ...jsonData, servicio: 'TRXINGORD' };
			const response = await sendSoapRequest(payload);
			if (response) {
				const next = [...get().orderArray, jsonData];
				localStorage.setItem('ordenes', JSON.stringify(next));
				set({ orderArray: next });
				toast.success('¡Orden creada correctamente!');
				return { ok: true, response };
			}
			return { ok: false };
		} catch (error) {
			console.log(error?.response?.data);
			toast.error('¡Problema al generar la orden!');
			return { ok: false, error };
		}
	},

	checkCedula: async (data) => {
		try {
			const payload = { ...data, servicio: 'TRXCONCLI' };
			const response = await sendSoapRequest(payload);
			set({ cedulaExists: !!response });
			if (response) toast.success('¡Consulta Realizada!');
			return response;
		} catch (error) {
			console.log(error);
			return null;
		}
	},
}));
