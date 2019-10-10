
//importing all the dependencies
const http = require('http');
const https = require('https');
const config = require('./lib/config');
const helper = require('./lib/helper');
const StringDecoder = require('string_decoder').StringDecoder;
const Data = require('./lib/models/Data');
const handlers = require('./lib/handlers');


//creating the http server
const httpServer = http.createServer((req, res)=>{
    main(req, res);
});

httpServer.listen(config.httpPort, ()=>{
    console.log(`Server listening to the port ${config.httpPort}`);
});


//function that will handle http and https requests
const main = (req, res) => {
    reqParser = helper.requestParser;

    //parsing all info from the request
    const trimmedPath = reqParser.retrieveTrimmedPath(req)
    const queryStringObj = reqParser.retrieveQueryStringObject(req);
    const method = reqParser.retrieveMethod(req);
    const headers = reqParser.retrieveHeaders(req);
    const decoder = new StringDecoder('utf8');


    let body = ""
    //populating ascyncronously the byte data to the body
    req.on('data', (data)=>{
        body += decoder.write(data);
    });

    //When request has been entirelly processed
    req.on('end', ()=>{
        body += decoder.end();// finish up body
        body = helper.parseJSON(body);
        const data = new Data(trimmedPath, queryStringObj, method, headers, body);

        //chose the handler based on the options available in routers
        chosenHandler = typeof routers[trimmedPath] !== 'undefined' ? routers[trimmedPath] : routers.notFound;
        
        //calling the router url mapping.
        chosenHandler(data, (statusCode, payload)=>{

            statusCode = typeof statusCode == 'number' ? statusCode : 200;

            //payload should always be return as a object
            payload = typeof payload == 'object'? payload : {};
            payloadString = JSON.stringify(payload)


            res.setHeader('Content-Type','application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });

        
    });

};

//url mapping
const routers = {
    //testing routing
    "ping": handlers.ping,
    "analyze_my_request": handlers.analyze_my_request,
    //end of testing routing
    "notFound": handlers.notFound,
};