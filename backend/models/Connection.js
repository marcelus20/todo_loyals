
const config = require('../lib/config');
const mysql  = require('mysql');


const Connection = class {

    constructor(){
        this.conn = mysql.createConnection(config.dbSettings);
    }

    static getInstance(){
        if(Connection.connection == null){
            Connection.connection = new Connection();
        }
        return Connection.connection;
    }

    query(query, queryProperties, callback){
        this.conn.query(query, queryProperties, callback);
    }

    connect(callback){
        if (this.conn.state === 'disconnected'){
          this.conn.connect(err=>{console.log(err?err:'connected')});
        }
    }

}

module.exports = Connection;