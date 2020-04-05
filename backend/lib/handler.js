/**
 * @author Felipe Mantovani
 */

const ViewingResult               = require('../models/pojo').ViewingResult;
const CustomerController          = require('../controllers/CustomerController');
const CardController              = require('../controllers/CardController');
const TransactionController       = require('../controllers/TransactionController');
const TokenController             = require('../controllers/TokenController');
const config                      = require('./config');
const httpStatus                  = config.httpStatus;
const messages                    = config.messages;
const headers                      = {'Content-Type': 'application/json'}; 
const handler                     = {}
handler.sendResponse              = (response, result, status = httpStatus.OK, message)=>{
        if(message){
            result["message"] = message;
        }
        response.writeHead(status, headers);
        response.end(JSON.stringify(result));
}
handler.getCustomer               = (req, res) => {
    try{
        handler.validate(req, valid=>{
            if(!valid){
                handler.sendResponse(res, {}, httpStatus.FORBIDDEN, messages.OPERATION_NOT_PERMITTED);
            }else{
                const customerId = req.params.id;
                const customerController = CustomerController.getInstance();
    
                customerController.selectCustomer(customerId, (customerData, status, message)=>{
                    result = {}
                    if(!status && customerData){
                        if(Array.isArray(customerData)){
                            result.customers = {};
                            customerData.forEach(customer=>{                                
                                const id = customer.id;
                                delete customer.id;
                                result.customers[id] = customer;
                            });
                        }else{
                            const id = customerData.id;
                            delete customerData.id;
                            result[id] = customerData;
                        } 
                        handler.sendResponse(res, result);       
                    }else{
                        if(message){
                            handler.sendResponse(res, result, status, message); 
                        }else{
                            handler.sendResponse(res, result, status, messages.SOMETHING_WENT_WRONG); 
                        }     
                    }
                });
            }
        });
    }catch(e){
        handler.sendResponse(res, {}, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION);
    }    
}

handler.getCard                   = (req, res) => {
    try{
        handler.validate(req, valid=>{
            if(!valid){
                handler.sendResponse(res, {}, httpStatus.FORBIDDEN, messages.OPERATION_NOT_PERMITTED);
            }else{
                const uuid = req.params.uuid;
                const cardController = CardController.getInstance();
    
                cardController.selectCard(uuid, (cards, status, message)=>{
                    const result = {};
                    if(!status && cards){
                        result.cards = {};
                        if(cards.length == 1 && cards[0].transactions.length > 0){
                            const cardId = cards[0].id;
                            delete cards[0].id;
                            result.cards[cardId] = cards[0];
                            cards[0].transactions.forEach(transaction=>{
                                const transactionId = transaction.id;
                                delete transaction.id;
                                result.cards[cardId].transactions[transactionId] = transaction;
                            });
                        }else{
                            result.cards = cards
                        }
                        handler.sendResponse(res, result);
                    }else{
                        if(message){
                            handler.sendResponse(res, result, status, message);
                        }else{
                            handler.sendResponse(res, result, status, messages.SOMETHING_WENT_WRONG);
                        }
                    }
                });
            }
        });
    }catch(e){
        handler.sendResponse(res, {}, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION);
    }
}

handler.getBalance                = (req, res) => {
    try{
        handler.validate(req, valid=>{
            if(!valid){
                handler.sendResponse(res, {}, httpStatus.FORBIDDEN, messages.OPERATION_NOT_PERMITTED);
            }else{
                const uuid = req.params.uuid;
                const cardController = CardController.getInstance();
                cardController.selectBalance(uuid, (balance, status, message)=>{
                    const result = {}
                    if(!status && balance){
                        status = 200;
                        result.card = {
                            "uuid" : uuid,
                            "balance" : balance
                        }
                        handler.sendResponse(res, result);
                    }else{
                        if(message){
                            handler.sendResponse(res, result, status, message);
                        }else{
                            handler.sendResponse(res, result, status, messages.SOMETHING_WENT_WRONG);
                        }
                    }
                });
            }
        });
    }catch(e){
        handler.sendResponse(res, {}, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION);
    }
}

