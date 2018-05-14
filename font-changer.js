const MAX_CLASS_LIST_LENGTH = 3;

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
    popup.classList.add("font-changer-popup");

    const elementsList = document.createElement("ul");
    elementsList.classList.add("font-changer-list");

    for (const e of clickedElements) {
        const listElement = document.createElement("li");
        listElement.classList.add("font-changer-list-element");
        listElement.innerText = e.tagName + " ";
        const elementClasses = document.createElement("div");
        elementClasses.classList.add("font-changer-element-classes");

        elementClasses.innerText = Array.from(e.classList);

        listElement.appendChild(elementClasses);
        elementsList.appendChild(listElement);
    }

    popup.appendChild(elementsList);
    document.body.appendChild(popup);
}



function applyStyle(element) {
    element.style.textAlign = 'justify';
    element.style.fontWeight = 'bold';
}

function clickHandler(event) {
    const target = event.target;
    const clickedElements = [target, ... getAncestors(target)];
    applyStyle(target);  // TODO
    stopSelection();

    spawnPopup(clickedElements);
}

function startSelection() {
    document.addEventListener('click', clickHandler, false);
}

function stopSelection() {
    document.removeEventListener('click', clickHandler);
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
            position: absolute;
            width: 600px;
            height: 400px;
            left: 5px;
            top: 5px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
            background-color: #BadBed;
            font-family: sans-serif;
        }

        .font-changer-list {
            overflow-y: scroll;
            width: 100%;
            height: 90%;
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
    console.log(`received message: ${JSON.stringify(message)}`);

    if (message.command === "startSelection") {
        console.log('starting selection')
        startSelection();
    }
    else {
        console.log('unknown message');
    }
});
setStyles();
