import React from "react";
import { Row, Col, Avatar, Divider, Descriptions} from "antd";

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
                            <Divider orientation="left" >Olga Kiseleva</Divider>
                            <Avatar size={200}  src={"https://media-exp1.licdn.com/dms/image/C4D03AQHpz8z1l1-n_g/profile-displayphoto-shrink_800_800/0?e=1592438400&v=beta&t=MEhpn4_CIZdZIrYzZTmhKwN9Ko0-1QyPIEjkk6bIHCQ"}/>
                        </Col>
                        
                        <Col span={12}>
                            <Divider orientation="left" >Taras Boreyko</Divider>
                            <Avatar size={200}  src={"https://media-exp1.licdn.com/dms/image/C4D03AQFOzXoO5L-AsA/profile-displayphoto-shrink_800_800/0?e=1592438400&v=beta&t=5i75lbAGFAgbDf7rv78Na1U9HoJm4CVKp__pO2t5Hfw"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Divider orientation="left" >Caue Duarte</Divider>
                            <Avatar size={200} src={"https://media-exp1.licdn.com/dms/image/C5603AQETqYzYFR6Zwg/profile-displayphoto-shrink_800_800/0?e=1592438400&v=beta&t=dOf_POoGrmfmavTec0DrY0AaGsh7vNLb_X0Nt-O8hbI"} />
                        </Col>
                        <Col span={12}>
                            <Divider orientation="left" >Felipe Mantovani</Divider>
                            <Avatar size={200} src={"https://media-exp1.licdn.com/dms/image/C4D03AQH5Q1JpMz7NEA/profile-displayphoto-shrink_200_200/0?e=1592438400&v=beta&t=NbJ7y9dz2fWjdMR2hYKujhifS9IMRsE9B87FMXZ9meE"} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default About;