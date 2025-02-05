window.onload = function() {
    // Obtener el número de hilo desde la URL
    let urlParams = new URLSearchParams(window.location.search);
    let threadId = urlParams.get("hilo");

    let infoElement = document.getElementById("info");
    infoElement.innerHTML = `Ejecutando hilo ${threadId}...`;

    // Simulación de un trabajo pesado
    setTimeout(() => {
        infoElement.innerHTML = `Hilo ${threadId} completado ✅`;
        document
    }, Math.random() * 5000 + 1000);
};