import axios from 'axios';

const { VITE_API_ENDPOINT, VITE_TOKEN } = import.meta.env;

const parseSoapResponse = (responseData) => {
    if (typeof responseData !== 'string') {
        return responseData;
    }

    const xmlDocument = new DOMParser().parseFromString(responseData, 'application/xml');
    const parserError = xmlDocument.querySelector('parsererror');
    if (parserError) {
        return { code: '1', msgcode: 'Respuesta SOAP inválida' };
    }

    const resultText = xmlDocument.querySelector('ProccesMessageResult')?.textContent?.trim();
    if (!resultText) {
        return { code: '1', msgcode: 'Respuesta SOAP vacía' };
    }

    try {
        return JSON.parse(resultText);
    } catch {
        return { code: '1', msgcode: resultText };
    }
};

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
    return parseSoapResponse(response.data);
};
