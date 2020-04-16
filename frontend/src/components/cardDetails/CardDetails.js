import React from "react";

import { Row, Col, Skeleton, Timeline } from 'antd';
import UuidList from "./uuidList/UuidList";
import Balance from "./balance/Balance";
import Transactions from "../transactions/Transactions";
import axiosInstance from "../../tools/axiosInstance";
import UuidDisplay from "./uuidDisplay/UuidDisplay";


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


    flushOldSelectedCard = (card) => {
        this.setState({
            "selectedCard" : false,
            "transactions" : false
        }, () => this.selectCard(card));
    }
    
    selectCard = (card) => {
        this.setState({"selectedCard": card}, this.requestTransactions);
    }

    render(){
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <h3>Card Details</h3>
                        <Timeline>
                        <Timeline.Item color="green">Pick one UUID below</Timeline.Item>
                        <Timeline.Item color="blue">See details about the selected UUID</Timeline.Item>
                        <Timeline.Item color="red">See balance and transactions associated</Timeline.Item>
                        </Timeline>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <UuidList selectCard={card=>this.flushOldSelectedCard(card)} />
                    </Col>
                    <Col span={12}>
                        {!this.state.selectedCard?(
                            <Skeleton />
                        ):(
                            <UuidDisplay card = {this.state.selectedCard} />
                        )}
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