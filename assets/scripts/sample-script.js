document.addEventListener('DOMContentLoaded', function() {
    console.log("loading event listener");
    let status = document.getElementById('status');
    status.addEventListener('keydown', function (event) {
        console.log("listener triggered");
        if (status.value === '') {
            return;
        } else if (event.key === 'Enter') {
            console.log("enter key pressed")
            test();
        }
    });
})

function showElement(status, element) {
    if (status.value === "womp womp") {
        revealElement(element);
    }
}

function revealElement(element) {
    element.classList.remove("no-display");
}

function test(){
    console.log("test called");
    let status = document.getElementById("status");
    let element = document.getElementById("target-element");
    showElement(status, element);
}