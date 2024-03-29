const mysql = require("mysql");
const fs = require("fs");
const url = require("url");

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
let generators_list = "SELECT * FROM generators_list";

// TABLE_COUNT CREATE & READ JSON 

conn.query(table_count_query, (err, result) =>{
    fs.writeFileSync('../generators/data/table_count.json', JSON.stringify(result), function (err) {
        if (err) throw err;
        console.log('table count is saved');
    })
});

let table_count_info = fs.readFileSync('../generators/data/table_count.json', function(err, data) {
        if (err) throw err;
})

let table_count_step = JSON.parse(table_count_info);
let table_count = table_count_step[0]['TABLE_COUNT'];
console.log(table_count + " IS NUMBER OF TABLES");

// TABLE_NAMES CREATE & READ JSON

conn.query(table_names_query, (err, result) =>{
    fs.writeFileSync('../generators/data/table_names.json', JSON.stringify(result), function (err) {
        if (err) throw err;
        console.log('table names is saved');
    })
});

let table_names_info = fs.readFileSync('../generators/data/table_names.json', function(err, data) {
        if (err) throw err;
        
})

let table_names = JSON.parse(table_names_info);
console.log(table_names + " ARE TABLES");

// CREATE GENERATORS JSON CYCLE

for (var i = 0; i < table_count; i++) {
    let query = 'SELECT * FROM `' + table_names[i]["TABLE_NAME"] + '`';
    let temp_table_name = table_names[i]["TABLE_NAME"];
    JSONDB(query, temp_table_name);
}

function JSONDB(query, title) {
    conn.query(query, (err, result, field) =>{
        fs.writeFile("../generators/data/" + title + ".json", JSON.stringify(result), function (err) {
            if (err) throw err;
            console.log(title + ' is saved');
        })
    })
}

// GENERATOR_LIST CREATE JSON

conn.query(generators_list, (err, result) => {
    fs.writeFileSync('../generators/data/generators_list.json', JSON.stringify(result), function (err) {
        if (err) throw err;
    })
});

// CREATE HTML GENERATORS PAGES

const content = fs.readFileSync('../generators/data/page.txt');

for (i = 0; i < table_count; i++) {
    if (table_names[i]["TABLE_NAME"] != "generators_list") {
    fs.writeFileSync('../generators/' + table_names[i]["TABLE_NAME"] + '.html', content, function (err) {})
    }
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
