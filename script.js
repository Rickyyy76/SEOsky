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
            popupMessage.innerHTML = `🎉 Your calculation is complete! 🚀<br />
                <strong>Estimated Cost: $${totalCost.toFixed(2)}</strong><br />
                Feel free to contact us to discuss our offers! 💬<br />
                Contact us on <a href="https://www.instagram.com/76.rickyyy?igsh=d2dldDgya3BhYXRh&utm_source=qr" target="_blank">Instagram</a> or <a href="https://wonderl.ink/@rickyyy" target="_blank">Linktree</a>.`;
        });
    }

    // Event Listener für den Analyze-Button
    document.getElementById('checkPagespeed').addEventListener('click', function (event) {
        event.preventDefault();

        // URL aus dem Eingabefeld holen
        const url = document.getElementById('shopUrl').value;

        if (!url) {
            alert("Bitte gib eine URL ein.");
            return;
        }

        // Ladeanzeige aktivieren
        const loadingMessage = document.getElementById('loadingMessage');
        loadingMessage.style.display = "block"; // Ladeanzeige anzeigen

        // API-Aufruf zur PageSpeed Insights API
        fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=AIzaSyATCd63P4Z8eksy2jX5TCgaKE9bnFziNOk`)
            .then(response => response.json())
            .then(data => {
                // Ladeanzeige deaktivieren
                loadingMessage.style.display = "none"; // Ladeanzeige ausblenden

                console.log(data); // Überprüfe, ob die Daten korrekt zurückgegeben werden

                // Hier kannst du die PageSpeed-Daten anzeigen
                const resultElement = document.getElementById('pageSpeedData');
                resultElement.innerHTML = `
                    <h3>PageSpeed Insights Results</h3>
                    <table>
                        <tr>
                            <th>Metric</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td><strong>Performance Score</strong></td>
                            <td>${(data.lighthouseResult.categories.performance.score * 100).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <td><strong>First Contentful Paint (FCP)</strong></td>
                            <td>${(data.lighthouseResult.audits['first-contentful-paint'].displayValue)}</td>
                        </tr>
                        <tr>
                            <td><strong>Largest Contentful Paint (LCP)</strong></td>
                            <td>${(data.lighthouseResult.audits['largest-contentful-paint'].displayValue)}</td>
                        </tr>
                        <tr>
                            <td><strong>Total Blocking Time (TBT)</strong></td>
                            <td>${(data.lighthouseResult.audits['total-blocking-time'].displayValue)}</td>
                        </tr>
                        <tr>
                            <td><strong>Speed Index</strong></td>
                            <td>${(data.lighthouseResult.audits['speed-index'].displayValue)}</td>
                        </tr>
                        <tr>
                            <td><strong>Time to Interactive (TTI)</strong></td>
                            <td>${(data.lighthouseResult.audits['interactive'].displayValue)}</td>
                        </tr>
                        <tr>
                            <td><strong>SEO Score</strong></td>
                            <td>${(data.lighthouseResult.categories.seo.score * 100).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <td><strong>Accessibility Score</strong></td>
                            <td>${(data.lighthouseResult.categories.accessibility.score * 100).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <td><strong>Best Practices Score</strong></td>
                            <td>${(data.lighthouseResult.categories['best-practices'].score * 100).toFixed(2)}%</td>
                        </tr>
                    </table>
                `;
            })
            .catch(error => {
                // Ladeanzeige deaktivieren
                loadingMessage.style.display = "none"; // Ladeanzeige ausblenden

                console.error('Error:', error);
                alert("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.");
            });
    });
});
