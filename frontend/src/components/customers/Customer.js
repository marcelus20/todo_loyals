import React from "react";
import { Statistic, Row, Col, Button } from 'antd';


class Customer extends React.Component{


    constructor(props){
        super(props);

        this.state = {
            customerAmount : props.customerAmount
        }
    }
    
    
    render(){
        return (
        <Row>
            <Col span={12}>
            <Statistic title="Number of customers" value={this.state.customerAmount} />
            </Col>
        </Row>
        );
    }
}

export default Customer;