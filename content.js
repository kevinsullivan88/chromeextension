/*
What goes in this file:

- DOM Manipulation: content.js is injected into web pages and has access to the DOM of the page it's injected into. It's used for tasks like DOM manipulation and interaction with page elements.
- Page-Specific Actions: It's responsible for actions specific to the current web page, such as extracting text content, modifying page elements, or injecting additional scripts or styles.
- Isolation from the Browser Environment: content.js runs in the context of a specific web page and is isolated from the extension's global environment. This isolation helps prevent conflicts and ensures that changes made by the content script only affect the current web page.

In summary, content.js typically handles tasks related to the current web page, such as DOM manipulation, 
interaction with page elements, and page-specific actions. It operates within the context of individual web pages and is isolated from the extension's global environment.
*/

// 1. Send a message to the service worker requesting the user's data
chrome.runtime.sendMessage({action: 'get-user-data'}, (response) => {
    // 3. Got an asynchronous response with the data from the service worker
    console.log('received user data', response);
  });



  // NOTE - removed this since it's the same as the code below that we had in background
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     // Check if the message contains the HTML content
//     if (message.htmlContent) {
//         const pageHtml = message.htmlContent;
//         // Now you can use the HTML content for further processing
//         console.log("HTML content of the current page:", pageHtml);
//     }
// });



// Send the text content to the background script
//chrome.runtime.sendMessage({ textContent: pageText });