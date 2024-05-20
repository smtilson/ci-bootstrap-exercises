const API_KEY = 'IGh0Vabt82KQAx0XF1bTQHfY2vs';
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

// e here represents the event
//document.getElementById("status").addEventListener("click", e => getStatus(e));

$('#status').click(getStatus);

$('#submit').click(postForm);

async function getStatus() {
    // follow GET instructions from API instructions
    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    const data = await response.json();

    if (response.ok) {
        displayStatus(data);
    } else {
        displayException(data);
        throw new Error(data.error);
    }
}

function displayStatus(data) {
    let modalHeader = $('#resultsModalTitle');
    let modalContent = $('#resultsContent');
    modalHeader.text("API Key Status");
    modalContent.html(`<div>Your key is valid until</div><div class="key-status">${data.expiry}</div>`);
    resultsModal.show();
}

function processOptions(form) {
    let options = [];
    for(let entry of form.entries()) {
        //console.log(entry);
        if (entry[0] === 'options') {
            options.push(entry[1]);
        }
    }
    console.log(options);
    form.delete("options");
    form.append("options", options.join());
    return form
}

async function postForm() {
    let form = processOptions(new FormData($('#checksform')[0]));
    for (let e of form.entries()) {
        console.log(e);
    }
    const response =  await fetch(API_URL, {
                        method: "POST",
                        headers: {
                                    "Authorization": API_KEY,
                                 },
                        body: form
                        })
    const data = await response.json();
    if (response.ok) {
        displayErrors(data);   
    } else {
        displayException(data);
        throw new Error(data.error);
    }
}

function displayException(data) {
    let heading = `An Exception occurred.`;
    let results = `<div class="exception">The API returned status code ${data.status_code}</div>`
    results += `<div class="error-num">Error Number: ${data.error_no}.</div>`;
    results += `<div class="error-text">Error text: ${data.error}.</div>`;
    let modalHeader = $('#resultsModalTitle');
    let modalContent = $('#resultsContent');
    modalHeader.text(heading);
    modalContent.html(results);
    resultsModal.show();
}


function displayErrors(data) {
    let heading = `JSHint results for ${data.file}.`;
    let results;
    if (data.total_errors===0) {
        results = `<div class="no_errors">No Errors reported!</div>`;
    } else {
        results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span></div>`;
        for(let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span>, `;
            results += `column <span class="column">${error.col}</span></div>`;
            results += `<div class="error">${error.error}</div>`
        }
    }
    let modalHeader = $('#resultsModalTitle');
    let modalContent = $('#resultsContent');
    modalHeader.text(heading);
    modalContent.html(results);
    resultsModal.show();
}

