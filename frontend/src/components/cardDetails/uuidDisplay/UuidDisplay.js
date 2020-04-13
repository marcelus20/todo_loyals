import React from "react";
import { Timeline } from 'antd';

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
            <Timeline>
                <Timeline.Item>Select card UUID</Timeline.Item>
                <Timeline.Item>Check balance</Timeline.Item>
                <Timeline.Item>Check card associated transactions</Timeline.Item>
            </Timeline>
        );
        }
        
    }

}

export default UuidDisplay;