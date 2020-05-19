import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import {
    Breadcrumb,
    Icon,
    Avatar,
    Menu,
    Dropdown
} from 'antd'
import siderConfig from '../../util/sider-config'
import style from './header.module.css'
class Top extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            drop_show: false
        }
    }
    // 跟据url,遍历查找对应的名字
    getBreadcrumb = () => {
        const path = this.props.location.pathname
        const breadArr = []
        const searchBread = (arr) => {
            arr.forEach(item => {
                if (path.includes(item.key)) {
                    breadArr.push(item.title)
                    if (item.children) {
                        searchBread(item.children)
                    }
                }
            })
        }
        if (path !== '/dashboard') {
            searchBread(siderConfig)
        }
        console.log(breadArr)
        return breadArr.map((item, index) => {
            return (
                <Breadcrumb.Item key={index}><span>{item}</span></Breadcrumb.Item>
            )
        })
    }
    //fullscreen
    fullscreen = () => {
        document.documentElement.requestFullscreen()
    }
    //下拉菜单显示隐藏
    toggleDrop = () => {
        this.setState({
            drop_show: !this.state.drop_show
        })
    }
    //模拟退出,接口还没写
    loginOut = () => {
        localStorage.removeItem('soso_user')
        this.props.history.replace('/login')
    }
    render() {
        const content = this.getBreadcrumb();
        const menu = (
            <Menu className={style.avatat_drop}>
                <Menu.Item>
                    <Link to="/dashboard">首页</Link>
                </Menu.Item>
                <Menu.Item>个人中心</Menu.Item>
                <Menu.Item onClick={this.loginOut}>退出登入</Menu.Item>
            </Menu>
        )
        return (

            <div className={style.top}>
                <Breadcrumb style={{ marginLeft: '20px', fontWeight: 'bold' }}>
                    <Breadcrumb.Item>
                        <Link to="/dashboard">首页</Link>
                    </Breadcrumb.Item>
                    {content}
                </Breadcrumb>
                <span style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Icon type="fullscreen" style={{ fontSize: '20px' }} onClick={this.fullscreen} />
                    <Dropdown overlay={menu} trigger={['click']}>
                        <div className={style.rightAvatar} onClick={this.toggleDrop}>
                            <span style={{ position: 'relative', cursor: 'pointer' }}>
                                <Avatar shape="square" size="large" icon="user" src={require('../../assets/img/avatar.gif')} />
                                <Icon type="caret-down" className={style.icondown} />
                            </span>
                        </div>
                    </Dropdown>
                </span>
            </div>
        )
    }
}

export default withRouter(Top)