
// GET JSON FILE

function getFileSity(fileName){
    let  request = new XMLHttpRequest();
    request.open('GET', fileName, false);
    request.send(null);
    return  JSON.parse(request.responseText);
}
  
// JSON ANIME LIST
  
let sityData = getFileSity('http://animeoverdose/info/data/anime.json');
  
// JSON ANIME QUANTITY
  
let animeQuantity = getFileSity('http://animeoverdose/info/data/anime_quantity.json');
let animeQ = animeQuantity[0]["ID"];

console.log(sityData);
console.log("Rows " + Math.ceil(animeQ/6));
  
  const list = document.getElementById('list');
  const list_row = document.createElement("div");
  list_row.className = "cover_row";
  const list_item = document.createElement("div");
  list_item.className = "cover";
  list_item.innerHTML = '<a href="#"><img src="../media/images/1_0.jpg" alt="" id="anime_cover"></a><h2 id="anime_title">Семья шпиона</h2>';
  list_row.innerHTML = "hi";
  let list_row_quantity = 0;

  // sityData.forEach(function(item, i, arr) {
  //   const list_item = document.createElement("div");
  //   list_item.className = "cover";
  //   list_item.innerHTML = '<a href="#"><img src="../media/images/1_0.jpg" alt="" id="anime_cover"></a><h2 id="anime_title">Семья шпиона</h2>';
  //   list.appendChild(list_item);
  //   console.log("hi");
  // });

  let x = -1;

  for (i = 0; i < Math.ceil(animeQ/6); i++) {
    x++;
    const list = document.getElementById('list');
    const list_row = document.createElement("div");
    list_row.className = "cover_row";
    list.appendChild(list_row);
    console.log(x);
      for (a = 0; a < 6; a++) {
        x++
        const list_item = document.createElement("div");
        list_item.className = "cover";
        list_item.innerHTML = '<a href="' + "./titles/" + x + '.html"><img src="../media/images/' + x + '_0.jpg" alt="" id="anime_cover"></a><h2 id="anime_title">' + sityData[x-1]["Title"] + '</h2>';
        list_row.appendChild(list_item);
        console.log(x);
      }
  }