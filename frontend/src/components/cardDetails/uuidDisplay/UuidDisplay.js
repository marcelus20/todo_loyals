import React from "react";
import { Descriptions, Skeleton } from 'antd';

class UuidDisplay extends React.Component{

    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        let card;
        if(this.props.card){
            card = this.props.card;
        }else{
            card = false;
        }
        const uuidObject = {"card": card}
        this.setState(uuidObject);
    }

    render(){
        if(!this.state.card){
            //nothing displayed
            return (<Skeleton />);
        }else{
        return (
            <Descriptions title={"UUID: "+this.state.card.uuid} layout="vertical">
                <Descriptions.Item label="Card ID">{this.state.card.id}</Descriptions.Item>
                <Descriptions.Item label="Customer ID">{this.state.card.customer_id}</Descriptions.Item>
                <Descriptions.Item label="Date of registration">{this.state.card.date}</Descriptions.Item>
            </Descriptions>
        );
        }
        
    }

}

export default UuidDisplay;