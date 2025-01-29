document.addEventListener('DOMContentLoaded', function () {
    // Cache elements for better performance
    const calculateButton = document.getElementById('calculateButton');
    const packageInput = document.getElementById('package');
    const numKeywordsInput = document.getElementById('numKeywords');
    const industryInput = document.getElementById('industry');
    const rankingInput = document.getElementById('rankingPosition');
    const resultElement = document.getElementById('estimatedCost');
    const popupMessage = document.getElementById('popupMessage');
    const detailsElement = document.getElementById('calculationDetails');

    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, function (match) {
            return ( {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            })[match];
        });
    }

    if (calculateButton) {
        calculateButton.addEventListener('click', function (event) {
            event.preventDefault();

            const packageCost = parseFloat(packageInput.value);
            let numKeywords = parseInt(numKeywordsInput.value) || 0;
            const industryMultiplier = parseFloat(industryInput.value);
            const rankingMultiplier = parseFloat(rankingInput.value);

            if (numKeywords === 0) {
                numKeywords = packageCost === 250 ? 10 : packageCost === 500 ? 30 : 50;
            }

            const additionalCost = numKeywords * 10;
            let totalCost = (packageCost + additionalCost) * industryMultiplier * rankingMultiplier;

            const localSeoCost = document.getElementById('localSeo').checked ? 100 : 0;
            const technicalSeoCost = document.getElementById('technicalSeo').checked ? 150 : 0;
            const competitorAnalysisCost = document.getElementById('competitorAnalysis').checked ? 200 : 0;
            totalCost += localSeoCost + technicalSeoCost + competitorAnalysisCost;

            resultElement.textContent = `$${totalCost.toFixed(2)}`;

            popupMessage.style.display = "block";
            popupMessage.innerHTML = `🎉 Your calculation is complete! 🚀<br />
                <strong>Estimated Cost: $${totalCost.toFixed(2)}</strong><br />
                Feel free to contact us to discuss our offers! 💬<br />
                <button onclick="document.getElementById('popupMessage').style.display='none'">Close</button>
            `;

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

    document.getElementById('checkPagespeed').addEventListener('click', function (event) {
        event.preventDefault();

        const url = document.getElementById('shopUrl').value;
        if (!url) {
            alert("Please enter a URL.");
            return;
        }

        const loadingMessage = document.getElementById('loadingMessage');
        loadingMessage.style.display = "block";

        fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=AIzaSyATCd63P4Z8eksy2jX5TCgaKE9bnFziNOk`)
            .then(response => response.json())
            .then(data => {
                loadingMessage.style.display = "none";

                if (!data.lighthouseResult) {
                    document.getElementById('pageSpeedData').innerHTML = `<p style="color: red;">⚠️ Error: No PageSpeed data available. Please check the URL.</p>`;
                    return;
                }

                const audits = data.lighthouseResult.audits;
                const categories = data.lighthouseResult.categories;

                let detailedDataHtml = `🌐 <strong>Website Analysis:</strong> ${escapeHTML(url)}<br><br>`;

                detailedDataHtml += `<h3>📊 Performance Rating:</h3>`;
                for (const categoryKey in categories) {
                    const category = categories[categoryKey];
                    detailedDataHtml += `
                        <p>✅ <strong>${escapeHTML(category.title)}:</strong> ${category.score * 100}%</p>`;
                }

                detailedDataHtml += `<h3>⏱️ Key Metrics:</h3>`;
                const metricKeys = ['first-contentful-paint', 'largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time', 'interactive'];
                metricKeys.forEach(key => {
                    if (audits[key]) {
                        detailedDataHtml += `<p>⚡ <strong>${escapeHTML(audits[key].title)}:</strong> ${escapeHTML(audits[key].displayValue || 'No Data')}</p>`;
                    }
                });

                detailedDataHtml += `<h3>💡 Optimization Suggestions:</h3><ul>`;
                const improvementKeys = ['uses-optimized-images', 'uses-text-compression', 'unused-css-rules', 'render-blocking-resources'];
                improvementKeys.forEach(key => {
                    if (audits[key]) {
                        detailedDataHtml += `<li>🛠️ <strong>${escapeHTML(audits[key].title)}:</strong> ${escapeHTML(audits[key].displayValue || 'No Data')}</li>`;
                    }
                });
                detailedDataHtml += `</ul>`;

                // Additional data display
                detailedDataHtml += `<h3>📈 Other Metrics:</h3>`;
                const otherMetrics = ['speed-index', 'time-to-interactive', 'first-meaningful-paint'];
                otherMetrics.forEach(key => {
                    if (audits[key]) {
                        detailedDataHtml += `<p>📊 <strong>${escapeHTML(audits[key].title)}:</strong> ${escapeHTML(audits[key].displayValue || 'No Data')}</p>`;
                    }
                });

                document.getElementById('pageSpeedData').innerHTML = detailedDataHtml;
                document.getElementById('pagespeedResult').style.display = 'block';
            })
            .catch(error => {
                loadingMessage.style.display = "none";
                console.error('Error:', error);
                alert("An error occurred. Please try again later.");
            });
    });
});
