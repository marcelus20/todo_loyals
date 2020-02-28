/**
 * @author Felipe Mantovani
 */

const conn                          = require('./models/connection'),
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
helpers.insertLoyaltyPoint         = (uid, callback) => { 
    conn.connect();   
    conn.con.query(`call addLoyalPoint('${uid}');`, (err_, result) => {
            if (err_) {
                callback(501, "Did not create point");
            }else{
                callback(201, true);

        }                
    });
}       

/**
 * Execute the selection query of a view
 * retuns the resultset of the select query
 * 
 * @param{callback} All required 
 */
helpers.selectAllLoyaltyPoints     = (callback) => {
    conn.connect();
    conn.con.query(`select * from selectAllLoyalPoints`, (err_, result) => {
        if (err_) {
            callback(501, false);
        }else{
            callback(200, result);
    }                
});
}

/**
 * Execute the selection query of a view
 * retuns the resultset of the select query
 * 
 * @param{callback} All required 
 */
helpers.selectPromo                = (callback)=>{
    conn.connect();
    conn.con.query(`select * from getPromosAmount;`, (err_, result) => {
        if (err_) {
            callback(500, false);
        }else{
            callback(200, result);
        }
    });  
}

/**
 * Execute the call of a stored procedure
 * update the table by incremment value of redeemed_promo by one
 * 
 * @param{callback} All required 
 */
helpers.updatePromo                = (callback)=>{
    conn.connect();
    conn.con.query(`call incrementPromo()`, (err_, result) => {
        if (err_) {
            callback(500, false);
        }else{
            callback(200, "Incremented successfuly");
        }
    });  
}

/**
 * Execute the call of a stored procedure
 * update the table by changing value of points of a given record
 * 
 * @param{loyaoutRecord, callback} All required 
 * loyoutyRecord should be an instance of pojo.LoyoutyRecord class
 */
helpers.updateLoyaltyPoint         = (loyaltyRecord, callback)=>{
    conn.connect();
    const {uid, points, date} = loyaltyRecord;
    conn.con.query(`call incrementLoyalPoint('${uid}','${points}')`, (err_, result) => {
        if (err_) {
            callback(500, false);
        }else{
            callback(200, `Incremented loyout point successfuly for ${uid}`);
        }
    });  
}
/**
 * Execute the call of a stored procedure
 * deletes a record from the table by the given uid
 * 
 * @param{uid, callback} All required 
 */
helpers.deleteLoyaltyPoint         = (uid, callback)=>{
    conn.connect();
    conn.con.query(`call deleteLoyalPointRecord('${uid}')`, (err_, result) => {
        if (err_) {
            callback(500, false);
        }else{
            callback(200, `Successfully deleted ${uid}`);
        }
    });  
}

module.exports                     = helpers;