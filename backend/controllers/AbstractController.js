
const Connection         = require('../models/Connection_');
const AbstractController = class {
    
    constructor(){
        this.connection = null;
    }
    
    connect(callback){
        if(this.connection == null){
            this.connection = Connection.getInstance();
        }
        callback(this.connection.conn);
    }

    disconnect(){
        if(this.connection != null){
            this.connection.close();
        }
    }
}
module.exports = AbstractController;