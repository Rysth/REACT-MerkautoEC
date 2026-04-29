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
      const responseCode = String(payload?.code ?? '1');
      const responseMessage = payload?.msgcode || 'No se pudo procesar la respuesta del servidor.';
      const successMessage = '¡Bienvenido! Has iniciado sesión correctamente.';

      if (responseCode === '0') {
        localStorage.setItem('active', 'true');
        set((state) => ({
          loading: false,
          userCredentials: { ...state.userCredentials, active: true },
        }));
        toast.success(successMessage);
      } else {
        set({ loading: false });
        toast.error(responseMessage);
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error?.message || '¡Problema al ingresar al sistema!');
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
