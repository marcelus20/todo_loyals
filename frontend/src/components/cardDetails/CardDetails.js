import React from "react";

import { Row, Col, Skeleton, Divider, Spin } from 'antd';
import UuidList from "./uuidList/UuidList";
import Balance from "./balance/Balance";
import Transactions from "../transactions/Transactions";
import axiosInstance from "../../tools/axiosInstance";


class CardDetails extends React.Component{

    constructor(props){
        super(props);

        this.state = {}
    }


    requestTransactions = () => {
        axiosInstance.get(`/transactions/${this.state.selectedCard.uuid}`)
            .then(res=>{
                console.log(res.data.transactions);
                const transactionsObject = {
                    "transactions" : Object.keys(res.data.transactions)
                        .map(key=>{
                            const transaction = res.data.transactions[key];
                            transaction.id = key;    
                            return transaction;
                        })};
                this.setState(transactionsObject);
            })
    }


    selectCard = (card) => {
        this.setState({"selectedCard": card}, this.requestTransactions);
    }

    render(){
        return (
            <div>
                <Row>
                    <Col span={24}>
                    <Divider orientation="left">Click one of the UUIDs to display data</Divider>
                        <UuidList selectCard={card=>this.selectCard(card)} />
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                         {!this.state.selectedCard?(   
                            <Skeleton />
                         ):(
                            <Balance uuid={this.state.selectedCard.uuid}/>      
                         )}
                    </Col>
                    <Col span={16}>  
                         {!this.state.transactions?(
                            <Skeleton />
                         ):(
                            <Transactions transactions = {this.state.transactions} />  
                         )}
                    </Col>
                </Row>
            </div>
        );
    }



}

export default CardDetails;