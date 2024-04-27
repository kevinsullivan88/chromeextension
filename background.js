// Listener for when the extension is installed or updated
chrome.runtime.onInstalled.addListener((details) => {
    console.log("Extension successfully installed!", details.reason);
    // Further initialization code can go here
});

// Listener to trigger content script to collect page text when the extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
    // Ensures the content script is injected into the tab
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['content.js']
    }, () => {
        if (chrome.runtime.lastError) {
            console.error('Script injection failed: ', chrome.runtime.lastError.message);
        }
    });
});

//listener to receive text from content script and send it to OpenAI
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "get-page-text") {
        const pageText = message.text;

        //environment variables work for local devving but need something more secure here
        const apiKey = process.env.OPENAI_API_KEY; 

        //send the text content to the OpenAI API endpoint
        fetch('https://api.openai.com/v1/engines/davinci/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({ prompt: pageText, max_tokens: 150 })
        })
        .then(response => response.json())
        .then(data => {
            // Send the summary back to the popup UI
            chrome.runtime.sendMessage({action: "updatePopupUI", summary: data.choices[0].text});
        })
        .catch(error => {
            console.error("Error with OpenAI API:", error);
        });

        //keep the message channel open for asynchronous response
        return true;
    }
});
