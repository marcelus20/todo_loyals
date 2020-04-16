import React from "react";
import { Statistic, Row, Col} from 'antd';


class Redemption extends React.Component{


    constructor(props){
        super(props);

        this.state = {
            redemptionsGiven: props.redemptionsGiven
        }
    }

    
    render(){
        return (
        <Row>
            <Col span={12}>
            <Statistic title="Number of promotions redeemed" value={this.state.redemptionsGiven} />
            </Col> 
        </Row>
        );
    }
}

export default Redemption;