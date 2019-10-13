
// Model for the Enviroment class.
//@TODO: Eventually more attributes will be defined
class Enviroment{
    constructor(name, httpPort, httpsPort){
        this.name = name;
        this.httpPort = httpPort;
        this.httpsPort = httpsPort;
    }

}

module.exports = Enviroment;