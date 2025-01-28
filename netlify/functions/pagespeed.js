// netlify/functions/pagespeed.js

const axios = require('axios');

exports.handler = async function(event, context) {
  const { API_KEYS } = process.env;  // API-Schlüssel aus den Umgebungsvariablen

  const url = event.queryStringParameters.url;
  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "URL parameter is required" }),
    };
  }

  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${API_KEYS}`;

  try {
    const response = await axios.get(apiUrl);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching PageSpeed data", error: error.message }),
    };
  }
};
