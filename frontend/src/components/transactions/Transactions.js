import React from "react";
// import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import axiosInstance from "../../tools/axiosInstance";
import Table from 'react-bootstrap/Table'
import Spinner from "react-bootstrap/Spinner"

class Transactions extends React.Component{

    constructor(props){
        super(props);
        this.state = {}
    }


    requestTransactions = () => {
        axiosInstance.get(`/transactions/${this.state.uuid}`)
            .then(res=>{
                const transactionsObject = {
                    "transactions" : res.data.transactions
                };
                console.log(res.data.transactions)
                this.setState(transactionsObject);
            })
    }

    componentDidMount(){
        const uuid = this.props.uuid;

        if(!this.state.uuid){
            const uuidObject = {
                "uuid":uuid
            }
            this.setState(uuidObject, this.requestTransactions);
        }
    }


    render(){
        // console.log(transactions)
        if(!this.state.transactions){
            return (<Spinner animation="grow" size="xl"/>)
        }else{
            return(
                <Table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>date</th>
                            <th>card id</th>
                            <th>customer id</th>
                            <th>value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(this.state.transactions)
                            .map(id=>{
                            const transaction = this.state.transactions[id];  
                            return <tr key={id}><td>{id}</td>{Object.keys(transaction)
                                // .filter(key=>transaction[key].value>0)
                                .map(key=><td key={key+id}>{transaction[key]}</td>)}</tr>
                        })}
                    </tbody>
                </Table>
                );
            }
        }

        

}


export default Transactions;