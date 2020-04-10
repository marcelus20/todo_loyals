import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Balance from "../balance/Balance";
import UuidDisplay from "../uuidDisplay/UuidDisplay";
import Transactions from "../transactions/Transactions";
import UuidList from "../uuidList/UuidList";
import Spinner from 'react-bootstrap/Spinner';
import "./Dashboard.css";

class Dashboard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            "hide" : true
        }
    }


    unHideDashboard = () => {
        this.setState({"hide": !this.state.hide});
    }

    updateSelectedCard = (card)=>{
        console.log(card);
        this.setState({
            "selectedCard": card
        }, this.unHideDashboard);

        
    }

    render(){
        return (
            <div>
            <Container className={`cardList ${this.state.hide?"":"hide"}`}  fluid >
                <Row className="justify-content-md-center">
                    <Col><UuidList selectedCard={card=>this.updateSelectedCard(card)}/></Col>
                </Row>
            </Container>
            
            <Container md={10} className={this.state.hide?"hide":""}>
                
                <Row>
                    <Col md={5}>
                        {!this.state.selectedCard?(
                            <Spinner animation="grow" size="xl"/>
                        ):(
                            <Balance uuid = {this.state.selectedCard.uuid} className="d-flex justify-content-around"/>
                        )
                        }
                    </Col>
                    <Col md={5}>{
                        !this.state.selectedCard?(
                            <Spinner animation="grow" size="xl"/>
                        ):(
                            <UuidDisplay uuid = {this.state.selectedCard.uuid} className="d-flex justify-content-around"/>
                        )
                    }</Col>
                </Row>
    
                <Row>
                    <Col md={10}>{
                        !this.state.selectedCard?(
                            <Spinner animation="grow" size="xl"/>
                        ):(
                            <Transactions uuid = {this.state.selectedCard.uuid}/>
                        )
                    }
                    </Col>                
                </Row>
            </Container>
            </div>  
        );
    }
}

export default Dashboard;