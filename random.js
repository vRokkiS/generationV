
// GENERATOR TYPE

let generator_type_temp = document.location.pathname.split("/")[3];
let generator_type = generator_type_temp.split(".")[0];

console.log("это генератор - " + generator_type);


// GET JSON
const requestURL = "../generators/data/" + generator_type + ".json";

function sendRequest() {
  
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = 'json';
    
    xhr.send();
    
    return;
}

sendRequest();

let data = sendRequest();

// xhr.onload = () => {
//   console.log(xhr.responseText);
// }

// GET RANDOM VALUE 

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// SYSTEM INFO

let random_number = getRandomInt(0, Object.keys(data).length);
let json_info = data[random_number];

console.log(Object.keys(data).length + ' объектов в бд');
console.log('случайное число ' + random_number);

// UPDATE FUNCTION

function updateInfo() {
  let random_number = getRandomInt(0, Object.keys(sityData).length);
  let json_info = data[random_number];
  document.getElementById('image').src = '../media/random/' + generator_type + '/' + `${json_info["ID"]}` + '.jpg';
  document.getElementById('title').textContent = `${json_info["Title"]}`;
  document.getElementById('title_description').textContent  = `${json_info["Title_desc"]}`;
  document.getElementById('description').textContent = `${json_info["Description"]}`;
}

// updateInfo()