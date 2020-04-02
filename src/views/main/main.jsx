import React, { Suspense } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout, Icon, Spin } from 'antd'
// import anime from 'animejs/lib/anime.es.js';
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
import 'animate.css'
// 组件正常加载
import SiderNav from '../../components/sider-nav/sider-nav'
import Top from '../../components/header/header'
import Tags from '../../components/tags/tags'
// 组件懒加载
const Dashboard = React.lazy(() => import('../dashboard/dashboard'))
const Category = React.lazy(() => import('../product/category'))
const Manage = React.lazy(() => import('../product/manage'))
const Editor = React.lazy(() => import('../../components/braft-editor/braft-editor'))
const ERR = React.lazy(() => import('../app/404'))
// import Dashboard from '../dashboard/dashboard'
// import Category from '../product/category'
// import Manage from '../product/manage'
// import ERR from '../app/404'

// antd
const { Header, Sider, Content } = Layout;

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false
        }
        this.layout = React.createRef()
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        const soso_user = localStorage.getItem('soso_user')
        if (!soso_user) {
            return <Redirect to="/login" />
        }
        return (
            <Layout style={{ width: '100%', height: '100%' }}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    theme="dark"
                >
                    <SiderNav />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0, height: 'inherit' }}>
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,21,41,.08)' }}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                                style={{ marginLeft: '20px', color: '#1890ff' }}
                            />
                            <Top />
                        </div>
                        <Tags tags={this.props.tags} />
                    </Header>
                    <Content
                        style={{
                            margin: '0',
                            padding: 24,
                            background: '#ECEEF1',
                            minHeight: 280,

                        }}
                    >
                        {/* <TransitionGroup> */}
                        {/* <CSSTransition
                                key={this.props.location.pathname}
                                classNames="animated lightSpeedIn"
                                timeout={800}
                            > */}
                        <Suspense fallback={
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Spin size="large" tip="Loading" />
                            </div>
                        }>
                            <Switch>
                                <Redirect from="/" exact to="/dashboard" />
                                <Route path="/dashboard" component={Dashboard} />
                                <Route path="/product/category" component={Category} />
                                <Route path="/product/manage" component={Manage} />
                                <Route path="/components/braftEditor" component={Editor}/>
                                <Route component={ERR} />
                            </Switch>
                        </Suspense>
                        {/* </CSSTransition> */}
                        {/* </TransitionGroup> */}
                        <canvas className="fireworks"></canvas>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Main