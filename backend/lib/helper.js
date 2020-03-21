/**
 * @author Felipe Mantovani
 */

const conn                         = require('./models/connection'),
Customer                           = require('./models/pojo').Customer,
Card                               = require('./models/pojo').Card;
Transaction                        = require('./models/pojo').Transaction;
helpers                            = {};
helpers.utils                      = {};
helpers.repo                       = {};
helpers.utils.generateSQLTimestamp = date => date.toISOString().slice(0, 19).replace('T', ' ');


//utils container will host logic methods to aid operations

//helpers container will host all database communication 

/**
 * Execute the call of a stored procedure
 * inserts a new record to the table
 * 
 * @param{uid, callback} All required 
 */
helpers.selectCustomer         = (id, callback) => { 
    conn.connect();
    
    let query = "";

    const callback_ = (err_, result) => {
        if(!err_ && result){
            if(result.length > 0){
                console.log(result);
                const customers = result
                    .map(customer => new Customer(
                         customer.customer_id,
                         customer.date,
                         customer.card_id.split(',').filter(id=>id!="")
                    ));
                    // console.log(customers)
                if(result.length == 1){
                    callback(customers[0]);
                }else{
                    callback(customers);
                }
                console.log(customers)
                
            }else{
                callback(false, 400, "No customer(s) records found");    
            }
        }else{
            console.log(err_);
            callback(false, 500, "could not execute query");
        }
    }


    if(typeof id != "undefined"){
        query = `select customer_id, date, card_id from view_customers where customer_id = ?`;
        conn.con.query(query, [id], callback_);
    }else{
        query = `select customer_id, date, card_id from view_customers`;
        conn.con.query(query, callback_);
    }   
}     

helpers.selectCard         = (uuid, callback) => { 
    conn.connect();
    
    let query = "";
    if(typeof uuid != "undefined"){
        //get all cards info
        query = `select customer_id, card_id, date, uuid from view_cards where uuid = ?`;
        conn.con.query(query, [uuid], (err_, result)=>{
            if(!err_ && result){
                const cards = result
                    .map(record => new Card(
                        record.card_id,
                        record.date,
                        record.customer_id,
                        record.uuid,
                        []
                    ));
                conn.con.query('select * from view_transactions where uuid = ?', [uuid], (err__, result__)=>{
                    
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
                            console.log(cards[0]);
                            callback(cards);
                        }catch(e){
                            console.log(e);
                            callback(false, "Something went wrong. ")
                        }
                        
                    }else {
                        //all bad
                        callback(false, 500, "could not get transactions from requested card");
                    }
                });
            }else{
                //all bad
                console.log(err_);
                callback(false, 500, "Could get the requested card");
            }
        });
    }else{
        //get specific card with uuid passed
        query = `select distinct customer_id, card_id, date, uuid from view_cards;`;
        conn.con.query(query, (err, result)=>{
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
                callback(false, 500, "Could get the requested cards");
            }
        });
    }

    
}   

helpers.selectBalance         = (uuid, callback) => { 
    conn.connect();   
    console.log("id: "+uuid);
    if(typeof uuid != "undefined"){
        query = `select sum(value) as balance from view_transactions where uuid = ?`;

        conn.con.query(query, [uuid], (err_, result) => {

            if(!err_ && result){
                if(result.length > 0){
                    callback(result[0]["balance"]);
                }else{
                    callback(false, 500 , "No resulset found");
                }
            }else{
                callback(false, 500 , "could not execute the query");
                console.log(err_);
            }
        });
    }else{
        callback(false, 500, "paramater was not passed");
    }
    
    
}

helpers.insertCustomer = (callback)=>{
    const query = 'insert into records (type) value("customer")';
    conn.con.query(query, (err_, result) =>{
        if(!err_ && result){
            callback(result.insertId);    
        }else{
            conn.con.rollback(()=>callback(false));
        }
        
    });
}

