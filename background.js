function startSelection(port) {
    browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "startSelection",
        });
        console.log('selection requested');
    });
}

browser.browserAction.onClicked.addListener(startSelection);
console.log('bg loaded');
