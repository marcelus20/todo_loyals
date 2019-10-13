

//this is the body object of the http requests
class Data{
    constructor(path, 
        queryStringObject,
        method,
        headers,
        body,
        ){
        this.path = path;
        this.queryStringObject = queryStringObject;
        this.method = method;
        this.headers = headers;
        this.body = body;
    }
}

module.exports = Data;