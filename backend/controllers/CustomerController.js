

const AbstractController = require('./AbstractController');
const CardController     = require('./CardController');
const config             = require('../lib/config');
const httpStatus         = config.httpStatus;
const messages           = config.messages;
const Customer           = require('../models/pojo').Customer;

const CustomerController = class extends AbstractController{

    static customerController = null;

    constructor(){
        super();
    }

    selectCustomer(id, callback){
        this.connect(conn=>{
            try{
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
                            if(result.length == 1){
                                callback(customers[0]);
                            }else{
                                callback(customers);
                            }
                            console.log(customers)
                    
                        }else{
                            callback(false, httpStatus.NOT_FOUND, messages.QUERY_RETURNED_NO_RESULTSET);    
                        }
                    }else{
                        console.log(err_);
                        callback(false, httpStatus.INTERNAL_ERROR, messages.QUERY_NOT_EXECUTED);
                    }
                }   
                if(typeof id != "undefined"){
                    query = `select customer_id, date, card_id from view_customers where customer_id = ?`;
                    conn.query(query, [id], callback_);
                }else{
                    query = `select customer_id, date, card_id from view_customers`;
                    conn.query(query, [], callback_);
                }
            }catch(e){
                callback(false, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION);
            }     
        });
    }

    insertCustomer(callback){
        this.connect(conn=>{
            try{
                const query = 'insert into records (type) value("customer")';
                conn.query(query, [], (err_, result)=>{
                    if(!err_ && result){
                        callback(result.insertId);    
                    }else{
                        conn.rollback(()=>callback(false));
                    }
                });
            }catch(e){
                callback(false, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION);
            }
        });
    }


    insertCustomerWithUUID(uuid, callback){ 
        this.connect(conn=>{
            try{
                const cardController = CardController.getInstance();  
                conn.beginTransaction(e=>{
                    this.insertCustomer((customerId) => {
                        if(customerId){
                            cardController.insertUUIDCard(uuid, customerId, (newCardId)=>{
                                if(!newCardId){
                                    conn.rollback(()=>{
                                        callback(false, httpStatus.INTERNAL_ERROR, messages.QUERY_NOT_EXECUTED);        
                                    });
                                }else{
                                    conn.commit(()=>{
                                        callback(newCardId);
                                    })
                                }
                            });
                        }else{
                            conn.rollback(()=>{
                                callback(false, httpStatus.INTERNAL_ERROR, messages.QUERY_NOT_EXECUTED);
                            })                
                        }
                    });  
                });
            }catch(e){
                callback(false, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION);
            }
        });
    }  

    getCustomerId(cardId, callback){
        this.connect(conn=>{
            try{
                const query = 'select customer_id from cards where card_id = ?';
                conn.query(query, [cardId],(err_, result) =>{
                    console.log(result);
                    if(!err_ && result){
                        if(result.length == 0){
                            conn.rollback(()=>callback(false));
                        }else{
                            callback(result[0]["customer_id"]);
                        }
                    }else{
                        console.log(err_);
                        conn.rollback(()=>callback(false, messages.NOT_FOUND));
                    }     
                });
            }catch(e){
                callback(false, messages.CRASHING_OPERATION);
            }
        });
    }

    checkIfCustomerExists(existingCustomerId, callback){
        this.connect(conn=>{
            try{
                const callback_ = (err_, result) => {
                    if(!err_ && result){
                        if(result.length > 0){
                            callback(true);
                        }else{
                            console.log(err_);
                            conn.rollback(()=>{
                                callback(false, messages.QUERY_RETURNED_NO_RESULTSET);
                            });
                        }
                        
                    }else{
                        console.log(err);
                        conn.rollback(()=>{
                            callback(false, messages.QUERY_NOT_EXECUTED);
                        });
                        
                    }
                }  
                conn.query('select id from records where id = ? and type = "customer"', [existingCustomerId], callback_);
            }catch(e){
                callback(false, messages.CRASHING_OPERATION);
            }
        });
    }


    static getInstance(){
        if(CustomerController.customerController == null){
            CustomerController.customerController = new CustomerController();
        }
        return CustomerController.customerController;
    }

}

module.exports           = CustomerController;
