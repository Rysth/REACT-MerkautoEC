import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import Axios for HTTP requests

const activeStatusFromSession = localStorage.getItem('active');

// Access environment variables
const { VITE_API_ENDPOINT, VITE_TOKEN } = import.meta.env;

const credentials = {
	email: 'admin@merkautoec.com',
	password: '@MerkautoEC',
	active: activeStatusFromSession === 'true',
};

// Function to convert JSON data to XML format
const convertJsonToXml = (jsonData) => {
	// Implement your logic to convert JSON to XML
	// For simplicity, I'm just returning a stringified version of the JSON data
	return `<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
        <ProccesMessage xmlns="coficeptrx.asvesot.com">
            <ReqTrxJMsg>${JSON.stringify(jsonData)}</ReqTrxJMsg>
            <ReqToken>${VITE_TOKEN}</ReqToken>
        </ProccesMessage>
    </soap12:Body>
</soap12:Envelope>`;
};

export const sendXmlRequest = createAsyncThunk('credentials/sendXmlRequest', async (jsonData, thunkAPI) => {
	try {
		const xmlData = convertJsonToXml(jsonData); // Convert JSON to XML
		const headers = {
			'Content-Type': 'application/soap+xml; charset=utf-8',
		};

		// Send the POST request to the provided endpoint with the XML data
		const response = await axios.post(VITE_API_ENDPOINT, xmlData, {
			headers,
		});

		return response.data;
	} catch (error) {
		console.log(error.response.data);
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

// Initial state and slice definition remain unchanged

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
			.addCase(sendXmlRequest.pending, (state) => {
				state.loading = true;
			})
			.addCase(sendXmlRequest.fulfilled, (state, action) => {
				state.loading = false;
				console.log(action.payload);
				// Update state as needed with the response data
			})
			.addCase(sendXmlRequest.rejected, (state) => {
				state.loading = false;
				// Handle any rejected cases
			});
	},
});

export const loginDataActions = loginDataSlice.actions;

export default loginDataSlice.reducer;
