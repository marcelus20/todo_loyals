import React from "react";
import axiosInstance from "../../../tools/axiosInstance";
import { List, Divider, Row, Col, Skeleton, Spin } from 'antd';


class UuidList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            
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
        const card = this.state.cards.filter(card=>card.uuid == item)[0];
        this.setState({
            "selectedCard": card
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
            <Divider orientation="left">Cards UUIDs</Divider>
            {this.state.cards?(
                <List
                size="large"
                header={<div>UUID</div>}
                footer={<div>cards</div>}
                bordered
                dataSource={data}
                renderItem={item => <List.Item onClick={()=>this.selectCard(item)}>{item}</List.Item>}
                />
            ):(<div>
                <Spin size="large"><Skeleton /></Spin>
                </div>)}   
            </Col>
        </Row>
        );
    

    // componentDidUpdate(){

    // }
    
    




    // render(){
    //     return !this.state.cards?(
    //         <Spinner animation="grow" />
    //     ):(
            
            
            
    //         // <Container className="centralize">
    //         //     <Row>
    //         //         <Col lg="auto" className="text-cetered">Card UUIDs</Col>
    //         //     </Row>
    //         //     <Row>
    //         //         <Col lg="auto">
    //         //             <ListGroup>
    //         //                 {this.state.cards.map(card=><ListGroup.Item key={card.id} onClick={()=>this.selectCard(card)}>{card.uuid}</ListGroup.Item>)}
    //         //             </ListGroup>
    //         //         </Col>
    //         //     </Row>
    //         // </Container>
    //     );
    // }
    }

}

export default UuidList;