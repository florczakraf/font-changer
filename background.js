function startSelection(port) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            command: "startSelection",
        });
        console.log('selection requested');
    });
}

chrome.browserAction.onClicked.addListener(startSelection);
console.log('bg loaded');
