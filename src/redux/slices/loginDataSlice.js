import { createSlice } from '@reduxjs/toolkit';

const credentials = {
  email: 'admin@merkautoec.com',
  password: '@MerkautoEC',
  active: false,
};

const initialState = {
  userCredentials: credentials,
};

export const loginDataSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    changeActiveStatue(action, payload) {
      /* eslint-disable */
      if (
        payload.email === action.userCredentials.email &&
        payload.password === action.userCredentials.password
      ) {
        action.userCredentials.active = true;
      }
    },
  },
});

export const loginDataActions = loginDataSlice.actions;

export default loginDataSlice.reducer;
