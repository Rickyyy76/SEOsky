document.addEventListener('DOMContentLoaded', function () {
    // Event Listener für den Calculate-Button
    const calculateButton = document.getElementById('calculateButton');
    if (calculateButton) {
        calculateButton.addEventListener('click', function (event) {
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

            // Berechnung der zusätzlichen Kosten für Keywords
            const additionalCost = numKeywords * 10; // $10 pro Keyword
            let totalCost = packageCost + additionalCost;

            // Anwendung der Multiplikatoren für Branche und Ranking-Position
            totalCost *= industryMultiplier;
            totalCost *= rankingMultiplier;

            // Add-on Kosten
            const localSeoCost = document.getElementById('localSeo').checked ? 100 : 0;
            const technicalSeoCost = document.getElementById('technicalSeo').checked ? 150 : 0;
            const competitorAnalysisCost = document.getElementById('competitorAnalysis').checked ? 200 : 0;
            totalCost += localSeoCost + technicalSeoCost + competitorAnalysisCost;

            // Ergebnis anzeigen
            const resultElement = document.getElementById('estimatedCost');
            resultElement.textContent = `$${totalCost.toFixed(2)}`;

            // Popup-Nachricht anzeigen
            const popupMessage = document.getElementById('popupMessage');
            popupMessage.style.display = "block";
            popupMessage.innerHTML = `🎉 Your calculation is complete! 🚀<br />
                <strong>Estimated Cost: $${totalCost.toFixed(2)}</strong><br />
                Feel free to contact us to discuss our offers! 💬<br />
                Contact us on <a href="https://www.instagram.com/76.rickyyy?igsh=d2dldDgya3BhYXRh&utm_source=qr" target="_blank">Instagram</a> or <a href="https://wonderl.ink/@rickyyy" target="_blank">Linktree</a>.`;

            // Detaillierte Berechnung anzeigen
            const detailsElement = document.getElementById('calculationDetails');
            detailsElement.innerHTML = `
                <h3>Calculation Breakdown</h3>
                <ul>
                    <li><strong>Package Cost:</strong> $${packageCost}</li>
                    <li><strong>Number of Keywords:</strong> ${numKeywords}</li>
                    <li><strong>Additional Cost for Keywords:</strong> $${additionalCost}</li>
                    <li><strong>Industry Multiplier:</strong> ${industryMultiplier}</li>
                    <li><strong>Ranking Position Multiplier:</strong> ${rankingMultiplier}</li>
                    <li><strong>Local SEO Cost:</strong> $${localSeoCost}</li>
                    <li><strong>Technical SEO Cost:</strong> $${technicalSeoCost}</li>
                    <li><strong>Competitor Analysis Cost:</strong> $${competitorAnalysisCost}</li>
                    <li><strong>Total Estimated Cost:</strong> $${totalCost.toFixed(2)}</li>
                </ul>
            `;
        });
    }

    // Event Listener für den Analyze-Button
    document.getElementById('checkPagespeed').addEventListener('click', function (event) {
        event.preventDefault();
        
        const url = document.getElementById('shopUrl').value;
        if (!url) {
            alert("Bitte gib eine URL ein.");
            return;
        }
        
        const loadingMessage = document.getElementById('loadingMessage');
        loadingMessage.style.display = "block";
        
        fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=AIzaSyATCd63P4Z8eksy2jX5TCgaKE9bnFziNOk`)
            .then(response => response.json())
            .then(data => {
                loadingMessage.style.display = "none";
                
                if (!data.lighthouseResult) {
                    alert("Keine PageSpeed-Daten verfügbar.");
                    return;
                }
                
                const audits = data.lighthouseResult.audits;
                const categories = data.lighthouseResult.categories;
                
                let detailedDataHtml = `🌐 <strong>Analyse der Webseite:</strong> ${url}<br><br>`;
                
                detailedDataHtml += `<h3>📊 Leistungsbewertung:</h3>`;
                for (const categoryKey in categories) {
                    const category = categories[categoryKey];
                    detailedDataHtml += `
                        <p>✅ <strong>${category.title}:</strong> ${category.score * 100}%</p>`;
                }
                
                detailedDataHtml += `<h3>⏱️ Wichtige Metriken:</h3>`;
                const metricKeys = ['first-contentful-paint', 'largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time', 'interactive'];
                metricKeys.forEach(key => {
                    if (audits[key]) {
                        detailedDataHtml += `<p>⚡ <strong>${audits[key].title}:</strong> ${audits[key].displayValue || 'Keine Daten'}</p>`;
                    }
                });
                
                detailedDataHtml += `<h3>💡 Optimierungsvorschläge:</h3><ul>`;
                const improvementKeys = ['uses-optimized-images', 'uses-text-compression', 'unused-css-rules', 'render-blocking-resources'];
                improvementKeys.forEach(key => {
                    if (audits[key]) {
                        detailedDataHtml += `<li>🛠️ <strong>${audits[key].title}:</strong> ${audits[key].displayValue || 'Keine Daten'}</li>`;
                    }
                });
                detailedDataHtml += `</ul>`;
                
                const resultElement = document.getElementById('pageSpeedData');
                resultElement.innerHTML = detailedDataHtml;
                document.getElementById('pagespeedResult').style.display = 'block';
            })
            .catch(error => {
                loadingMessage.style.display = "none";
                console.error('Error:', error);
                alert("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.");
            });
    });
});

