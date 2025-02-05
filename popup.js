document.getElementById("startBtn").addEventListener("click", () => {
    let numWindows = parseInt(document.getElementById("windows").value);
    let outputDiv = document.getElementById("output");

    outputDiv.innerHTML = "Abriendo " + numWindows + " ventanas...<br>";

    for (let i = 0; i < numWindows; i++) {
        chrome.windows.create({
            url: `worker.html?hilo=${i}`,
            type: "popup",
            width: 400,
            height: 300
        }, (window) => {
            outputDiv.innerHTML += `Ventana ${i} abierta (ID: ${window.id})<br>`;
        });
    }
});