helpers.insertCard = (callback) => {
    const query = 'insert into records (type) value("card")';
    conn.con.query(query, (err_, result) =>{
        if(!err_ && result){
            callback(result.insertId);    
        }else{
            conn.con.rollback(()=>callback(false, "could not execute the inserting card query"));
        }
        
    });
}
helpers.selectCardId = (uuid, customerId, callback) => {
    const query = 'select card_id from cards where uuid = ? and customer_id = ?';
    conn.con.query(query, [uuid, customerId],(err_, result) =>{
        if(!err_ && result){
            console.log(result[0]["card_id"]);
            callback(result[0]["card_id"]);    
        }else{
            conn.con.rollback(()=>callback(false, "Could not select the id of new card. Query failed"));
        }     
    });
}

helpers.insertUUID = (card_id, customer_id, uuid, callback) => {
    const query = 'insert into cards (card_id, customer_id, uuid) value(?,?,?)';
    conn.con.query(query, [card_id, customer_id, uuid],(err_, result) =>{
        if(!err_ && result){
            console.log(result);
            helpers.selectCardId(uuid, customer_id, newCardId=>callback(newCardId));    
        }else{
            conn.con.rollback(()=>callback(false, "could not execute inserting card query"));
        }     
    });
}
helpers.insertUUIDCard = (uuid, customer_id, callback) => {
    helpers.insertCard((newCardId, message)=>{
        console.log("Aqui", newCardId);
        if(newCardId){
            helpers.insertUUID(newCardId, customer_id, uuid, card_id=>callback(card_id));
        }else{
            conn.con.rollback(()=>callback(false, message));
        }
    });
    
}


helpers.insertCustomerWithUUID         = (uuid, callback) => { 
    conn.connect();   
    conn.con.beginTransaction(e=>{
        helpers.insertCustomer((customerId) => {
            if(customerId){
                helpers.insertUUIDCard(uuid, customerId, (newCardId)=>{
                    if(!newCardId){
                        conn.con.rollback(()=>{
                            callback(false, 500, "Card not created. No ID was generated");        
                        });
                    }else{
                        conn.con.commit(()=>{
                            callback(newCardId);
                        })
                    }
                });
            }else{
                conn.con.rollback(()=>{
                    callback(false, 500, "Customer not created. No ID was generated");
                })                
            }
        });  
    });
}  

helpers.getCardId = (uuid, callback) => {
    conn.connect();
    console.log(uuid);
    const query = 'select card_id from cards where uuid = ?';
    conn.con.query(query, [uuid],(err_, result) =>{
        console.log(result);
        if(!err_ && result){
            if(result.length == 0){
                conn.con.rollback(()=>callback(false));
            }else{
                callback(result[0]["card_id"]);
            }
        }else{
            conn.con.rollback(()=>callback(false));
        }     
    });
}

helpers.getCustomerId = (cardId, callback) => {
    conn.connect();
    const query = 'select customer_id from cards where card_id = ?';
    conn.con.query(query, [cardId],(err_, result) =>{
        console.log(result);
        if(!err_ && result){
            if(result.length == 0){
                conn.con.rollback(()=>callback(false));
            }else{
                callback(result[0]["customer_id"]);
            }
        }else{
            console.log(err_);
            conn.con.rollback(()=>callback(false, "No customer id found"));
        }     
    });
}

helpers.insertTransactionRecord_ = callback=>{
    conn.connect();
    const query = 'insert into records (type) value ("transaction")';
    conn.con.query(query,(err_, result) =>{
        console.log(result);
        if(!err_ && result){
            callback(result.insertId);
        }else{
            conn.con.rollback(()=>callback(false, "Could not insert a transaction to the records entity"));
        }     
    });
}

