
const Connection         = require('../models/Connection');
const AbstractController = class {
    
    constructor(){
        this.connection = null;
    }
    
    connect(callback){
        if(this.connection == null){
            this.connection = Connection.getInstance();
        }
        this.connection.connect();
        callback(this.connection.conn);
    }

    disconnect(){
        if(this.connection != null){
            this.connection.close();
        }
    }
}
module.exports = AbstractController;