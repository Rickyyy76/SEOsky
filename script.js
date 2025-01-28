document.getElementById('seoCalculator').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const packageCost = parseFloat(document.getElementById('package').value);
    const numKeywords = parseInt(document.getElementById('numKeywords').value) || 0;
    const industryMultiplier = parseFloat(document.getElementById('industry').value);
    const rankingMultiplier = parseFloat(document.getElementById('rankingPosition').value);

    // Calculate total cost
    const additionalCost = numKeywords * 10; // $10 per keyword
    const totalCost = (packageCost + additionalCost) * industryMultiplier * rankingMultiplier;

    // Display the result
    document.getElementById('estimatedCost').textContent = `$${totalCost.toFixed(2)}`;
});