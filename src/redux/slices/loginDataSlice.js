import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const activeStatusFromSession = localStorage.getItem('active');

const credentials = {
	email: 'admin@merkautoec.com',
	password: '@MerkautoEC',
	active: activeStatusFromSession === 'true',
};

export const changeActiveStatus = createAsyncThunk('credentials/changeActiveStatus', async (payload) => {
	await new Promise((resolve) => setTimeout(resolve, 1500));

	const { email, password } = payload;
	if (email !== credentials.email || password !== credentials.password) {
		return { ...credentials, active: false };
	}

	localStorage.setItem('active', true);
	return { ...credentials, active: true };
});

const initialState = {
	userCredentials: credentials,
	loading: false,
};

export const loginDataSlice = createSlice({
	name: 'credentials',
	initialState,
	reducers: {
		logoutFromApp: (state) => {
			state.userCredentials.active = false;
			localStorage.setItem('active', state.userCredentials.active);
		},
	},
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
