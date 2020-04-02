import React from 'react'
import {
    Form,
    Icon,
    Input,
    Button,
    Modal
} from 'antd';

import style from './login.module.css'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ['H', 'e', 'l', 'l', 'o', ',', 'W', 'o', 'r', 'l', 'd', '!']
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {username,password} = values;
                if(username==='soso'&&password==='123'){
                    this.props.history.replace('/')
                    localStorage.setItem('soso_user','1')
                }else{
                    Modal.info({
                        title:'你在想屁吃!!!!!'
                    })
                }
            }else{
                Modal.info({
                    title:'你好像在搞事情!!!!!'
                })
            }
        });
    };
    render() {
        
        const text = this.state.text.map((item, index) => {
            return <span key={index}>{item}</span>
        })
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={style.login}>
                <div className={style.text}>
                    {text}
                </div>
                <Form onSubmit={this.handleSubmit} className={style.login_form}>
                    <Form.Item style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('username', {
                            rules: [
                                { required: true,message:() => <span style={{color:'white'}}>用户名不能为空</span>}
                            ]
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="soso"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message:() => <span style={{color:'white'}}>密码不能为空</span> }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="123"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item style={{ marginBottom: '10px' }}>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const WrappedLogin = Form.create({ name: 'normal_login' })(Login);
export default WrappedLogin 