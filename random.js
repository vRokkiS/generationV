
// GENERATOR TYPE

let generator_type_temp = document.location.pathname.split("/")[3];
let generator_type = generator_type_temp.split(".")[0];

console.log("это генератор - " + generator_type);

console.log("../data/" + generator_type + ".json");

const requestURL = "../generators/data/" + generator_type + ".json";

const request = new XMLHttpRequest();

request.open('GET', requestURL);

request.onload = () => {
  console.log(request.response);
}

request.send();
// request.responseType = 'json';

// console.log(request.response);
// let Data = JSON.parse(request.response);

// console.log(Data);

// $(document).ready(function(){
//   $.getJSON("randomanime.json", function(data){
//       console.log(data); // Prints: Harry
//       console.log(data[0]); // Prints: 14
//   }).fail(function(){
//       console.log("An error has occurred.");
//   });
// });

// GET JSON FILE

// function getFileSity(fileName){
//   let  request = new XMLHttpRequest();
//   request.open('GET', fileName, false);
//   // request.send(null);
//   return  JSON.parse(request.responseText);
// }

// let sityData = getFileSity('https://vrokkis.github.io/generationV/generators/data/' + generator_type + '.json');

// randomanime



// GET RANDOM VALUE 

// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min)) + min;
// }

// // SYSTEM INFO

// let random_number = getRandomInt(0, Object.keys(sityData).length);
// let json_info = sityData[random_number];

// console.log(Object.keys(sityData).length + ' объектов в бд');
// console.log('случайное число ' + random_number);

// // UPDATE FUNCTION

// function updateInfo() {
//   let random_number = getRandomInt(0, Object.keys(sityData).length);
//   let json_info = sityData[random_number];
//   document.getElementById('image').src = '../media/random/' + generator_type + '/' + `${json_info["ID"]}` + '.jpg';
//   document.getElementById('title').textContent = `${json_info["Title"]}`;
//   document.getElementById('title_description').textContent  = `${json_info["Title_desc"]}`;
//   document.getElementById('description').textContent = `${json_info["Description"]}`;
// }

// updateInfo()