handler.createCustomerWithUUID    = (req, res) => {
    try{
        handler.validate(req, valid=>{
            if(!valid){
                handler.sendResponse(res, {}, httpStatus.FORBIDDEN, messages.OPERATION_NOT_PERMITTED);
            }else{
                const uuid               = req.body.uuid;
                const customer_id        = req.params.customer_id;
                const customerController = CustomerController.getInstance();
                const cardController     = CardController.getInstance();
                if(typeof customer_id == "undefined"){
                    customerController.insertCustomerWithUUID(uuid, (newCardId, status, message)=>{
                        const result = {}
                        if(!status && newCardId){
                            result.cardId = newCardId;
                            handler.sendResponse(res, result);
                        }else{
                            if(message){
                                handler.sendResponse(res, result, status, message);
                            }else{
                                handler.sendResponse(res, result, status, messages.SOMETHING_WENT_WRONG);
                            }
                        }
                    });
                }else{
                    cardController.insertCardToExistingCustomer(uuid, customer_id, (newCardId, status, message)=>{
                        const result = {};
                        console.log(newCardId);
                        if(!status && newCardId){
                            result.cardId = newCardId;
                            handler.sendResponse(res, result);
                        }else{
                            if(message){
                                handler.sendResponse(res, result, status, message);
                            }else{
                                handler.sendResponse(res, result, status, messages.SOMETHING_WENT_WRONG);
                            }
                        }
                    });
                    
                }
            }
        });
    }catch(e){
        handler.sendResponse(res, {}, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION);
    }
}

handler.createTransaction         = (req, res) => {
    try{
        handler.validate(req, valid=>{
            if(!valid){
                handler.sendResponse(res, {}, httpStatus.FORBIDDEN, messages.OPERATION_NOT_PERMITTED);
            }else{
                const uuid                  = req.body.uuid;
                const value                 = req.params.value
                const transactionController = TransactionController.getInstance();
                transactionController.insertTransaction(uuid, value, (success, status, message)=>{
                    const result = {};
                    if(!status && success){
                        result.success = true;
                        handler.sendResponse(res, result);
                    }else{
                        if(message){
                            handler.sendResponse(res, result, status, message);
                        }else{
                            handler.sendResponse(res, result, status, messages.SOMETHING_WENT_WRONG);
                        }
                    }
                });
            }
        });
    }catch(e){
        handler.sendResponse(res, {}, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION);
    }
}

handler.getTransactions           = (req, res) => {
    try{
        handler.validate(req, valid=>{
            if(!valid){
                handler.sendResponse(res, {}, httpStatus.FORBIDDEN, messages.OPERATION_NOT_PERMITTED);
            }else{
                const uuid                  = req.params.uuid;
                const transactionController = TransactionController.getInstance();
                transactionController.getTransactions(uuid, (transactions, status, message)=>{
                    const result = {};
                    if(!status && transactions){
                        status              = httpStatus;
                        result.transactions = {};
                        transactions.forEach(transaction=>{
                            const id = transaction.id;
                            delete transaction.id;
                            result.transactions[id] = transaction;
                        });
                        handler.sendResponse(res, result);
                    }else{
                        if(message){
                            handler.sendResponse(res, result, status, message);
                        }else{
                            handler.sendResponse(res, result, status, messages.SOMETHING_WENT_WRONG);
                        }
                    }
                });
            }
        });
    }catch(e){
        handler.sendResponse(res, {}, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION);
    }
}

handler.notFound = (req, res) => {
    try{
        handler.validate(req, valid=>{
            if(!valid){
                handler.sendResponse(res, {}, httpStatus.FORBIDDEN, messages.OPERATION_NOT_PERMITTED);
            }else{
                handler.sendResponse(res, {}, httpStatus.NOT_FOUND, messages.NO_RELATED_ROUTING_FOUND);
            }
        });
    }catch(e){
        handler.sendResponse(res, {}, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION);
    }
}



handler.validate = (req, callback) => {
    try{
        const token = req.headers["__token__"]
        const tokenController = TokenController.getInstance();
        tokenController.selectToken(token, valid=>{
            callback(valid);
        });
    }catch(e){

    }
}


module.exports = handler;