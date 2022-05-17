
// GENERATOR TYPE

let generator_type_temp = document.location.pathname.split("/")[3];
let generator_type = generator_type_temp.split(".")[0];

console.log("это генератор - " + generator_type);

// GET JSON
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const requestURL = "../generators/data/" + generator_type + ".json";

function sendRequest() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', requestURL);
    xhr.responseType = 'json';
    xhr.send();
    
    let a = xhr.onload = () => {
      console.log("1. " + xhr.response);
      return xhr.response;
    }

    console.log("2. " + a);
    console.log("3. " + xhr.response);
}

// Object.keys(data). length

let data = sendRequest();

let random_number = getRandomInt(0, 10);

    let json_info = data[random_number];
    document.getElementById('image').src = '../media/random/' + generator_type + '/' + `${json_info["ID"]}` + '.jpg';
    document.getElementById('title').textContent = `${json_info["Title"]}`;
    document.getElementById('title_description').textContent  = `${json_info["Title_desc"]}`;
    document.getElementById('description').textContent = `${json_info["Description"]}`;

// let data = sendRequest();

// xhr.onload = () => {
//   console.log(xhr.responseText);
// }

// GET RANDOM VALUE 



// SYSTEM INFO


// let json_info = data[random_number];

// console.log(Object.keys(data).length + ' объектов в бд');
// console.log('случайное число ' + random_number);

// UPDATE FUNCTION

// function updateInfo() {
  
// }

// updateInfo()