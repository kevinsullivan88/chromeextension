// What goes in this file:

/*
- Message Handling: background.js is often used for managing extension-wide functionality, such as handling messages between different components of the extension.
- Extension Lifecycle: It's responsible for tasks like managing the extension's lifecycle (registration, installation, activation, etc.).
- Global State: It's a good place to store global state or variables that need to be accessed across different parts of the extension.
- Interactions with Browser APIs: background.js can interact with various browser APIs, such as storage APIs, tabs APIs, and alarms APIs.

In summary, background.js typically handles extension-wide functionality, communication between different components, and interactions with browser APIs.
*/

// first function that kicks off the process

chrome.runtime.onInstalled.addListener((details) => {
    // confirm installation is happening
    console.log("Extension installed.");

    // Sends a message to the popup.js file that will listen for "updatePopupUI"
    chrome.runtime.sendMessage({ action: "updatePopupUI" });
});

// writing a function that we can invoke when the extension is clicked
// which will send the HTTP post request and collect the summary

function contentSummarize(){
//get the page text
const pageText = document.body.innerText;

// use send message to send pageText to listener
chrome.runtime.sendMessage({textContent: pageText});
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check if the message contains the text content
    if (message.action === `get-user-data`) {
        const pageText = message.textContent;
        console.log("Text content of the current page:", pageText);
        // Send the text content to the API endpoint

        fetch('https://api.openai.com/v1/engines/davinci/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // pass the API key
                'Authorization': apiKey
            },

            // converting JSON to a string
            body: JSON.stringify({ text: pageText })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Response from API:", data);
            // TO-DO - inject this text into the popUp UI
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
});

// when the extension is clicked on a certain tab, invoke the summarize function
chrome.action.onClicked.addListener((tab) => {
    contentSummarize()

})





// Add an event listener for when the extension's icon is clicked in the toolbar.

/*

Reason for removing - we already have a function we want to use when the extension is clicked,
so we just want to invoke that.
Also when asking about "try", GPT said:
"However, upon closer inspection, it seems unnecessary to use a try-catch block in this context, as setting up an event listener like chrome.action.onClicked.addListener() 
is not likely to throw errors under normal circumstances."

try {

    
    chrome.action.onClicked.addListener((tab) => {
        // `tab` contains information about the current active tab

        // This function is executed in the context of the current active tab.
        chrome.scripting.executeScript({
            target: { tabId: tab.id }, // Specifies which tab to target with the script execution
            function: function() {
                // This function is injected and executed in the current tab
                // TODO - update this to actually run the function
                alert('Hello from your Chrome Extension!');
            }
        });
    });
} catch (error) {
    // Catches and logs any errors that occur during the event listener setup or script execution
    console.error('Error in background script:', error);
}
*/
