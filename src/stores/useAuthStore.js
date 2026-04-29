import { create } from 'zustand';
import { toast } from 'react-toastify';
import { sendSoapRequest } from './soapClient';

const useAuthStore = create((set) => ({
  userCredentials: {
    email: '',
    password: '',
    active: localStorage.getItem('active') === 'true',
  },
  loading: false,

  login: async (data) => {
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
    } catch {
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

export default useAuthStore;
