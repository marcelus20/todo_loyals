import React from "react";
import "./Dashboard.css";
import { Layout, Menu, Row, Col, Empty} from 'antd';
import Stats from "../stats/Stats";
import About from "../about/About";
import {
  AppstoreOutlined,
  BarChartOutlined,
} from '@ant-design/icons';

import CardDetails from "../cardDetails/CardDetails";

const { Header, Content, Footer, Sider } = Layout;

class Dashboard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            "show" : {
                "stats"        : true,
                "cards"        : false,
                "about"        : false
            }
        }
    }

    displayStats = () => {
      const show = {...this.state.show};
      Object.keys(show).forEach(key=>show[key] = false);
      show.stats = true;
      this.setState({show: show});
    }

    displayAbout = () => {
      const show = {...this.state.show};
      Object.keys(show).forEach(key=>show[key] = false);
      show.about = true;
      this.setState({show: show});
    }

    displayCardDetails = () => {
        const show = {...this.state.show};
        Object.keys(show).forEach(key=>show[key] = false);
        show.cards = true;
        this.setState({show: show});
    }
    
    render(){
        return (

            <Layout>
              <Sider
                style={{
                  overflow: 'auto',
                  height: '100vh',
                  position: 'fixed',
                  left: 0,
                }}
              >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1" onClick={this.displayStats}>
                    <BarChartOutlined />
                    <span className="nav-text">Stats</span>
                  </Menu.Item>
                  <Menu.Item key="2" onClick={this.displayCardDetails}>
                    <AppstoreOutlined />
                    <span className="nav-text">Card details</span>
                  </Menu.Item>
                  <Menu.Item key="3" onClick={this.displayAbout}>
                    <AppstoreOutlined />
                    <span className="nav-text">About TODO group</span>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Header className="site-layout-background" style={{ padding: 0, backgroundColor: "#f0f0f0" }} />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                  <div className="site-layout-background" style={{ padding: 24, textAlign: 'center', backgroundColor: "#f0f5ff" }}>
                    <Row>
                      {this.state.show.stats?(
                        <Col span={24}><Stats show = {this.state.show}/></Col>  
                        ):this.state.show.cards?(
                        <Col span={24}><CardDetails /></Col>
                      ):this.state.show.about?(
                        <Col span={24}><About /></Col>
                      ):(<Empty/>)}
                    </Row>
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>TODO - Loyals</Footer>
              </Layout>
            </Layout> 
        );
    }
}

export default Dashboard;