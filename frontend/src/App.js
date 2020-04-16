import React from 'react';
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import {Alert} from "antd";
import axiosInstance from './tools/axiosInstance';



class App extends React.Component{

  constructor(){
    super();

    this.state = {
      "connected" : true
    }
  }

  checkAPIStatus = () => {
    axiosInstance.get('/transactions')
      .then(res=>{
        if(res.status === 200){
          this.setState({"connected":true});
        }else{
          this.setState({"connected":false});
        }    
      })
      .catch(e=>this.setState({"connected":false}));
  }
  
  componentDidMount(){
    this.checkAPIStatus();
  }
  
  render(){
    return (
      <div>
        {!this.state.connected?(
          <Alert message="API is down. Please contact the administrator" type="warning" />
        ):(<div></div>)}
        <Dashboard />
      </div>
      
    );
  } 
}

export default App;
