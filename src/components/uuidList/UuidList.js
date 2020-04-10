import React from "react";
import axiosInstance from "../../tools/axiosInstance";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../Dashboard/Dashboard.css";


class UuidList extends React.Component{

    constructor(props){
        super(props);
        this.state = {}
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
    
    
    
    selectCard = (card) => {
        this.setState({
            "selectedCard": card
        },()=>{
            this.props.selectedCard(card)
        });
    }

    componentDidUpdate(){

    }
    
    
    componentDidMount(){
        if(!this.state.cards){
            this.requestCardList();
        }
    }



    render(){
        return !this.state.cards?(
            <Spinner animation="grow" />
        ):(
            <Container className="centralize">
                <Row>
                    <Col lg="auto" className="text-cetered">Card UUIDs</Col>
                </Row>
                <Row>
                    <Col lg="auto">
                        <ListGroup>
                            {this.state.cards.map(card=><ListGroup.Item key={card.id} onClick={()=>this.selectCard(card)}>{card.uuid}</ListGroup.Item>)}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        );
    }


}

export default UuidList;