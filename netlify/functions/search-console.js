const { google } = require('googleapis');

exports.handler = async (event, context) => {
  try {
    // Hole den API-Schlüssel aus der Umgebungsvariable
    const apiKey = process.env.GOOGLE_API_KEY;

    // Zugriff auf die Google Search Console API
    const searchConsole = google.webmasters('v3');
    const response = await searchConsole.sites.list({
      auth: apiKey,  // Verwende den API-Schlüssel zur Authentifizierung
    });

    // Erfolgreiche Antwort zurückgeben
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Google Search Console Data',
        data: response.data,
      }),
    };
  } catch (error) {
    // Fehlerbehandlung
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
