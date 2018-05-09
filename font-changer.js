function getAncestors(element) {
    let elements = [element];

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

(function() {
    document.addEventListener('click', function(e) {
        const target = e.target;
        applyStyle(target.parentNode);
    }, false);

    console.log("looks like it's loaded now");

})();
