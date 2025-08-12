function loadScript(component, elementId) {
    fetch(component)
        .then((Response) => Response.text())
        .then((data) => {
            document.getElementById(elementId).innerHTML = data;
        });
}
