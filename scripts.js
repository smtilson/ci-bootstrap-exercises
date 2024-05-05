function showElement(status, element) {
    if (status.value === "womp womp") {
        revealElement(element);
    }
}

function revealElement(element) {
    element.classList.remove("no-display")
}

function test(){
    let status = document.getElementById("status")
    let element = document.getElementById("target-element")
    showElement(status, element)
}