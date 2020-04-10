import React from "react";
import "./UuidDisplay.css";
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class UuidDisplay extends React.Component{

    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        let uuid;
        if(this.props.uuid){
            uuid = this.props.uuid;
        }else{
            uuid = ""
        }
        const uuidObject = {"uuid": uuid}
        this.setState(uuidObject);
    }

    render(){
        if(!this.state.uuid || this.state.uuid === ""){
            //nothing displayed
            return (<div>Loading...</div>);
        }else{
        return (
            <Jumbotron>
                <Container>
                    <Row xs={1}>
                        <Col fluid>uuid</Col>
                    </Row>
                    <Row xl={10}>
                        <Col fluid>{this.state.uuid}</Col>
                    </Row>
                </Container>
                
            </Jumbotron>
        );
        }
        
    }

}

export default UuidDisplay;