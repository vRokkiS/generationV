const mysql = require("mysql");
const fs = require("fs");
const http = require("http");
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

// DATABASE CONFIG

const conn = mysql.createConnection( {
    host: "localhost",
    user: "root",
    database: "randomloopmin",
    password: ""
});

conn.connect( err => {
    if (err) {
        console.log(err);
        return err;
    }   
    else {
        console.log('database ----- open');
    }
});

// DATABASE QUERY

let table_count_query = "SELECT COUNT(*) AS TABLE_COUNT FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'RANDOMLOOPMIN'";
let table_names_query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'RANDOMLOOPMIN'";

// TABLE COUNT VAR 

conn.query(table_count_query, (err, result) =>{
    fs.writeFileSync('./generators/data/table_count.json', JSON.stringify(result), function (err) {
        if (err) throw err;
        console.log('table count is saved');
    })
});

let table_count_info = fs.readFileSync('./generators/data/table_count.json', function(err, data) {
        if (err) throw err;
})

let table_count_step = JSON.parse(table_count_info);
let table_count = table_count_step[0]['TABLE_COUNT'];
console.log(table_count + " IS NUMBER OF TABLES");

// TABLE NAME ARR

conn.query(table_names_query, (err, result) =>{
    fs.writeFileSync('./generators/data/table_names.json', JSON.stringify(result), function (err) {
        if (err) throw err;
        console.log('table names is saved');
    })
});

let table_names_info = fs.readFileSync('./generators/data/table_names.json', function(err, data) {
        if (err) throw err;
        
})

let table_names = JSON.parse(table_names_info);

// TABLE NAME CYCLE

for (var i = 0; i < table_count; i++) {

    let query = 'SELECT * FROM `' + table_names[i]["TABLE_NAME"] + '`';
    let temp_table_name = table_names[i]["TABLE_NAME"];
    JSONDB(query, temp_table_name);

}

function JSONDB(query, title) {

    conn.query(query, (err, result, field) =>{

        fs.writeFile("./generators/data/" + title + ".json", JSON.stringify(result), function (err) {
            if (err) throw err;
            console.log(title + ' is saved');
        })
    
        // console.log(field);
    })

}

// DB CLOSED

conn.end( err => {

    if (err) {
        console.log(err);
        return err;
    }   
    else {
        console.log('database ----- closed');
    }

})
