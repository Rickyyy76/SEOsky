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
    const checkPagespeedButton = document.getElementById('checkPagespeed');
    const checkSeoDataButton = document.getElementById('checkSeoData');
    const seoDataElement = document.getElementById('seoData');
    const seoLoadingMessage = document.getElementById('seoLoadingMessage');

    // Function to escape HTML
    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, function (match) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            }[match];
        });
    }

    // Calculate button event listener
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
            popupMessage.textContent = `🎉 Your calculation is complete! 🚀\nEstimated Cost: $${totalCost.toFixed(2)}\nFeel free to contact us to discuss our offers! 💬`;

            detailsElement.textContent = `Calculation Breakdown:
                Package Cost: $${packageCost}
                Number of Keywords: ${numKeywords}
                Additional Cost for Keywords: $${additionalCost}
                Industry Multiplier: ${industryMultiplier}
                Ranking Position Multiplier: ${rankingMultiplier}
                Local SEO Cost: $${localSeoCost}
                Technical SEO Cost: $${technicalSeoCost}
                Competitor Analysis Cost: $${competitorAnalysisCost}
                Total Estimated Cost: $${totalCost.toFixed(2)}`;
        });
    }

    // Check PageSpeed event listener
    if (checkPagespeedButton) {
        checkPagespeedButton.addEventListener('click', function (event) {
            event.preventDefault();

            const url = document.getElementById('shopUrl').value;
            if (!url) {
                alert("Please enter a URL.");
                return;
            }

            const loadingMessage = document.getElementById('loadingMessage');
            loadingMessage.style.display = "block";

            // Fetch PageSpeed data
            fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=AIzaSyATCd63P4Z8eksy2jX5TCgaKE9bnFziNOk`)
                .then(response => response.json())
                .then(data => {
                    loadingMessage.style.display = "none";

                    if (!data.lighthouseResult) {
                        document.getElementById('pageSpeedData').textContent = "⚠️ Error: No PageSpeed data available. Please check the URL.";
                        return;
                    }

                    const audits = data.lighthouseResult.audits;
                    const categories = data.lighthouseResult.categories;

                    let detailedDataHtml = `Website Analysis: ${escapeHTML(url)}\nPerformance Rating: `;
                    for (const categoryKey in categories) {
                        const category = categories[categoryKey];
                        detailedDataHtml += `${escapeHTML(category.title)}: ${category.score * 100}% `;
                    }

                    detailedDataHtml += "\nKey Metrics: ";
                    const metricKeys = ['first-contentful-paint', 'largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time', 'interactive'];
                    metricKeys.forEach(key => {
                        if (audits[key]) {
                            detailedDataHtml += `${escapeHTML(audits[key].title)}: ${escapeHTML(audits[key].displayValue || 'No Data')} `;
                        }
                    });

                    document.getElementById('pageSpeedData').textContent = detailedDataHtml;
                    document.getElementById('pagespeedResult').style.display = 'block';
                })
                .catch(error => {
                    loadingMessage.style.display = "none";
                    console.error('Error:', error);
                    alert("An error occurred. Please try again later.");
                });
        });
    }

    // SEO Data Checker event listener
    if (checkSeoDataButton) {
        checkSeoDataButton.addEventListener('click', function (event) {
            event.preventDefault();

            const seoUrl = document.getElementById('urlInput').value;
            if (!seoUrl) {
                alert("Please enter a URL.");
                return;
            }

            seoLoadingMessage.style.display = "block";

            const title = document.querySelector('title') ? document.querySelector('title').textContent : 'No Title';
            const metaDescription = document.querySelector('meta[name="description"]') ? document.querySelector('meta[name="description"]').getAttribute('content') : 'No Meta Description';
            const metaKeywords = document.querySelector('meta[name="keywords"]') ? document.querySelector('meta[name="keywords"]').getAttribute('content') : 'No Meta Keywords';
            const h1Tags = Array.from(document.querySelectorAll('h1')).map(h1 => h1.textContent).join(', ') || 'No H1 Tags';

            let seoScore = 0;
            if (title.length > 0) seoScore += 20;
            if (metaDescription.length > 0) seoScore += 20;
            if (metaKeywords.length > 0) seoScore += 20;
            if (h1Tags.length > 0) seoScore += 20;
            if (document.querySelector('meta[name="robots"]')) seoScore += 20;

            seoScore = Math.min(seoScore, 100);

            const seoDetailedHtml = `
                SEO Data for: ${escapeHTML(seoUrl)}
                SEO Score: ${seoScore}%
                Title: ${escapeHTML(title)}
                Meta Description: ${escapeHTML(metaDescription)}
                Meta Keywords: ${escapeHTML(metaKeywords)}
                H1 Tags: ${escapeHTML(h1Tags)}
                Content Optimization:
                ${title.length > 0 ? 'Title Tag is present' : 'No Title Tag'}
                ${metaDescription.length > 0 ? 'Meta Description is present' : 'No Meta Description'}
                ${metaKeywords.length > 0 ? 'Meta Keywords are present' : 'No Meta Keywords'}
                ${h1Tags.length > 0 ? 'H1 Tag is used correctly' : 'No H1 Tag'}
                Technical SEO:
                ${document.querySelector('meta[name="robots"]') ? 'Meta Robots tag is present' : 'No Meta Robots tag'}
                ${document.querySelector('link[rel="canonical"]') ? 'Canonical Link is present' : 'No Canonical Link'}
                Usability & Performance:
                ${window.innerWidth < 768 ? 'Mobile-Friendly' : 'Not Mobile-Friendly'}
                ${document.querySelector('img[alt=""]') ? 'Some images are missing alt attributes' : 'All images have alt attributes'}
            `;

            seoLoadingMessage.style.display = "none";
            seoDataElement.textContent = seoDetailedHtml;
            seoDataElement.style.display = 'block';
        });
    }
});
