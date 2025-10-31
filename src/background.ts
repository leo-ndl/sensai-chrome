/// <reference types="chrome"/>

chrome.runtime.onInstalled.addListener(()=>{
    chrome.contextMenus.create({
        id: "explain-code",
        title: "Explain This",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(async (info: chrome.contextMenus.OnClickData)=>{
    if (info.selectionText) {
        await chrome.storage.local.set({ selectedText: info.selectionText });
        await chrome.action.openPopup();

    }
})
