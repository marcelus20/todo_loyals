import React from "react";
import { Row, Col, Avatar, Divider, Descriptions, Popover} from "antd";
import {LinkedinOutlined, GithubFilled} from '@ant-design/icons';

class About extends React.Component{

    constructor(props){
        super(props);

        this.state = {}
    }





    render(){
        
        return(
            <Row>
                <Col span={24}>
                    <Row>
                        <Col span={24}><h3>About TODO group - Hover mouse over the pictures to see social media profiles</h3></Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                        <Descriptions title="Group Info">
                            <Descriptions.Item label="name">TODO</Descriptions.Item>
                            <Descriptions.Item label="Composed of">4</Descriptions.Item>
                            <Descriptions.Item label="Description">Short text in this part</Descriptions.Item>
                    
                        </Descriptions>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Popover content={(
                                <div>
                                    <a href={"https://www.linkedin.com/in/okkiseleva/" }target="blanck"><LinkedinOutlined style={{fontSize:"5em"}}/></a>
                                    <a href={"https://github.com/okowl"} target="blanck"><GithubFilled  style={{fontSize:"5em"}}/></a>
                                </div>
                            )} title="Olga's Profile" placement="rightTop">
                                <Divider orientation="center" ><h3>Olga Kiseleva</h3></Divider>
                                <Avatar size={200}  src={"https://media-exp1.licdn.com/dms/image/C4D03AQHpz8z1l1-n_g/profile-displayphoto-shrink_800_800/0?e=1592438400&v=beta&t=MEhpn4_CIZdZIrYzZTmhKwN9Ko0-1QyPIEjkk6bIHCQ"}/>
                            </Popover>                   
                        </Col>                     
                        <Col span={12}>
                            <Popover content={(
                                <div>
                                    <a href={"https://www.linkedin.com/in/taras-boreyko-a24449131/"} target="blanck"><LinkedinOutlined  style={{fontSize:"5em"}}/></a>
                                    <a href={"https://github.com/Tarasyo"} target="blanck"><GithubFilled  style={{fontSize:"5em"}}/></a>
                                </div>
                            )} title = "Taras' Profile" placement="rightTop">
                                <Divider orientation="center" ><h3>Taras Boreyko</h3></Divider>
                                <Avatar size={200}  src={"https://media-exp1.licdn.com/dms/image/C4D03AQFOzXoO5L-AsA/profile-displayphoto-shrink_800_800/0?e=1592438400&v=beta&t=5i75lbAGFAgbDf7rv78Na1U9HoJm4CVKp__pO2t5Hfw"}/>
                            </Popover>
                            
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Popover content={(
                                <div>
                                    <a href={"https://www.linkedin.com/in/cauemd/"} target="blanck"><LinkedinOutlined  style={{fontSize:"5em"}}/></a>
                                    
                                    <a href={"https://github.com/cauemd"} target="blanck"><GithubFilled  style={{fontSize:"5em"}}/></a>
                                </div>
                            )} title="Caue's profile" placement="rightTop">
                                <Divider orientation="center" ><h3>Caue Duarte</h3></Divider>
                                <Avatar size={200} src={"https://media-exp1.licdn.com/dms/image/C5603AQETqYzYFR6Zwg/profile-displayphoto-shrink_800_800/0?e=1592438400&v=beta&t=dOf_POoGrmfmavTec0DrY0AaGsh7vNLb_X0Nt-O8hbI"} />
                            </Popover>
                            
                            
                        </Col>
                        <Col span={12}>
                            <Popover content={(
                                <div>
                                    <a href={"https://www.linkedin.com/in/felipe-mantovani20/"} target="blanck"><LinkedinOutlined  style={{fontSize:"5em"}}/></a>
                                    <a href={"https://github.com/marcelus20"} target="blanck"><GithubFilled  style={{fontSize:"5em"}}/></a>
                                </div>
                            )} title="Felipe's Profile" placement="rightTop">
                                <Divider orientation="center" ><h3>Felipe Mantovani</h3></Divider>
                                <Avatar size={200} src={"https://media-exp1.licdn.com/dms/image/C4D03AQH5Q1JpMz7NEA/profile-displayphoto-shrink_200_200/0?e=1592438400&v=beta&t=NbJ7y9dz2fWjdMR2hYKujhifS9IMRsE9B87FMXZ9meE"} />
                            </Popover>
                            
                            
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default About;
