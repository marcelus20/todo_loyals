

const Err = require('./models/Err');

const handlers = {};

handlers.ping = (data, callback) =>{
    payload = {
        "message":"ping was successful!",
        "method-utilized":data.method,
    };
    callback(200, payload);
};

handlers.analize_my_request = (data, callback) => {
    acceptedMethods = ['get', 'post', 'put', 'delete'];
    if(acceptedMethods.indexOf(data.method) > -1){
        handlers._analize_my_request[data.method](data, callback);
    }else{
        callback(405, new Err("Method not permited"));
    }
};

handlers._analize_my_request = {};

handlers._analize_my_request.get = (data, callback) => {
    payload = {
        "path-requested":data.path,
        "query-string":data.queryStringObject,
        "host":data.headers.host,
        "method":data.method,
    };
    console.log(payload);
    callback(200, payload);
}

handlers._analize_my_request.post = (data, callback) => {
    payload = {
        "path-requested":data.path,
        "query-string":data.queryStringObject,
        "host":data.headers.host,
        "method":data.method,
        "body-posted":data.body
    };
    callback(200, payload);
}

handlers._analize_my_request.put = (data, callback) => {
    payload = {
        "path-requested":data.path,
        "query-string":data.queryStringObject,
        "host":data.headers.host,
        "method":data.method,
        "body-sent-to-update":data.body 
    };
    callback(200, payload);
}

handlers._analize_my_request.delete = (data, callback) => {
    payload = {
        "path-requested":data.path,
        "query-string":data.queryStringObject,
        "host":data.headers.host,
        "method":data.method,
        "to-delete-through-query-string":data.queryStringObject,
    };
    callback(200, payload);
}


handlers.notFound = (data, callback) => {
    callback(404, new Err("Page not found. Did you request the correct path?"));
}





module.exports = handlers;