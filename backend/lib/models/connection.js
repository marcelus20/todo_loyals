const mysql = require('mysql');



var con     = mysql.createConnection({
    host: 'db',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'loyals',
    multipleStatements: true
  });


  
  

  const conn = {};

  conn.con = con;

  conn.connect = ()=>{
    if (con.state === 'disconnected'){
      con.connect(err=>{console.log(err?err:'connected')});
    }
  }

  module.exports = conn;