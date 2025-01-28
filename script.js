document.getElementById('seoCalculator').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
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

    // Calculate total cost (Zusätzliche Kosten für Keywords falls nötig)
    const additionalCost = numKeywords * 10; // $10 pro Keyword
    const totalCost = (packageCost + additionalCost) * industryMultiplier * rankingMultiplier;

    // Display the result
    document.getElementById('estimatedCost').textContent = `$${totalCost.toFixed(2)}`;
});
