import React from "react";
import axiosInstance from "../../../tools/axiosInstance";
import { List, Row, Col, Skeleton, Spin } from 'antd';
import "./uuidList.css"


class UuidList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            "itemColor":{
                "hilighted":"red",
                "normal":"white"
            }
        }
    }



    requestCardList = () => {
        axiosInstance.get('/cards')
            .then(res=>{
                console.log(res.data.cards);
                const cardsObject = {
                    "cards":res.data.cards
                }
                this.setState(cardsObject);
            })
    }

    componentDidMount(){
        if(!this.state.cards){
            this.requestCardList();
        }
    }

    selectCard = (item) => {
        const card = this.state.cards.filter(card=>card.uuid === item)[0];
        this.setState({
            "selectedCard": card,
            "selectedUUID": card.uuid
        },()=>{
            this.props.selectCard(card)
        });
    }
    
    render() {
    let data = []
    if(this.state.cards){
        data = Object.keys(this.state.cards).map(key=>this.state.cards[key].uuid);
    }


    return (
        <Row>
            <Col span={24}>
            {this.state.cards?(
                <List
                size="large"
                header={<div>UUID</div>}
                footer={<div>cards</div>}
                bordered
                dataSource={data}
                renderItem={
                    item => <List.Item onClick={
                        ()=>this.selectCard(item)
                    } 
                    className={"pointer"}
                    style={this.state.selectedUUID === item?{backgroundColor:"#e6fffb"}:null}>{item}</List.Item>}
                />
            ):(<div>
                <Spin size="large"><Skeleton /></Spin>
                </div>)}   
            </Col>
        </Row>
        );
    
    }

}

export default UuidList;