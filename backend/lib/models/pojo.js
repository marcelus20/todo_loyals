
/**
 * @author Felipe Mantovani
 * 
 * 
 * This obect is a collection classes designed to store data. 
 * classes are meant to be used in a pre or pos data base interaction
 */
const pojo = {}

pojo.LoyaltyRecord = class {
    constructor(uid, points, date = new Date()){
        this.uid = uid;
        this.points = points;
        this.date = date;
    }
}





module.exports = pojo;