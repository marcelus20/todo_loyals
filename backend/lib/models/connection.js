const mysql = require('mysql');

var con     = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'loyals'
  });

  con.connect(err=>console.log(err?err:"Connected!"))

  module.exports = con;