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

function sendRequest(requestURL) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', requestURL, false);
    xhr.send();
    
    return JSON.parse(xhr.responseText);
}

let data = sendRequest("../generators/data/" + generator_type + ".json");

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
let generator_count_temp = sendRequest("../generators/data/table_count.json");
let generator_count = generator_count_temp[0]["TABLE_COUNT"];

let gid = generator_info.find(item => {
  if (item.PureTitle === generator_type) {
    return true;
  }
})

document.getElementById('header_generator_chorus').textContent  = gid["Name"] + ": " + gid["Chorus"];

random();