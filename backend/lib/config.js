
const config          = {};
config.dbSettings     = {
    host              : 'db',
    port              : 3306,
    user              : 'root',
    password          : '12345678',
    database          : 'loyals',
    multipleStatements: true
}
config.serverSettings = {
    name : "staging",
    port : 3000
}
config.httpStatus     = {
    "OK"             : 200,
    "FORBIDDEN"      : 403,
    "INTERNAL_ERROR" : 500,
    "NOT_AVAILABLE"  : 503,
    "NOT_FOUND"      : 404
}
config.messages       = {
    "OPERATION_NOT_PERMITTED"     : "OPERATION NOT PERMITTED",
    "QUERY_NOT_EXECUTED"          : "QUERY NOT EXECUTED",
    "SOMETHING_WENT_WRONG"        : "SOMETHING WENT WRONG",
    "NO_RELATED_ROUTING_FOUND"    : "NO RELATED ROUTING FOUND",
    "CRASHING_OPERATION"          : "OPERATION STOPPED DUE TO CAUSING CRASH",
    "QUERY_RETURNED_NO_RESULTSET" : "QUERY RETURNED NO RESULT_SET",
    "INSUFFICIENT_PARAMETERS"     : "INSUFFICIENT PARAMETERS",
    "INSUFFICIENT_BALANCE"        : "INSUFFICIENT BALANCE"
}

module.exports        = config;