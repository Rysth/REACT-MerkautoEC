import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NotificationManager } from 'react-notifications';

const userCredentialsData = JSON.parse(localStorage.getItem('userCredentials'));

const initialState = {
  userCredentials: userCredentialsData || {},
  loading: false,
  active: userCredentialsData !== null,
};

export const createSession = createAsyncThunk(
  'credentials/createSession',
  async (customerData) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/login',
        customerData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );

      if (!response.status === 200) {
        NotificationManager.error('Email/Contraseña Incorrecta', 'Fallo', 1250);
        throw new Error('Error creating customer');
      }

      NotificationManager.success('Ingresó Correctamente!', 'Exito', 1250);
      return response.data.status.data.user;
    } catch (error) {
      NotificationManager.error('Email/Contraseña Incorrecta', 'Fallo', 1250);
      throw new Error('Error creating customer');
    }
  },
);

export const loginDataSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createSession.fulfilled, (state, action) => {
      console.log(action.payload);
      state.userCredentials = action.payload;
      state.loading = false;
      state.active = true;
      localStorage.setItem(
        'userCredentials',
        JSON.stringify(state.userCredentials),
      );
    });
  },
});

export const loginDataActions = loginDataSlice.actions;

export default loginDataSlice.reducer;
