<p>
This application will require a docker daemon installed in the system. 
Once the the daemon has been installed, open it and navigate to the docker-compose file folder and issue the commands bellow to run application
</p>

<div>
    <h3>deploying docker application</h3>
    <code>>>docker-compose up --build</code>
</div>
<hr/>
<div>
    <h3>Shutting down docker application</h3>
    <table>
        <th>
            <td>Task</td>
            <td>Command</td>
        </th>
        <tr>
            <td>1</td>
            <td>Shut down application</td>
            <td><code>>>docker-compose down</code></td>
        </tr>
        <tr>
            <td>2</td>
            <td>Remove images of the mysql and alpine VM (todo_project_backend)</td>
            <td>
                <code>>>docker image rm $(docker image ls | grep todo_project_backend | awk '{print $3}') && docker image rm $(docker image ls | grep mysql | awk '{print $3}')</code>
            </td>
        </tr>
        <tr>
            <td>3</td>
            <td>Remove volumes (free HD)</td>
            <td><code>>>docker volume prune</code></td>
        </tr>
        <tr>
            <td>4</td>
            <td>Clean all images</td>
            <td><code>>>docker image prune</code></td>
        </tr>
        <tr>
            <td>5</td>
            <td>Clear any containers netowrk connections</td>
            <td><code>>>docker network prune</code></td>
        </tr>
    </table>
</div>

<hr/>
<div>
    <h3>Testing the API</h3>
    <table>
        <th>
            <td>Routers</td>
            <td>Expected parameters</td>
            <td>What it does</td>
        </th>
        <tr>
            <td>1</td>
            <td><code>/api/balance</code></td>
            <td>
                <ul>
                    <li>GET:
                        <ul>
                            <li>Required: :uuid</li>
                            <li>Optional: None</li>
                        </ul>
                    </li>
                </ul>
            </td>
            <td>
            <!-- <div>
                router.get('/api/customers', handlers.getCustomer);
                router.get('/api/customers/:id', handlers.getCustomer);
                router.get('/api/cards/', handlers.getCard);
                router.get('/api/cards/:uuid/', handlers.getCard);
                router.get('/api/balance/:uuid', handlers.getBalance);
                router.get('/api/transactions/:uuid', handlers.getTransactions);
                router.get('/api/transactions/', handlers.getTransactions);
                router.post('/api/customers/cards/', handlers.createCustomerWithUUID);
                router.post('/api/customers/cards/:customer_id', handlers.createCustomerWithUUID);
                router.post('/api/transactions/:value', handlers.createTransaction);
            </div> -->
                <ul>
                    <li>GET: Retrieve the balance (amount of acummulated points) of a spcific card. the :uuid parameter must be passed</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td><code>/api/customers</code></td>
            <td>
                <ul>
                    <li>GET:
                        <ul>
                            <li>Required: None</li>
                            <li>Optional: /:id</li>
                        </ul>
                    </li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>GET: Lists customer records. If the :id is passed, it will retrieve info about customer with the id provided</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>3</td>
            <td><code>/api/cards/</code></td>
            <td>
                <ul>
                    <li>GET:
                        <ul>
                            <li>Required: None</li>
                            <li>Optional: /:uuid, </li>
                        </ul>
                    </li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>GET: Retrive a list of cards info from the database. If :uuid is specified, the result will be a specific card with provided uuid if exists.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>4</td>
            <td><code>/api/transactions/</code></td>
            <td>
                <ul>
                    <li>GET:
                        <ul>
                            <li>Required: None</li>
                            <li>Optional: :uuid, </li>
                        </ul>
                    </li>
                    <li>POST:
                        <ul>
                            <li>Required: :uuid</li>
                            <li>Optional: None, </li>
                        </ul>
                    </li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>GET: Get all ofrecords of the transaction entity. If uuid is passed, it gets transactions associated with a specific card.</li>
                    <li>POST: Add a transaction record to the transactions entity. The uuid parameter must be specified cause the value (point) will be added to a specific card.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>4</td>
            <td><code>/api/customers/cards/</code></td>
            <td>
                <ul>
                    <li>POST:
                        <ul>
                            <li>Required: uuid</li>
                            <li>Optional: :customer_id, </li>
                        </ul>
                    </li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>POST: If customer_id is not passed, it will create a new customer and associate the passed uuid to this recently created customer. If customer_id is passed, it will add a new card to that customer, if customer_id value is an existing customer id in the records table. </li>
                </ul>
            </td>
        </tr>
    </table>
</div>




