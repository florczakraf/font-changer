function getAncestors(element) {
    let elements = [];

    while (element.parentNode) {
        elements.push(element.parentNode);
        element = element.parentNode;
    }

    return elements;
}

function applyStyle(element) {
    element.style.textAlign = 'justify';
    element.style.fontWeight = 'bold';
}

function clickHandler(event) {
    const target = event.target;
    applyStyle(target);  // TODO
    stopSelection();
}

function startSelection() {
    document.addEventListener('click', clickHandler, false);
}

function stopSelection() {
    document.removeEventListener('click', clickHandler);
}

browser.runtime.onMessage.addListener((message) => {
    console.log(`received message: ${JSON.stringify(message)}`);

    if (message.command === "startSelection") {
        console.log('starting selection')
        startSelection();
    }
    else {
        console.log('unknown message');
    }
});
