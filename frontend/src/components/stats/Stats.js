import React from "react";
import Customer from "../customers/Customer"
import Redemption from "../redemption/Redemption";
import Transactions from "../transactions/Transactions";
import {Row, Col, Empty, Skeleton, Divider, Spin} from "antd";
import axiosInstance from "../../tools/axiosInstance";





class Stats extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
    }



    
    
    
    requestCustomers = () => {
        axiosInstance.get('/customers').then(res=>{
            this.setState({'customers' : Object.keys(res.data.customers).map(key=>{
                const customer = res.data.customers[key];
                customer.id = key;
                return customer;
            })});
        }).catch(e=>{
            console.log(e);
        })
    }
    
    requestTransactions = (callback) => {
        axiosInstance.get('/transactions').then(res=>{
            this.setState({"transactions": Object.keys(res.data.transactions).map(key=>{
                const transaction = res.data.transactions[key];
                transaction.id = key;
                return transaction;
            })}, callback);
        }).catch(e=>console.log(e));
    }
    
    componentDidMount(){
        this.requestTransactions(this.requestCustomers);
    }



    render(){
        return (
            <div>
                <Row>
                    <Col span={12}>
                        
                        {!this.state.transactions?(
                            <Spin><Skeleton /></Spin>
                        ):(
                            <Redemption 
                            redemptionsGiven = {
                                this.state.transactions.filter(transaction=>transaction.value < 0).length
                            }
                            />
                        )}        
                    </Col>
                    <Col span = {12}>
                        {!this.state.customers?(
                            <Spin><Skeleton /></Spin>
                        ):(
                            <Customer 
                             customerAmount = {this.state.customers.length}
                            />
                        )}
                    </Col>
                </Row>
                <Divider orientation="left">Table of Redemptions</Divider>
                <Row>
                    <Row>
                        <Col span={24}>{!this.state.transactions?(
                            <Empty />
                        ):(
                            <Transactions 
                                transactions = {this.state.transactions.filter(transaction=>transaction.value < 0)} 
                            />
                        )}</Col>
                    </Row>
                    
                </Row>
                <Divider orientation="left">Table of Transactions</Divider>
                <Row>
                    <Col span={24}>{!this.state.transactions?(
                        <Empty />
                    ):(
                        <Transactions transactions = {this.state.transactions} />
                    )}</Col>
                </Row>
            </div>
            

        );
        
    }
}

export default Stats;