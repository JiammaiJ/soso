import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import {
    Tag,
    Icon
} from 'antd'
import { connect } from 'react-redux'
import { deleteTag } from '../../store/action'
class Tags extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidUpdate() {
    }
    tagClose = (index) => {
        this.props.deleteTag(index)
    }
    render() {
        const path = this.props.location.pathname
        const content = this.props.tags.map((item, index) => {
            return (
                <Tag
                    key={item.path}
                    closable
                    onClose={() => { this.tagClose(index) }}
                    style={item.path === path ? { color: '#ffffff', backgroundColor: '#42B983' } : {}}
                >   
                    {
                        item.path === path?
                        <Icon type="fire" theme="filled" style={{marginRight:'3px',color:'#F4516C'}} />
                        :null
                    }
                    <NavLink to={item.path}
                        activeStyle={{ color: '#ffffff', backgroundColor: '#42B983' }}
                    >{item.title}
                    </NavLink>
                </Tag>
            )
        })
        return (
            <div style={{ lineHeight: 'normal', padding: '3px 15px' }}>
                <Tag><NavLink to="/dashboard" activeStyle={{ color: '#ffffff', backgroundColor: '#42B983' }}>首页</NavLink></Tag>
                {content}
            </div>
        )
    }
}

export default connect(
    state => ({ tags: state.tags }),
    { deleteTag }
)(withRouter(Tags))

