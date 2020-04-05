
/**
 * @author Felipe Mantovani
 * 
 * 
 * This obect is a collection classes designed to store data. 
 * classes are meant to be used in a pre or pos data base interaction
 */
const pojo = {}



//Entity Record
pojo.Record = class {
    constructor(id, date = new Date()){
        this.id = id;
        this.date = date;
    }
}

pojo.Customer = class extends pojo.Record{
    constructor(id, date = new Date(), cards = []){
        super(id, date);
        this.cards = cards;
    }
}

//Entity cards
pojo.Card = class extends pojo.Record{
    constructor(card_id, date = new Date(), customer_id, uuid, transactions = []){
        super(card_id, date);
        this.customer_id = customer_id;
        this.uuid = uuid;
        this.transactions = transactions
    }
}

//Entity Transaction
pojo.Transaction = class extends pojo.Record{
    constructor(transaction_id, date = new Date(), card_id, customer_id, value){
        super(transaction_id, date);
        this.card_id = card_id;
        this.customer_id = customer_id;
        this.value = value;
    }
}

pojo.AccessToken = class extends pojo.Record{
    constructor(accessTokenId, date = new Date(), token, expiryDate){
        super(accessTokenId, date);
        this.token = token;
        this.expiryDate = expiryDate;
    }
}


pojo.ViewingResult = class {
    constructor(){
        this.message = "Something went wrong";
    }

    static createViewingResult(message){
        const result = new ViewingResult();
        result.message = message;
        return result;
    }
}


module.exports = pojo;