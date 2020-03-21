/**
 * @author Felipe Mantovani
 */

const helper        = require('./helper')
const bodyParser    = require('body-parser');
const ViewingResult = require('./models/pojo').ViewingResult;

const handlers      = {};
 
const headers       = {
    'Content-Type': 'application/json'
}


/**
 * Required fields: uid
 * Optional fields: none
 *  @todo add authentication token in the future
 */
handlers.getCustomer      = (req, res) => {
    const customerId = req.params.id;
    helper.selectCustomer(customerId, (customerData, status, message)=>{
        const result = new ViewingResult();
        if(!status && customerData){
            status = 200;
            console.log(customerData);
            if(Array.isArray(customerData)){
                console.log(customerData);
                result.customers = {};
                customerData.forEach(customer=>{
                    
                    result.customers[customer.id] = {
                        "date": customer.date,
                        "cards" : customer.cards
                    }
                });
                console.log(result);
            }else{
                result[customerData.id] = {
                        "date": customerData.date,
                        "cards" : customerData.cards
                }
            }        
            delete result.message;
        }else{
            if(message){
                result.message = message
            }
            
        }
        res.writeHead(status, headers);
        res.end(JSON.stringify(result));
    });
};

handlers.getCard          = (req, res) => {
    const uuid = req.params.uuid;
    helper.selectCard(uuid, (cards, status, message)=>{
        const result = new ViewingResult();
        if(!status && cards){
            status = 200;
            result.cards = {};
            console.log(cards[0]);
            if(cards.length == 1 && cards[0].transactions.length > 0){
                result.cards[cards[0].id] = {
                    "date":cards[0].date,
                    "customer_id":cards[0].customer_id,
                    "uuid": cards[0].uuid,
                    "transactions": {}
                };

                cards[0].transactions.forEach(transaction=>{
                    result.cards[cards[0].id].transactions[transaction.id] = {
                        "card_id": transaction.card_id,
                        "customer_id" : transaction.customer_id,
                        "date" : transaction.date,
                        "value" : transaction.value
                    }
                });
                
            }else{
                result.cards = {};
                cards.forEach(card=>{
                    result.cards[card.id] = {
                        "date":card.date,
                        "customer_id":card.customer_id,
                        "uuid": card.uuid,
                    };
                });               
            }
            
            delete result.message;
        }else{
            if(message){
                result.message = message;
            }
            
        }
        res.writeHead(status, headers);
        res.end(JSON.stringify(result));
    });
};


handlers.getBalance       = (req, res) => {
    const uuid = req.params.uuid;
    helper.selectBalance(uuid, (balance, status, message)=>{
        const result = new ViewingResult();
        
        if(!status && balance){
            status = 200;
            result.card = {
                "uuid" : uuid,
                "balance" : balance
            }

            delete result.message;
        }else{
            if(message){
                result.message = message;
            }
        }
        res.writeHead(status, headers);
        res.end(JSON.stringify(result));
    });
};

handlers.createCustomerWithUUID   = (req, res) => {
    const uuid = req.body.uuid;
    const customer_id = req.params.customer_id;
    console.log(customer_id);
    if(typeof customer_id == "undefined"){
        helper.insertCustomerWithUUID(uuid, (newCardId, status, message)=>{
            const result = new ViewingResult();
            if(!status && newCardId){
                status = 200;
                result.cardId = newCardId;
                delete result.message;
            }else{
                if(message){
                    result.message = message;
                }
            }
            res.writeHead(status, headers);
            res.end(JSON.stringify(result));
        });
    }else{
        helper.insertCardToExistingCustomer(uuid, customer_id, (newCardId, status, message)=>{
            const result = new ViewingResult();
            console.log(newCardId);
            if(!status && newCardId){
                status = 200;
                result.cardId = newCardId;
                delete result.message;
            }else{
                console.log(result);
                result.message = message;
            }
            res.writeHead(status, headers);
            res.end(JSON.stringify(result));
        });
        
    }
};

handlers.createTransaction = (req, res) => {
    const uuid = req.body.uuid;
    const value = req.params.value
    helper.insertTransaction(uuid, value, (sucess, status, message)=>{
        const result = new ViewingResult();
        if(!status && sucess){
            status = 200;
            result.sucess = true;
            delete result.message;
        }else{
            if(message){
                result.message = message;
            }
        }
        console.log("enviando resposta");
        res.writeHead(status, headers);
        res.end(JSON.stringify(result));
    });
};


handlers.getTransactions   = (req, res) => {
    const uuid = req.body.uuid;
    helpers.getTransactions(uuid, (transactions, status, message)=>{
        const result = new ViewingResult();
        if(!status && transactions){
            status = 200;
            result.transactions = {};
            transactions.forEach(transaction=>{
                result.transactions[transaction.id] = {
                    "card_id"    : transaction.card_id,
                    "date"       : transaction.date,
                    "customer_id": transaction.customer_id,
                    "value"      : transaction.value
                }
            });
            delete result.message;
        }else{
            if(message){
                result.message = message;
            }
        }
        res.writeHead(status, headers);
        res.end(JSON.stringify(result));
    });
}

module.exports = handlers;