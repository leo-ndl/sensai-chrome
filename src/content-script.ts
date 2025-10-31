// content-script.ts

// Listen for messages from background or popup
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "GET_SELECTED_TEXT") {
    const selection = window.getSelection()?.toString() || "";
    sendResponse({ selectedText: selection });
  }
});
