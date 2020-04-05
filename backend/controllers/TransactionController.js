
const config                = require('../lib/config');
const CustomerController    = require('./CustomerController');
const CardController        = require('./CardController');
const AbstractController    = require('./AbstractController');
const Transaction           = require('../models/pojo').Transaction;
const httpStatus            = config.httpStatus;
const messages              = config.messages;

const TransactionController = class extends AbstractController{

    constructor(){
        super();
    }

    insertTransactionRecord_(callback){
        this.connect(conn=>{
            try{
                const query = 'insert into records (type) value ("transaction")';
                conn.query(query,[],(err_, result) =>{
                    console.log(result);
                    if(!err_ && result){
                        callback(result.insertId);
                    }else{
                        conn.rollback(()=>callback(false, messages.QUERY_NOT_EXECUTED));
                    }     
                });
            }catch(e){
                console.log(e);
                callback(false, messages.CRASHING_OPERATION);
            }
        });
    }

    insertTransaction_(transactionId, cardId, customerId, value , callback){
        this.connect(conn=>{
            try{
                const query = 'insert into transactions value (?, ?, ?, ?);';
                conn.query(query, [transactionId, cardId, customerId, value], (err_,result) =>{
                    if(!err_ && result){
                        callback(true);
                    }else{
                        console.log(err_);
                        conn.rollback(()=>callback(false, messages.QUERY_NOT_EXECUTED));
                    }     
                });
            }catch(e){
                console.log(e);
                callback(false, messages.CRASHING_OPERATION);
            } 
        });
    }


    insertTransactionRecord(uuid, value, callback){
        this.connect(conn=>{
            try{
                const cardController     = CardController.getInstance();
                cardController.selectBalance(uuid, balance=>{
                    if(value < 0 && ((-1 * value) > balance)){
                        //checking if card has enough balance for negative transactions
                        callback(false, messages.INSUFFICIENT_BALANCE)
                    }else{
                        const customerController = CustomerController.getInstance();
                        cardController.getCardId(uuid, cardId=>{
                            if(!cardId){
                                //all bad
                                conn.rollback(()=>callback(false, "card id not found"));
                            }else{
                                //all good
                                this.insertTransactionRecord_((transactionId, message)=>{
                                    if(!transactionId){
                                        //allbad
                                        conn.rollback(()=>callback(false, message));
                                    }else{
                                        //all good
                                        customerController.getCustomerId(cardId,(customerId, message)=>{
                                            if(!customerId){
                                                //all bad
                                                conn.rollback(()=>callback(false, message));
                                            }else{
                                                //all good
                                                this.insertTransaction_(transactionId, cardId, customerId, value, (success, message)=>{
                                                    if(success){
                                                        conn.commit(()=>{
                                                            callback(success);
                                                        });
                                                    }else{
                                                        callback(false, httpStatus.INTERNAL_ERROR, message);
                                                    }
                                                })
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }catch(e){
                console.log(e);
                callback(false, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION);
            }
            
        });
    }

    insertTransaction(uuid, value, callback){ 
        this.connect(conn=>{
            try{
                conn.beginTransaction(e=>{
                    this.insertTransactionRecord(uuid, value,(success, message) => {
                        if(success){
                            callback(success);
                        }else{
                            conn.rollback(()=>{
                                callback(false, httpStatus.INTERNAL_ERROR, message);
                            })                
                        }
                    });  
                });
            }catch(e){
                console.log(e);
                callback(false, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION);
            }
        });
    } 


    getTransactions(uuid, callback){
        this.connect(conn=>{  
            try{
                let query = "";
                const callback_ = (err_, result) => {
                    if(!err_ && result){
                        //all good
                        const transactions = result
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
                        callback(false, httpStatus.INTERNAL_ERROR);
                    }
                }
                
                if(typeof uuid == "undefined"){
                    query = 'select * from view_transactions;'
                    conn.query(query, callback_);
                }else{
                    query = 'select * from view_transactions where uuid = ?;'
                    conn.query(query, [uuid], callback_);
                }
            }catch(e){
                console.log(e);
                callback(false, httpStatus.INTERNAL_ERROR);
            }
        });
    }


    static getInstance(){
        if(TransactionController.transactionController == null){
            TransactionController.transactionController = new TransactionController();
        }
        return TransactionController.transactionController;
    }
}
module.exports              = TransactionController;