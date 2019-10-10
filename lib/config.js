
//importing dependencies
const Enviroment = require('./models/Enviroment');
const helper = require('./helper');

const enviroments = {}

//assiginging staging and production instances
enviroments.staging = new Enviroment("staging", 3000, 5000);
enviroments.production = new Enviroment("production", 80, 443);

//validating the NODE_ENV value
const currentEnviroment = typeof process.env.NODE_ENV == 'string'? process.env.NODE_ENV.toLocaleLowerCase(): '';

//validating the module that will export is one of the modules described above
const moduleToExport = typeof enviroments[currentEnviroment] == 'object'? enviroments[currentEnviroment] : enviroments.staging;


module.exports = moduleToExport;