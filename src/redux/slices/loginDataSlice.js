import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationManager } from 'react-notifications';

const activeStatusFromSession = sessionStorage.getItem('active');

const credentials = {
  email: 'admin@merkautoec.com',
  password: '@MerkautoEC',
  active: activeStatusFromSession === 'true',
};

export const changeActiveStatus = createAsyncThunk(
  'credentials/changeActiveStatus',
  async (payload) => {
    NotificationManager.info('Autentificando..', 'Información');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { email, password } = payload;
    if (email !== credentials.email || password !== credentials.password) {
      NotificationManager.error('¡Email o Contraseña incorrecta!', 'Fallo');
      return { ...credentials, active: false };
    }

    NotificationManager.success('¡Ingreso Exítoso!', 'Exíto');
    sessionStorage.setItem('active', true);
    return { ...credentials, active: true };
  },
);

const initialState = {
  userCredentials: credentials,
  loading: false,
};

export const loginDataSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeActiveStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeActiveStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.userCredentials = action.payload;
      })
      .addCase(changeActiveStatus.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const loginDataActions = loginDataSlice.actions;

export default loginDataSlice.reducer;
