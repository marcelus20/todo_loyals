import {Component, React} from "react";
// import {Container, Row, Col} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axiosInstance from "../axiosInstance";
// import axios from axios;

class Cards extends Component{

    constructor(props){
        super(props);

        this.state = {
            
        };
    }

    send = () => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "http://34.253.53.63:3000/api/cards";
        axiosInstance.get(proxyurl+url,{
            "headers":{
                "__token__" : 'XNnzXyVCMO0tUzyGp4NNWMOM7zrVcZUnmOeOVaF8Qdl1AlcnpB',
            }
        })
            .then(res=>{
                console.log(res.data);
                this.setState(
                    {"cards": res.data["cards"]}
            )}).catch(e=>{
                console.log(e);
            });
    }
    


    
    render(){
        if(!this.state.cards){
            this.send();
        }
        return (<Container>
            <Row>
              <Col>1 of 2</Col>
              <Col>2 of 2</Col>
            </Row>
            <Row>
              <Col>1 of 3</Col>
              <Col>2 of 3</Col>
              <Col>3 of 3</Col>
            </Row>
          </Container>);
        // return !this.state.cards?"Loading...":<Container>
        //     {this.state.cards
        //     .map(card=><Row>
        //         {Object.keys(card)
        //             .map(key=><Col>
        //             {card[key]}
        //             </Col>)}
        //     </Row>)}
        // </Container>
    }
}

export default Cards;