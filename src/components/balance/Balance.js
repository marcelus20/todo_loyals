import React from "react";
import axiosInstance from "../../tools/axiosInstance";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner'

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
            <Jumbotron>
                {!this.state.balance?(
                <Spinner animation="grow" size="xl"/>
                ):(
                    <Container>
                        <Row xs={1}>
                            <Col>balance</Col>
                        </Row>
                        <Row xl={10}>
                            <Col><CircularProgressbar value={this.state.balance*10} text={`${this.state.balance}pts`} /></Col>
                        </Row>
                    </Container>
                )} 
            </Jumbotron>
        );

    }
}

export default Balance;

