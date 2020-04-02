import React from 'react'
import {
    Row,
    Col,
    Icon,
    Card,
    Progress
} from 'antd'

import Battery from '../../components/beauty-css/battery/battery'
import Cloudy from '../../components/beauty-css/cloudy/cloudy'
import style from './dashboard.module.css'
class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count0: null,
            count1: null,
            count2: null,
            count3: null
        }
    }
    componentDidMount() {
        this.growNumber()
    }
    growNumber = () => {
        const grow = (item) => {
            let number = item.num;
            let initNum = Math.ceil(number * 0.6)
            let flag = false
            const step = Math.ceil(Math.ceil(number - initNum) / 20)
            const timer = setInterval(() => {
                initNum += step
                if (!flag) {
                    if (initNum > number) {
                        flag = true
                        this.setState({ [item.attr]: number })
                    } else {
                        this.setState({ [item.attr]: initNum })
                    }
                } else {
                    clearInterval(timer)
                }
            }, 60);
        }
        const attrs = [{ num: 10000, attr: 'count0' }, { num: 15600, attr: 'count1' }, { num: 8888, attr: 'count2' }, { num: 5200, attr: 'count3' }]
        attrs.forEach(item => {
            grow(item)

        })
    }
    render() {

        return (
            <div>
                <Row type="flex" justify="space-between" gutter={[16, 8]}>
                    <Col xs={22} sm={11} md={11} lg={6} xl={6} >
                        <div className={style.card0}
                        >
                            <div>
                                <Icon type="customer-service" theme="filled" />
                            </div>
                            <span>
                                <p>New Visits</p>
                                <span>{this.state.count0}</span>
                            </span>
                        </div>
                    </Col>
                    <Col xs={22} sm={11} md={11} lg={6} xl={6} >
                        <div className={style.card1}
                        >
                            <div>
                                <Icon type="rocket" theme="filled" />
                            </div>
                            <span>
                                <p>New Visits</p>
                                <span>{this.state.count1}</span>
                            </span>
                        </div>
                    </Col>
                    <Col xs={22} sm={11} md={11} lg={6} xl={6} >
                        <div className={style.card2}
                        >
                            <div>
                                <Icon type="fire" theme="filled" />
                            </div>
                            <span>
                                <p>New Visits</p>
                                <span>{this.state.count2}</span>
                            </span>
                        </div>
                    </Col>
                    <Col xs={22} sm={11} md={11} lg={6} xl={6} >
                        <div className={style.card3}
                        >
                            <div>
                                <Icon type="skin" theme="filled" />
                            </div>
                            <span>
                                <p>New Visits</p>
                                <span>{this.state.count3}</span>
                            </span>
                        </div>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between" gutter={[16, 8]}>
                    <Col xs={22} sm={11} md={11} lg={8} xl={8}>
                        <Card
                            hoverable
                            style={{ width: '100%', overflow: 'hidden' }}
                            // cover={<img alt="img" className={style.pichover} src={require('../../../src/assets/img/pic1.png')} />}
                        >
                            <div className={style.skill}>
                                <div>
                                    <img src={require('../../assets/img/avatar.gif')} alt="avatar" />
                                </div>
                                <div style={{ paddingTop: '20px' }}>
                                    <p style={{ margin: '0' }}>Javascript</p>
                                    <Progress strokeColor={{ '0%': '#108ee9', '100%': '#87d068', }} percent={60} />
                                    <p style={{ margin: '0' }}>Vue</p>
                                    <Progress strokeColor={{ '0%': '#108ee9', '100%': '#87d068', }} percent={60} />
                                    <p style={{ margin: '0' }}>React</p>
                                    <Progress strokeColor={{ '0%': '#108ee9', '100%': '#87d068', }} percent={60} />
                                    <p style={{ margin: '0' }}>Node.js</p>
                                    <Progress strokeColor={{ '0%': '#108ee9', '100%': '#87d068', }} percent={60} />
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={22} sm={11} md={11} lg={8} xl={8}>
                        <Card
                            hoverable
                            style={{ width: '100%', overflow: 'hidden' }}
                            // cover={<img alt="img" className={style.pichover} src={require('../../assets/img/pic2.jpg')} />}
                        >
                            <div className={style.skill}>
                                <div>
                                    <img src={require('../../assets/img/avatar.gif')} alt="avatar" />
                                </div>
                                <div style={{ paddingTop: '20px' }}>
                                    <p style={{ margin: '0' }}>银耳</p>
                                    <Progress strokeColor={{ '0%': '#108ee9', '100%': '#87d068', }} percent={66.6} />
                                    <p style={{ margin: '0' }}>雪梨</p>
                                    <Progress strokeColor={{ '0%': '#108ee9', '100%': '#87d068', }} percent={55.5} /> 
                                    <p style={{ margin: '0' }}>枸杞,红枣</p>
                                    <Progress strokeColor={{ '0%': '#108ee9', '100%': '#87d068', }} percent={88.8} />                                   
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={22} sm={11} md={11} lg={8} xl={8}>
                        <Card
                            hoverable
                            style={{ width: '100%', overflow: 'hidden' }}
                            // cover={<img alt="img" className={style.pichover} src={require('../../assets/img/pic3.jpg')} />}
                        >
                            <div className={style.skill}>
                                <div>
                                    <img src={require('../../assets/img/avatar.gif')} alt="avatar" />
                                </div>
                                <div style={{ paddingTop: '20px' }}>
                                    <p style={{ margin: '0' }}>桃蛋</p>
                                    <Progress strokeColor={{ '0%': '#108ee9', '100%': '#87d068', }} percent={66.6} />                         
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between" gutter={[20,10]}>
                    <Col xs={22} sm={11} md={11} lg={11} xl={11} style={{backgroundColor:'#ffffff'}}>
                        <Battery />
                    </Col>
                    <Col xs={22} sm={11} md={11} lg={11} xl={11} style={{backgroundColor:'#2EB5E5'}}>
                        <Cloudy />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Dashboard