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

    // Berechnung der zusätzlichen Kosten für Keywords (falls benötigt)
    const additionalCost = numKeywords * 10; // $10 pro Keyword

    // Berechnung der Basis-Gesamtkosten
    let totalCost = packageCost + additionalCost;

    // Anwendung der Multiplikatoren für Branche und Ranking-Position
    totalCost *= industryMultiplier;
    totalCost *= rankingMultiplier;

    // Hinzufügen der Add-on Kosten
    const localSeoCost = document.getElementById('localSeo').checked ? 100 : 0;
    const technicalSeoCost = document.getElementById('technicalSeo').checked ? 150 : 0;
    const competitorAnalysisCost = document.getElementById('competitorAnalysis').checked ? 200 : 0;

    totalCost += localSeoCost + technicalSeoCost + competitorAnalysisCost;

    // Ergebnis anzeigen
    const resultElement = document.getElementById('estimatedCost');
    resultElement.textContent = `$${totalCost.toFixed(2)}`;

    // Anzeige der Nachricht, dass man sich melden kann
    const popupMessage = document.getElementById('popupMessage');
    popupMessage.style.display = "block";
    popupMessage.innerHTML = `
        🎉 Your calculation is complete! 🚀<br />
        <strong>Estimated Cost: $${totalCost.toFixed(2)}</strong><br />
        Feel free to contact us to discuss our offers! 💬<br />
        Contact us on <a href="https://www.instagram.com/76.rickyyy?igsh=d2dldDgya3BhYXRh&utm_source=qr" target="_blank">Instagram</a> or <a href="https://wonderl.ink/@rickyyy" target="_blank">Linktree</a>.
    `;
});
