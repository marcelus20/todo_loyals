
const express            = require('express');
const routes             = express.Router();
const CustomerController = require('../controllers/CustomerController');
const handler            = require('./handler');
const cors                 = require('cors');
const corsOptions          = {
                            origin: '*',
                            optionsSuccessStatus: 200,
                        }
routes.use(cors(corsOptions));
routes.use(express.json())




/**GET */
routes.get('/api/customers', handler.getCustomer);
routes.get('/api/customers/:id', handler.getCustomer);
routes.get('/api/cards/', handler.getCard);
routes.get('/api/cards/:uuid/', handler.getCard);
routes.get('/api/balance/:uuid', handler.getBalance);
routes.get('/api/transactions/:uuid', handler.getTransactions);
routes.get('/api/transactions/', handler.getTransactions);

/**POST */
routes.post('/api/customers/cards/', handler.createCustomerWithUUID);
routes.post('/api/customers/cards/:customer_id', handler.createCustomerWithUUID);
routes.post('/api/transactions/:value', handler.createTransaction);

routes.get('*', handler.notFound);
routes.post('*', handler.notFound);
routes.put('*', handler.notFound);
routes.delete('*', handler.notFound);

module.exports = routes;