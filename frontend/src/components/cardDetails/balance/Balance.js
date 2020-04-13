import React from "react";
import axiosInstance from "../../../tools/axiosInstance";
import {Row, Col, Skeleton, Divider, Progress, Spin} from "antd";

class Balance extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            
        };
    }


    
    retrieveCardInfo = () => {
        const uuid = this.state["uuid"];
        axiosInstance.get(`balance/${uuid}`)
            .then(res=>{
                const balance = {
                    balance: res.data.card.balance
                }
                this.setState(balance);
            });
    }


    
    componentDidMount(){
        const props = {...this.props};
        const uuid = props.uuid;
        const uuidObject = {
            "uuid":uuid
        };
        this.setState(uuidObject, this.retrieveCardInfo);
    }

    

    
    render(){
        return (
            <Row>
                {!this.state.balance?(
                    <Spin size="large"><Skeleton /></Spin>
                ):(
                    <Col span={8}>
                        <Divider orientation="left"> Balance </Divider>
                        <Progress type="circle" percent={this.state.balance*10} format={percent => `${percent/10} pts`} />
                    </Col>
                )} 
            </Row>
        );

    }
}

export default Balance;

