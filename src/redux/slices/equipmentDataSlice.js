import { createSlice } from '@reduxjs/toolkit';

const fields = [
  {
    id: 1,
    name: 'Radio',
  },
  {
    id: 2,
    name: 'Perillas de Tablero',
  },
  {
    id: 3,
    name: 'Encendedor',
  },
  {
    id: 4,
    name: 'Manual de Usuario',
  },
  {
    id: 5,
    name: 'Controles Radio',
  },
  {
    id: 6,
    name: 'Controles Alarma',
  },
  {
    id: 7,
    name: 'Moquetas',
  },
  {
    id: 8,
    name: 'Bocina',
  },
  {
    id: 9,
    name: 'Pluma',
  },
  {
    id: 10,
    name: 'Espejos externos',
  },
  {
    id: 11,
    name: 'Espejos internos',
  },
  {
    id: 12,
    name: 'Antena',
  },
  {
    id: 13,
    name: 'Emblemas',
  },
  {
    id: 14,
    name: 'Tapa Aceite',
  },
  {
    id: 15,
    name: 'Tapa Gasolina',
  },
  {
    id: 16,
    name: 'Tapa Radiador',
  },
  {
    id: 17,
    name: 'Triángulo',
  },
  {
    id: 18,
    name: 'Extintor',
  },
  {
    id: 19,
    name: 'Botiquín',
  },
  {
    id: 20,
    name: 'Gata',
  },
  {
    id: 21,
    name: 'Llave Gata',
  },
  {
    id: 22,
    name: 'Tapacubos',
  },
  {
    id: 23,
    name: 'Llantas Rep',
  },
  {
    id: 24,
    name: 'Otros',
  },
];

const initialState = {
  equipmentFields: fields,
};

export const equipmentDataSlice = createSlice({
  name: 'equipmentData',
  initialState,
  reducers: {},
});

export const equipmentDataActions = equipmentDataSlice.actions;

export default equipmentDataSlice.reducer;
