
const AbstractController = require('./AbstractController');
const config             = require('../lib/config');
const httpStatus         = config.httpStatus;
const messages           = config.messages;
const AccesToken         = require('../models/pojo').AccessToken;
const TokenController    = class extends AbstractController{

    static tokenController = null;

    constructor(){
        super();
    }

    selectToken(token, callback){
        this.connect(conn=>{
            try{
                const query = "select id, creation_date, token, expiry_date from view_access_tokens where token = ? and expiry_date > current_timestamp()";
                conn.query(query, [token], (err, result)=>{
                    if(err){
                        callback(false, httpStatus.INTERNAL_ERROR, "Something went wrong");
                    }else{
                        if(result.length == 0){
                            callback(false, httpStatus.FORBIDDEN, "Operation not permitted");
                        }else{
                            //as select r.id 'id', r.date 'creation_date', a.token 'token', a.expiry_date
                            const {id, creation_date, token, expiry_date} = result[0];
                            const accessToken = new AccesToken(id, creation_date, token, expiry_date);
                            callback(accessToken);
                        }
                    }
                });
            }catch(e){
                callback(false, httpStatus.INTERNAL_ERROR, messages.CRASHING_OPERATION);
            }
            
        });
    }


    static getInstance(){
        if(TokenController.tokenController == null){
            TokenController.tokenController = new TokenController();
        }
        return TokenController.tokenController;
    }
}
module.exports           = TokenController;