/// <reference types="chrome"/>

chrome.runtime.onInstalled.addListener(()=>{
    chrome.contextMenus.create({
        id: "explain-code",
        title: "Explain Code with SensAi",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(async (info: chrome.contextMenus.OnClickData)=>{
    if (info.selectionText) {
        await chrome.storage.local.set({ selectedText: info.selectionText }, () => {
      // Open extension page in new tab
      chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
    });

    }
})
