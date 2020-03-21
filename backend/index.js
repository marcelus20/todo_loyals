 /**
  * @author Felipe Mantovani
  */
 
 //NPM modules
 const express     = require('express'),
 cors              = require('cors'),
 
 //My own libraries
config             = require('./lib/config'),
handlers           = require('./lib/handlers'),

//router
router             = express();


router.use(express.json());
router.use(cors());
/**GET */
router.get('/api/customers', handlers.getCustomer);
router.get('/api/customers/:id', handlers.getCustomer);
router.get('/api/cards/', handlers.getCard);
router.get('/api/cards/:uuid/', handlers.getCard);
router.get('/api/balance/:uuid', handlers.getBalance);
router.get('/api/transactions/:uuid', handlers.getTransactions);
router.get('/api/transactions/', handlers.getTransactions);

/**POST */
router.post('/api/customers/cards/', handlers.createCustomerWithUUID);
router.post('/api/customers/cards/:customer_id', handlers.createCustomerWithUUID);
router.post('/api/transactions/:value', handlers.createTransaction);






router.listen(config.httpPort, ()=>{
    console.log(`Running ${config.name} on ${config.httpPort} port`)
});
