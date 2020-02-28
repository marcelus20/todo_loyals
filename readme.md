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
            <td><code>/api/loyaltyPoints</code></td>
            <td>
                <ul>
                    <li>GET:
                        <ul>
                            <li>Required: None</li>
                            <li>Optional: None</li>
                        </ul>
                    </li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>GET: Responds all tuples in the loyal_points relation in JSON format</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td><code>/api/promo</code></td>
            <td>
                <ul>
                    <li>GET:
                        <ul>
                            <li>Required: None</li>
                            <li>Optional: None</li>
                        </ul>
                    </li>
                    <li>PUT:
                        <ul>
                            <li>Required: None</li>
                            <li>Optional: None</li>
                        </ul>
                    </li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>GET: Respond the number of times the promotion was redeemed</li>
                    <li>PUT: Update the redeemed promo by incrementing in one</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>3</td>
            <td><code>/api/loyaltyPoint/</code></td>
            <td>
                <ul>
                    <li>GET:
                        <ul>
                            <li>Required: uid</li>
                            <li>Optional: None</li>
                        </ul>
                    </li>
                    <li>POST:
                        <ul>
                            <li>Required: uid</li>
                            <li>Optional: None</li>
                        </ul>
                    </li>
                    <li>PUT:
                        <ul>
                            <li>Required: uid</li>
                            <li>Optional: points</li>
                        </ul>
                    </li>
                    <li>DELETE:
                        <ul>
                            <li>Required: uid</li>
                            <li>Optional: None</li>
                        </ul>
                    </li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>GET: Get info about a specific loyal_point record</li>
                    <li>POST: register to the loyal_point relation a new record</li>
                    <li>PUT: Respond the number of times the promotion was redeemed. If points parameter is not specified, then it will increment in one</li>
                    <li>DELETE: Remove a record from loyal_point</li>
                </ul>
            </td>
        </tr>
    </table>
</div>




