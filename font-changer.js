const POPUP_CLASS = "font-changer-popup";

let clickedElements = [];

function getAncestors(element) {
    let elements = [];

    while (element.parentElement) {
        elements.push(element.parentElement);
        element = element.parentElement;
    }

    return elements;
}

function spawnPopup(clickedElements) {
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

    spawnPopup(clickedElements);

    return false;
}

function startSelection() {
    closePopup();
    document.addEventListener("click", clickHandler);
}

function stopSelection() {
    document.removeEventListener("click", clickHandler);
}

function setStyles() {
    let styles = document.createElement("style");
    const rawStyles = `
        .font-changer-popup * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .font-changer-popup {
            position: fixed;
            width: 600px;
            max-height: 400px;
            left: 5px;
            top: 5px;
            border-top: 1px solid #e7e7e7;
            box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
            background-color: white;
            font-family: sans-serif;
            z-index: 9999;
        }

        .font-changer-list {
            overflow-y: scroll;
            width: 100%;
            max-height: 300px;
            list-style: none;

        }

        .font-changer-list-element {
            border-bottom: 1px solid #e7e7e7;
            background-color: white;
            width: 100%;
            padding: 5px;
            cursor: pointer;
            display: flex;
        }

        .font-changer-list-element:hover {
            background-color: #bababa;
        }

        .font-changer-element-classes {
            font-size: 70%;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-left: 10px;
        }
    `;
    styles.innerHTML = rawStyles;
    document.body.appendChild(styles);
}

chrome.runtime.onMessage.addListener((message) => {
    if (message.command === "startSelection") {
        startSelection();
    }
    else {
        console.error(`Unknown message: ${JSON.stringify(message)}`);
    }
});
setStyles();
