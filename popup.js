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

document.getElementById("setProxy").addEventListener("click", () => {
    const proxyType = document.getElementById("proxyType").value;
    const proxyHost = document.getElementById("proxyHost").value;
    const proxyPort = document.getElementById("proxyPort").value;

    if (!proxyHost || !proxyPort) {
        alert("Por favor, ingresa el host y el puerto del proxy.");
        return;
    }

    chrome.runtime.sendMessage({
        type: "setProxy",
        enabled: true,
        proxyType: proxyType,
        proxyHost: proxyHost,
        proxyPort: proxyPort
    }, response => {
        if (response && response.success) {
            alert("Proxy configurado correctamente.");
        } else {
            alert("Error al configurar el proxy.");
        }
    });
});

document.getElementById("disableProxy").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "setProxy", enabled: false }, response => {
        if (response && response.success) {
            alert("Proxy desactivado.");
        } else {
            alert("Error al desactivar el proxy.");
        }
    });
});
