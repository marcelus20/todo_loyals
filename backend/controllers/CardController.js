

const AbstractController = require('./AbstractController');
const CustomerController = require('./CustomerController');
const config             = require('../lib/config');
const httpStatus         = config.httpStatus;
const messages           = config.messages;
const Card               = require('../models/pojo').Card;
const Transaction        = require('../models/pojo').Transaction;

const CardController     = class extends AbstractController{

    constructor(){
        super();
    }

    selectCard(uuid, callback){ 
        this.connect(conn=>{
            try{
                let query = "";
                if(typeof uuid != "undefined"){
                    //get all cards info
                    query = `select customer_id, card_id, date, uuid from view_cards where uuid = ?`;
                    conn.query(query, [uuid], (err_, result)=>{
                        if(!err_ && result){
                            const cards = result
                                .map(record => new Card(
                                    record.card_id,
                                    record.date,
                                    record.customer_id,
                                    record.uuid,
                                    []
                                ));
                            conn.query('select * from view_transactions where uuid = ?', [uuid], (err__, result__)=>{
                                if(!err__ && result__){
                                    //all good
                                    try{
                                        cards[0].transactions = result__
                                        .map(obj => new Transaction(
                                            obj.transaction_id,
                                            obj.date, 
                                            obj.card_id,
                                            obj.customer_id,
                                            obj.value
                                        ));
                                        callback(cards[0]);
                                    }catch(e){
                                        console.log(e);
                                        callback(false, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION)
                                    }
                                    
                                }else {
                                    //all bad
                                    callback(false, httpStatus.NOT_FOUND, messages.QUERY_RETURNED_NO_RESULTSET);
                                }
                            });
                        }else{
                            //all bad
                            console.log(err_);
                            callback(false, httpStatus.NOT_FOUND, messages.QUERY_RETURNED_NO_RESULTSET);
                        }
                    });
                }else{
                    //get specific card with uuid passed
                    query = `select distinct customer_id, card_id, date, uuid from view_cards;`;
                    conn.query(query, [],(err, result)=>{
                        if(!err && result){
                            const cards = result
                                .map(record => new Card(
                                    record.card_id,
                                    record.date,
                                    record.customer_id,
                                    record.uuid,
                                    []
                                ));
                                callback(cards)
                        } else{
                            callback(false, httpStatus.NOT_FOUND, messages.QUERY_RETURNED_NO_RESULTSET);
                        }
                    });
                }
            }catch(e){
                console.log(e);
                callback(false, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION);
            }
        });        
    }

    selectBalance(uuid, callback){ 
        this.connect(conn=>{  
            try{
                if(typeof uuid != "undefined"){
                    let query = `select sum(value) as balance from view_transactions where uuid = ?`;
            
                    try{
                        conn.query(query, [uuid], (err_, result) => {
            
                            if(!err_ && result){
                                if(result[0]["balance"]){
                                    if(result.length > 0){
                                        callback(result[0]["balance"]);
                                    }else{
                                        callback(false, httpStatus.NOT_FOUND , messages.QUERY_RETURNED_NO_RESULTSET);
                                    }
                                }else{
                                    callback(false, httpStatus.INTERNAL_ERROR, messages.QUERY_RETURNED_NO_RESULTSET)
                                }
                                
                            }else{
                                callback(false, httpStatus.INTERNAL_ERROR , messages.QUERY_NOT_EXECUTED);
                                console.log(err_);
                            }
                        });
                    }catch(e){
                        callback(false, httpStatus.INTERNAL_ERROR, messages.SOMETHING_WENT_WRONG);
                    }
                    
                }else{
                    callback(false, httpStatus.INTERNAL_ERROR, messages.INSUFICIENT_PARAMETERS);
                }
            }catch(e){
                console.log(e);
                callback(false, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION);
            } 
        });  
    }


    insertCard(callback){
        this.connect(conn=>{
            try{
                const query = 'insert into records (type) value("card")';
                conn.query(query, [],(err_, result) =>{
                    if(!err_ && result){
                        callback(result.insertId);    
                    }else{
                        conn.rollback(()=>callback(false, httpStatus.INTERNAL_ERROR, messages.QUERY_NOT_EXECUTED));
                    }
                });
            }catch(e){
                console.log(e);
                callback(false, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION);
            }       
        });
    }

    selectCardId(uuid, customerId, callback){
        this.connect(conn=>{
            try{
                const query = 'select card_id from cards where uuid = ? and customer_id = ?';
                conn.query(query, [uuid, customerId],(err_, result) =>{
                    if(!err_ && result){
                        console.log(result[0]["card_id"]);
                        callback(result[0]["card_id"]);    
                    }else{
                        conn.rollback(()=>callback(false, httpStatus.INTERNAL_ERROR, messages.QUERY_NOT_EXECUTED));
                    }     
                });
            }catch(e){
                console.log(e);
                callback(false, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION);
            }
        });
    }

    insertUUID(card_id, customer_id, uuid, callback){
        this.connect(conn=>{
            try{
                const query = 'insert into cards (card_id, customer_id, uuid) value(?,?,?)';
                conn.query(query, [card_id, customer_id, uuid],(err_, result) =>{
                    if(!err_ && result){
                        console.log(result);
                        this.selectCardId(uuid, customer_id, newCardId=>callback(newCardId));    
                    }else{
                        conn.rollback(()=>callback(false, httpStatus.INTERNAL_ERROR, messages.QUERY_NOT_EXECUTED));
                    }     
                });
            }catch(e){
                console.log(e);
                callback(false, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION);
            }
        });
    }

    insertUUIDCard(uuid, customer_id, callback){
        this.connect(conn=>{
            try{
                this.insertCard((newCardId, status, message)=>{
                    if(newCardId){
                        this.insertUUID(newCardId, customer_id, uuid, card_id=>callback(card_id));
                    }else{
                        conn.rollback(()=>callback(false, status, message));
                    }
                });
            }catch(e){
                console.log(e);
                callback(false, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION);
            }
            
        });
    }

    getCardId(uuid, callback){
        this.connect(conn=>{
            try{
                console.log(uuid);
                const query = 'select card_id from cards where uuid = ?';
                conn.query(query, [uuid],(err_, result) =>{
                    console.log(result);
                    if(!err_ && result){
                        if(result.length == 0){
                            conn.rollback(()=>callback(false));
                        }else{
                            callback(result[0]["card_id"]);
                        }
                    }else{
                        conn.rollback(()=>callback(false));
                    }     
                });
            }catch(e){
                console.log(e);
                callback(false, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION);
            }
        });
    }


    insertCardToExistingCustomer(newUuid, existingCustomerId, callback){
        this.connect(conn=>{
            try{
                const customerController = require('./CustomerController').getInstance();
                conn.beginTransaction(e=>{
                    customerController.checkIfCustomerExists(existingCustomerId, (exists, message) => {
                        if(!exists){
                            conn.rollback(()=>{
                                callback(false, httpStatus.INTERNAL_ERROR, message);
                            });
                        }else{
                            this.insertUUIDCard(newUuid, existingCustomerId, (newCardId, message) => {
                                if(!newCardId){
                                    conn.rollback(()=>{
                                        callback(false, httpStatus.INTERNAL_ERROR, message);
                                    });
                                }else{
                                    conn.commit(()=>{
                                        callback(newCardId);
                                    })
                                }
                            });
                        }
                    });
                });
            }catch(e){
                console.log(e);
                callback(false, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION);
            }    
        });
    }




    static getInstance(){
        if(CardController.cardController == null){
            CardController.cardController = new CardController();
        }
        return CardController.cardController;
    }

    

}

module.exports           = CardController;
