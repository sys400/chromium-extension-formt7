function getRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        let headers = details.requestHeaders;
        headers.push({ name: "User-Agent", value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36" });
        return { requestHeaders: headers };
    },
    { urls: ["<all_urls>"] },
    ["blocking", "requestHeaders"]
);

chrome.cookies.set({
    url: "https://www.google.com",
    name: getRandomString(8), // Nombre de cookie aleatorio
    value: getRandomString(16), // Valor de cookie aleatorio
    expirationDate: Math.floor(Date.now() / 1000) + 3600
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "setProxy") {
        chrome.proxy.settings.set(
            {
                value: {
                    mode: request.enabled ? "fixed_servers" : "direct",
                    rules: request.enabled ? {
                        singleProxy: {
                            scheme: request.proxyType,
                            host: request.proxyHost,
                            port: parseInt(request.proxyPort)
                        }
                    } : {}
                },
                scope: "regular"
            },
            function () {
                console.log("Proxy actualizado");
                sendResponse({ success: true });
            }
        );
        return true;
    }
});
