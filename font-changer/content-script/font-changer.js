const POPUP_CLASS = "font-changer-popup";

let clickedElements = [];

function getAncestors(element) {
    const elements = [];

    while (element.parentElement) {
        elements.push(element.parentElement);
        element = element.parentElement;
    }

    return elements;
}

function spawnPopup() {
    const popup = document.createElement("div");
    popup.classList.add(POPUP_CLASS);

    const elementsList = document.createElement("ul");
    elementsList.classList.add("font-changer-list");

    for (const [i, e] of clickedElements.entries()) {
        const listElement = document.createElement("li");
        listElement.classList.add("font-changer-list-element");
        listElement.innerText = e.tagName + " ";
        listElement.setAttribute("dom-reference", i);
        listElement.addEventListener("click", applyStyle);

        const elementClasses = document.createElement("div");
        elementClasses.classList.add("font-changer-element-classes");
        elementClasses.innerText = Array.from(e.classList);

        listElement.appendChild(elementClasses);
        elementsList.appendChild(listElement);
    }

    popup.appendChild(elementsList);
    document.body.appendChild(popup);
}

function closePopup() {
    try {
        document.getElementsByClassName(POPUP_CLASS)[0].remove();
    }
    catch (e) {
        // There's no popup when activiting for the first time
    }
}

function applyStyle() {
    const element = clickedElements[this.getAttribute("dom-reference")];
    element.style.textAlign = "justify";
    element.style.fontWeight = "bold";

    closePopup();
}

function clickHandler(event) {
    event.preventDefault();
    event.stopPropagation();

    const target = event.target;
    clickedElements = [target, ... getAncestors(target)];
    stopSelection();

    spawnPopup();

    return false;
}

function startSelection() {
    closePopup();
    document.addEventListener("click", clickHandler);
}

function stopSelection() {
    document.removeEventListener("click", clickHandler);
}

chrome.runtime.onMessage.addListener((message) => {
    if (message.command === "startSelection") {
        startSelection();
    }
    else {
        console.error(`Unknown message: ${JSON.stringify(message)}`);
    }
});

window.addEventListener("hashchange", closePopup);
window.addEventListener("beforeunload", closePopup);
