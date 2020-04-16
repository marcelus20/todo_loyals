import React from "react";
import {Table } from 'antd';


class Transactions extends React.Component{


    constructor(props){
        super(props);

        this.state = {
            transactions : props.transactions,
        }
    }
    
    
    render(){
        const dataSource = [...this.state.transactions].map((transaction, index)=>{
            transaction.key=`transaction${index}`;
            return transaction;
        });
        const columns = [
            {
                title: "transaction id",
                dataIndex: "id",
                key : "id"   
            },{
                title: "Date processed",
                dataIndex: "date",
                key : "date"   
            },{
                title: "Card id",
                dataIndex: "card_id",
                key : "card_id"   
            },
            {
                title: "Customer id",
                dataIndex: "customer_id",
                key : "customer_id"   
            },{
                title: "Value",
                dataIndex: "value",
                key : "value",
                render: text=><span>{text}</span>
            }
        ];
        return (
            <Table dataSource={dataSource} columns={columns} />
        );
    }
}

export default Transactions;