// this will have functions for the code that will dynamically update index.html

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updatePopupUI") {
        const welcomeMessage = document.createElement("Div")
        welcomeMessage.innerHTML = "Welcome to the extension!";
    }
});