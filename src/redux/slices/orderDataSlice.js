import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getOrderArrayFromLocalStorage = JSON.parse(localStorage.getItem('ordenes'));

// Access environment variables
const { VITE_API_ENDPOINT, VITE_TOKEN } = import.meta.env;

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

// Async thunk to send SOAP request
export const sendXmlRequest = createAsyncThunk('orderData/sendXmlRequest', async (jsonData, thunkAPI) => {
	try {
		const xmlData = convertJsonToXml(jsonData); // Convert JSON to XML
		const headers = {
			'Content-Type': 'application/soap+xml; charset=utf-8',
		};

		// Send the POST request to the provided endpoint with the XML data
		const response = await axios.post(VITE_API_ENDPOINT, xmlData, {
			headers,
		});

		return { response: response.data, order: jsonData };
	} catch (error) {
		console.log(error.response.data);
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

const initialState = {
	orderArray: getOrderArrayFromLocalStorage || [],
	selectedOrder: {},
};

export const orderDataSlice = createSlice({
	name: 'orderData',
	initialState,
	reducers: {
		addNewOrder: (state, action) => {
			state.orderArray = [...state.orderArray, action.payload];
			localStorage.setItem('ordenes', JSON.stringify(state.orderArray));
		},
		getOrderByID: (state, action) => {
			const orderID = action.payload;
			const orderArray = [...state.orderArray];
			const orderSelected = orderArray.find((order) => order.id.toUpperCase() === orderID.toUpperCase());

			if (orderSelected) {
				state.selectedOrder = orderSelected;
			} else {
				state.selectedOrder = {};
			}
		},
		setDefaultOrderSelected: (state) => {
			state.selectedOrder = {};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(sendXmlRequest.fulfilled, (state, action) => {
				console.log(action.payload);
				if (action.payload) {
					state.orderArray = [...state.orderArray, action.payload.order];
					localStorage.setItem('ordenes', JSON.stringify(state.orderArray));
				}
			})
			.addCase(sendXmlRequest.rejected, (state, action) => {
				// Handle rejection of the SOAP request if needed
			});
	},
});

export const orderDataActions = orderDataSlice.actions;

export default orderDataSlice.reducer;
