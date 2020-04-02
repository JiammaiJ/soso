import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import {
    Menu, Icon
} from 'antd'
import { connect } from 'react-redux'
import { addTag } from '../../store/action'
import siderConfig from '../../util/sider-config'
const { SubMenu } = Menu

class SiderNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        this.getTags()
    }
    componentDidUpdate() {
        this.getTags()
    }
    initSider = (path) => {
        this.openKey = []
        this.selectedPath = path
        return siderConfig.map(item => {
            if (item.children) {
                if (path.includes(item.key)) {
                    this.openKey.push(item.key)
                }
                let basePath = item.key
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {item.children.map(citem => {
                            if (citem.children) {
                                if (path.includes(citem.key)) {
                                    this.openKey.push(citem.key)
                                }
                                basePath += citem.key
                                return (
                                    <SubMenu key={citem.key} title={citem.title}>
                                        {citem.children.map(citem => {
                                            return <Menu.Item key={citem.key}>
                                                <Link to={basePath + citem.key}>{citem.title}</Link>
                                            </Menu.Item>
                                        })}
                                    </SubMenu>
                                )
                            } else {
                                return <Menu.Item key={citem.key}>
                                    <Link to={basePath + citem.key}>{citem.title}</Link>
                                </Menu.Item>
                            }
                        })}
                    </SubMenu>
                )
            } else {
                return <Menu.Item key={item.key}>
                    <Link to={item.key}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>
            }
        })
    }
    getTags = () => {
        const path = this.props.location.pathname;
        const obj = {}
        if (path !== '/dashboard' && path!=='/') {
            const pathstr = path.split('/').slice(-1)[0]
            console.log(pathstr)
            const searchTitle = (arr) => {
                arr.forEach(item => {
                    if (item.children) {
                        searchTitle(item.children)
                    } else {
                        if (item.key.includes(pathstr)) {
                            obj.path = path
                            obj.title = item.title
                        }
                    }
                })
            }
            searchTitle(siderConfig)
        }
        if (obj.path) {
            this.props.addTag(obj)
        }
    }
    render() {
        const path = this.props.location.pathname
        const content = this.initSider(path)
        const { openKey, selectedPath } = this
        return (
            <Menu
                defaultSelectedKeys={'/dashboard'}
                defaultOpenKeys={openKey}
                selectedKeys={selectedPath}
                mode="inline"
                theme="dark"
            >
                {content}
            </Menu>
        )
    }
}

// export default withRouter(SiderNav)

export default connect(
    state => ({}),
    {addTag}
)(withRouter(SiderNav))