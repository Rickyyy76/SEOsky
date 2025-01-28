// Firebase SDK importieren
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBenK4-6j2IPbHyUsZNbK9Ef5ACPLezSNY",
  authDomain: "seosky-19263.firebaseapp.com",
  projectId: "seosky-19263",
  storageBucket: "seosky-19263.firebasestorage.app",
  messagingSenderId: "14660666712",
  appId: "1:14660666712:web:3fc7a264e12bd0cd08512d",
  measurementId: "G-YC0ENCYZCT",
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Event-Listener für das Berechnungsformular
document.getElementById('calculateButton').addEventListener('click', function (event) {
    event.preventDefault();

    // Eingabewerte abrufen
    const packageCost = parseFloat(document.getElementById('package').value);
    let numKeywords = parseInt(document.getElementById('numKeywords').value) || 0;
    const industryMultiplier = parseFloat(document.getElementById('industry').value);
    const rankingMultiplier = parseFloat(document.getElementById('rankingPosition').value);
    const userWebsite = document.getElementById('userWebsite').value; // Website des Benutzers

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
    document.getElementById('estimatedCost').textContent = `$${totalCost.toFixed(2)}`;

    // Anzeige des Anfrageformulars und des Buttons zum Senden der Anfrage
    document.getElementById('result').style.display = "block"; // Preis anzeigen
    document.getElementById('popupMessage').style.display = "block"; // Pop-up anzeigen

    // Pop-up schließen
    document.getElementById('closePopup').addEventListener('click', function() {
        document.getElementById('popupMessage').style.display = "none"; // Pop-up ausblenden
    });

    // Button "Anfrage senden" zum Versenden der Daten
    document.getElementById('contactFormDetails').addEventListener('submit', async function (e) {
        e.preventDefault();

        // Eingabewerte des Anfrageformulars abrufen
        const contactName = document.getElementById('name').value;
        const contactEmail = document.getElementById('email').value;
        const contactMessage = document.getElementById('message').value;

        // Daten an Firebase senden
        try {
            const docRef = await addDoc(collection(db, "requests"), {
                contactName: contactName,
                contactEmail: contactEmail,
                contactMessage: contactMessage,
                userWebsite: userWebsite,
                packageCost: packageCost,
                numKeywords: numKeywords,
                industryMultiplier: industryMultiplier,
                rankingMultiplier: rankingMultiplier,
                totalCost: totalCost.toFixed(2),
                timestamp: new Date(),
            });
            console.log("Daten erfolgreich gespeichert mit ID: ", docRef.id);
            alert("Your request has been successfully submitted!");
        } catch (error) {
            console.error("Error saving data: ", error);
            alert("There was an error submitting your request. Please try again.");
        }
    });
});
