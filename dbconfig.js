const app = require("./app");
const http = require("http");
const fs = require("fs");
const url = require("url");

http.createServer(function(request, response){

    console.log(`Запрошенный адрес: ${request.url}`);

    let filePath = request.url.substr(1);

    fs.access(filePath, fs.constants.R_OK, err => {
        if(err){
            response.statusCode = 404;
            response.end("Resourse not found!");
        }
        else{
            fs.createReadStream(filePath).pipe(response);
        }
      });

}).listen(3000, function(){
    console.log("Server started at 3000");
});