const mysql = require('mysql');

var con     = mysql.createConnection({
    host: 'db',
    port: 7778,
    user: 'loyal_user',
    password: '87654321',
    database: 'loyals'
  });

  con.connect(err=>console.log(err?err:"Connected!"))

  module.exports = con;