helpers.insertTransaction_ = (transactionId, cardId, customerId, value , callback) => {
    conn.connect();
    const query = 'insert into transactions value (?, ?, ?, ?);';
    console.log("parametros",transactionId, cardId, customerId, value);
    conn.con.query(query, [transactionId, cardId, customerId, value], (err_,result) =>{
        if(!err_ && result){
            callback(true);
        }else{
            console.log(err_);
            conn.con.rollback(()=>callback(false, "Insertion to transaction table did not go through"));
        }     
    });
}

helpers.insertTransactionRecord = (uuid, value, callback) => {
    conn.connect();
    console.log(uuid);
    helpers.getCardId(uuid, cardId=>{
        if(!cardId){
            //all bad
            conn.con.rollback(()=>callback(false, "card id not found"));
        }else{
            //all good
            helpers.insertTransactionRecord_((transactionId, message)=>{
                if(!transactionId){
                    //allbad
                    conn.con.rollback(()=>callback(false, message));
                }else{
                    //all good
                    helpers.getCustomerId(cardId,(customerId, message)=>{
                        if(!customerId){
                            //all bad
                            conn.con.rollback(()=>callback(false, message));
                        }else{
                            //all good
                            helpers.insertTransaction_(transactionId, cardId, customerId, value, (success, message)=>{
                                if(success){
                                    conn.con.commit(()=>{
                                        callback(success);
                                    });
                                }else{
                                    callback(false, 500, message);
                                }
                            })
                        }
                    });
                }
            });
        }
    });
}


helpers.insertTransaction         = (uuid, value, callback) => { 
    conn.connect();   
    conn.con.beginTransaction(e=>{
        helpers.insertTransactionRecord(uuid, value,(success, message) => {
            if(success){
                callback(success);
            }else{
                conn.con.rollback(()=>{
                    callback(false, 500, message);
                })                
            }
        });  
    });
} 



helpers.getTransactions           = (uuid, callback) => {
    conn.connect();   
    let query = "";
    const callback_ = (err_, result) => {
        console.log(result);
        if(!err_ && result){
            //all good
            
            transactions = result
                .map(obj=>new Transaction(
                    obj.transaction_id,
                    obj.date, 
                    obj.card_id,
                    obj.customer_id,
                    obj.value
                ));
                callback(transactions);
        }else{
            //bad
            console.log(err_);
            callback(false, 500);
        }
    }
    
    if(typeof uuid == "undefined"){
        query = 'select * from view_transactions;'
        conn.con.query(query, callback_)
    }else{
        query = 'select * from view_transactions where uuid = ?;'
        conn.con.query(query, [uuid], callback_)
    }
}

helpers.checkIfCustomerExists = (existingCustomerId, callback) => {
    conn.connect();
    const callback_ = (err_, result) => {
        if(!err_ && result){
            if(result.length > 0){
                callback(true);
            }else{
                console.log(err_);
                conn.con.rollback(()=>{
                    callback(false, "empty result set when searching customer");
                });
            }
            
        }else{
            console.log(err);
            conn.con.rollback(()=>{
                callback(false, "Could not execute the searching customer query");
            });
            
        }
    }  
    conn.con.query('select id from records where id = ? and type = "customer"', [existingCustomerId], callback_);
}



helpers.insertCardToExistingCustomer = (newUuid, existingCustomerId, callback) => {
    conn.connect();   
    conn.con.beginTransaction(e=>{
        helpers.checkIfCustomerExists(existingCustomerId, (exists, message) => {
            if(!exists){
                conn.con.rollback(()=>{
                    callback(false, 500, message);
                });
            }else{
                helpers.insertUUIDCard(newUuid, existingCustomerId, (newCardId, message) => {
                    console.log(newCardId);
                    if(!newCardId){
                        conn.con.rollback(()=>{
                            callback(false, 500, message);
                        });
                    }else{
                        
                        conn.con.commit(()=>{
                            callback(newCardId);
                        })
                    }
                });
            }
        });
    });
    
    
}
module.exports                     = helpers;