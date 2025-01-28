const axios = require('axios');

exports.handler = async function(event, context) {
    const apiKey = process.env.PAGESPEED_API_KEY;  // Dein API-Schlüssel aus den Umgebungsvariablen
    const url = event.queryStringParameters.url;

    if (!url) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "URL-Parameter wird benötigt" }),
        };
    }

    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Fehler beim Abrufen der PageSpeed-Daten", error: error.message }),
        };
    }
};
