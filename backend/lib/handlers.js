/**
 * @author Felipe Mantovani
 */

const helper        = require('./helper')
const LoyaltyRecord = require('./models/pojo').LoyaltyRecord;

const handlers      = {};
 
const headers       = {
    'Content-Type': 'application/json'
}


/**
 * Required fields: uid
 * Optional fields: none
 *  @todo add authentication token in the future
 */
handlers.loyaltyPoint = (req, res) => {
    const body = req.body;
    const uid  = body.uid;
    helper.insertLoyaltyPoint(uid, (status, flag)=>{
        let result = {};
        res.writeHead(status, headers);
        if(flag){
            result.message = "Created successfuly"
        }else{
            result.message = status == 500?"Did not connect to DB":status == 501?"Did not insert record":false;
        }
        res.end(JSON.stringify(result));
    });     
};


/**
 * Required fields: none
 * Optional fields: none
 * @todo add authentication token in the future
 */
handlers.getLoyaltyPoints = (req, res) => {
    helper.selectAllLoyaltyPoints((status, flag)=>{
        const result = {};
        if(!flag){
            result.message = "Did not select";
        }else{
            flag.forEach(record => {
                const {id, uid, points, date_} = record;
                result[id] = new LoyaltyRecord(uid, points, date_);
            });
        } 
        res.writeHead(status, headers);
        res.end(JSON.stringify(result));
    });
}

    
/**
 * Required fields: none
 * Optional fields: none
 * @todo add authentication token in the future
 */
handlers.getPromo = (req, res) => {
    const body            = req.body;
    const uid             = body.uid;
    helper.selectPromo((status, flag)=>{
        let result = {};
        res.writeHead(status, headers);
        if(flag){
            result.promo   = flag[0];
        }else{
            result.message = status == 500?"Did not connect to DB":status == 501?"Did not select":false;
        }
        res.end(JSON.stringify(result));
    });   
}

/**
 * Required fields: none
 * Optional fields: none
 * @todo add authentication token in the future
 */
handlers.putPromo = (req, res) => {
    helper.updatePromo((status, flag)=>{
        let result         = {};
        res.writeHead(status, headers);
        if(flag){
            result.message = flag;
        }else{
            result.message = status == 500?"Did not connect to DB":status == 501?"Did not insert record":false;
        }
        res.end(JSON.stringify(result));
    });   
}

/**
 * mandatory fields:uid
 * optional fields:points
 * 
 * if points is not specified, it will be incremmented in 1
 *  @todo add authentication token in the future
 */
handlers.putLoyaltyPoint = (req, res) => {
    const body          = req.body;
    const points        = typeof body.points == 'undefined'? 1 : body.points;
    const uid           = typeof body.uid == 'undefined'? false : body.uid; 
    const loyaltyRecord = new LoyaltyRecord(body.uid, points);
    helper.updateLoyaltyPoint(loyaltyRecord, (status, flag)=>{
        let result = {};
        res.writeHead(status, headers); 
        if(flag && points && uid){
            result.message = flag;
        }else{
            result.message = status == 500?"Did not connect to DB":status == 501?"Did not updated":false;
        }
        res.end(JSON.stringify(result));
    });  
}

/**
 * Required field: uid
 * Optional field: none 
 * @todo add authentication token in the future
 */
handlers.deleteLoyaltyPoint = (req, res) => {
    const body          = req.body;
    const uid           = typeof body.uid == 'undefined'? false : body.uid; 
    helper.deleteLoyaltyPoint(uid, (status, flag)=>{
        let result = {};
        res.writeHead(status, headers); 
        if(flag && uid){
            result.message = flag;
        }else{
            result.message = status == 500?"Did not connect to DB":status == 501?"Did not updated":false;
        }
        res.end(JSON.stringify(result));
    });  
}





module.exports = handlers;