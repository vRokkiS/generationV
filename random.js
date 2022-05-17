// GENERATOR TYPE

let generator_type_temp = document.location.pathname.split("/")[3];
let generator_type = generator_type_temp.split(".")[0];

console.log("TEST: generator_type - " + generator_type);

// RANDOM NUMBER

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// GET JSON 

let requestURL = "../generators/data/" + generator_type + ".json";

function sendRequest(requestURL) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', requestURL, false);
    xhr.send();
    
    return JSON.parse(xhr.responseText);
}

let data = sendRequest();

// RANDOM

function random() {
  let random_number = getRandomInt(0, Object.keys(data).length);

  let json_info = data[random_number];
  document.getElementById('image').src = '../media/random/' + generator_type + '/' + `${json_info["ID"]}` + '.jpg';
  document.getElementById('title').textContent = `${json_info["Title"]}`;
  document.getElementById('title_description').textContent  = `${json_info["Title_desc"]}`;
  document.getElementById('description').textContent = `${json_info["Description"]}`;
}

let generator_info = sendRequest("../generators/data/generators_list.json");

document.getElementById('header_generator_chorus').textContent  = `${generator_info["Name"]}`;

random();