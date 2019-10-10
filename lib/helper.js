
const url = require('url');

const helper = {};

//creating requestParser container
helper.requestParser = {};


/**
 * Takes an http request and returns its trimmed path.
 * @param req: Request
 * @returns trimmedPath : string
 */
helper.requestParser.retrieveTrimmedPath = (req) => {
    const parseUrl = helper.requestParser.parseUrl(req);

    const path = parseUrl.pathname;
    return path.replace(/^\/+|\/+$/g, '');
}

/**
 * returns the query string object from a given request
 * @param req : Request
 * @returns queryStringObject : object
 */
helper.requestParser.retrieveQueryStringObject = (req) => {
    return helper.requestParser.parseUrl(req).query;
}

/**
 * @returns method: string
 */
helper.requestParser.retrieveMethod = (req) => {
    return req.method.toLowerCase();
}

helper.requestParser.retrieveHeaders = (req) => {
    return req.headers;
}

/**
 * Takes request and parses its URL
 * @param req: Request
 * @returns parsedUrl : object
 */
helper.requestParser.parseUrl = (req) => {
    return url.parse(req.url, true);
}


/**
 * Parses a JSON more efficiently
 * @returns an empty object if exception is thrown
 */
helper.parseJSON = (str) => {
    try{
        return JSON.parse(str);
    }catch(e){
        return {}
    }
}



module.exports = helper;