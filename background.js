function startSelection() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            command: "startSelection",
        });
    });
}

chrome.browserAction.onClicked.addListener(startSelection);
