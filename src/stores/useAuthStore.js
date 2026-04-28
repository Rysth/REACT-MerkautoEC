import { create } from 'zustand';
import { toast } from 'react-toastify';
import { sendSoapRequest } from './soapClient';

const HARDCODED_EMAIL = 'admin@merkautoec.com';
const HARDCODED_PASSWORD = '@MerkautoEC';

export const useAuthStore = create((set) => ({
	userCredentials: {
		email: HARDCODED_EMAIL,
		password: HARDCODED_PASSWORD,
		active: localStorage.getItem('active') === 'true',
	},
	loading: false,

	login: async (data) => {
		if (data.email !== HARDCODED_EMAIL && data.password !== HARDCODED_PASSWORD) {
			toast.error('Credenciales incorrectas, por favor intente nuevamente.');
			return;
		}

		set({ loading: true });
		try {
			const payload = await sendSoapRequest({ ...data, servicio: 'LOGIN' });
			if (payload) {
				localStorage.setItem('active', 'true');
				set((state) => ({
					loading: false,
					userCredentials: { ...state.userCredentials, active: true },
				}));
				toast.success('¡Inicio de sesión exítoso!');
			} else {
				set({ loading: false });
			}
		} catch (error) {
			console.log(error);
			set({ loading: false });
			toast.error('¡Problema al ingresar al sistema!');
		}
	},

	logout: () => {
		localStorage.setItem('active', 'false');
		set((state) => ({
			userCredentials: { ...state.userCredentials, active: false },
		}));
		toast.success('¡Gracias!');
	},
}));
