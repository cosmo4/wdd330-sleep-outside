const container = document.getElementById("alert-container");
const alertSection = document.createElement("section");
alertSection.className = "alert-list";

fetch("../json/alerts.json")
    .then((response) => response.json())
    .then((jsonData) => {
        jsonData.alerts.forEach((alertData) => {
            const alertP = document.createElement("p");

            alertP.textContent = alertData.message;

            alertP.style.backgroundColor = alertData.background;
            alertP.style.color = alertData.color;

            alertSection.appendChild(alertP);

            setTimeout(() => {
                alertSection.removeChild(alertP);
              }, 8000);
        });

        const mainContent = document.querySelector('main');

        mainContent.prepend(alertSection);
    })
    .catch((error) => {
        console.error("Error loading JSON data:", error)
    })