import React from "react";
import axiosInstance from "../../requests/axiosInstance";

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

        if(!this.state["balance"]){
            //ask for new card
            return (<div>Loading...</div>);
        }else{
            return (
                <div className={this.props.cssClass}>
                    {this.state.balance}
                </div>
            );
        }

    }
}

export default Balance;

