document.getElementById('calculateButton').addEventListener('click', function (event) {
    event.preventDefault();

    // Eingabewerte abrufen
    const packageCost = parseFloat(document.getElementById('package').value);
    let numKeywords = parseInt(document.getElementById('numKeywords').value) || 0;
    const industryMultiplier = parseFloat(document.getElementById('industry').value);
    const rankingMultiplier = parseFloat(document.getElementById('rankingPosition').value);

    // Wenn das Feld für die Keywords leer ist, setzen wir es basierend auf dem Paket
    if (numKeywords === 0) {
        if (packageCost === 250) {
            numKeywords = 10; // 10 Keywords für das Basis-Paket
        } else if (packageCost === 500) {
            numKeywords = 30; // 30 Keywords für das Standard-Paket
        } else if (packageCost === 1000) {
            numKeywords = 50; // 50+ Keywords für das Premium-Paket
        }
    }

    // Berechnung der Gesamtkosten (Zusätzliche Kosten für Keywords falls nötig)
    const additionalCost = numKeywords * 10; // $10 pro Keyword
    const totalCost = (packageCost + additionalCost) * industryMultiplier * rankingMultiplier;

    // Ergebnis anzeigen
    const resultElement = document.getElementById('estimatedCost');
    resultElement.textContent = `$${totalCost.toFixed(2)}`;

    // Anzeige der Nachricht, dass man sich melden kann
    const popupMessage = document.getElementById('popupMessage');
    popupMessage.style.display = "block";
    popupMessage.textContent = "🎉 Your calculation is complete! 🚀 Feel free to contact us to discuss our offers! 💬 Contact us on Instagram or Linktree.";
});

