// GET JSON 

function sendRequest(requestURL) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', requestURL, false);
    xhr.send();
    
    return JSON.parse(xhr.responseText);
}

let randomGeneratorData_table_count = sendRequest('https://vrokkis.github.io/generationV/generators/data/table_count.json');
let randomGeneratorData_table_names = sendRequest('https://vrokkis.github.io/generationV/generators/data/table_names.json');

console.log("TEST: Data_table_count - " + randomGeneratorData_table_count[0]["TABLE_COUNT"]);
console.log("TEST: Data_table_names - " + randomGeneratorData_table_names);

// RANDOM NUMBER

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

let random_number = getRandomInt(0, randomGeneratorData_table_count[0]["TABLE_COUNT"]);

function randomGenerator() {
    window.location.href = './generators/' + randomGeneratorData_table_names[random_number]["TABLE_NAME"] + '.html';
}