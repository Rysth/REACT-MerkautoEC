import axios from 'axios';

const { VITE_API_ENDPOINT, VITE_TOKEN } = import.meta.env;

const convertJsonToXml = (jsonData) => `<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
        <ProccesMessage xmlns="coficeptrx.asvesot.com">
            <ReqTrxJMsg>${JSON.stringify(jsonData)}</ReqTrxJMsg>
            <ReqToken>${VITE_TOKEN}</ReqToken>
        </ProccesMessage>
    </soap12:Body>
</soap12:Envelope>`;

export const sendSoapRequest = async (jsonData) => {
	const xmlData = convertJsonToXml(jsonData);
	const response = await axios.post(VITE_API_ENDPOINT, xmlData, {
		headers: { 'Content-Type': 'application/soap+xml; charset=utf-8' },
	});
	return response.data;
};
