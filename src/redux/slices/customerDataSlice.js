import { createSlice } from '@reduxjs/toolkit';

const fields = [
  { label: 'Cédula', name: 'cl_cedula' },
  { label: 'Nombre', name: 'cl_nombre' },
  { label: 'Responsable/Propietario', name: 'cl_propietario' },
  { label: 'Dirección', name: 'cl_direccion' },
  { label: 'Celular', name: 'cl_celular' },
  { label: 'Teléfono', name: 'cl_telefono', type: 'tel' },
  {
    label: 'Recibido por',
    name: 'cl_recepcion',
    complement: 'grid grid-cols-[5.3rem_1fr]',
  },
  {
    label: 'Técnico Responsable',
    name: 'cl_tecnico',
    complement: 'grid grid-cols-[9rem_1fr]',
  },
];

const initialState = {
  customerFields: fields,
};

export const customerDataSlice = createSlice({
  name: 'customerData',
  initialState,
  reducers: {},
});

export const customerDataActions = customerDataSlice.actions;

export default customerDataSlice.reducer;
