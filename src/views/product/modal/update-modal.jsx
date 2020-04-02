import React from 'react'
import {
    Form,
    Input,
    Icon
} from 'antd'

class UpdateModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidUpdate() {
        this.props.getForm(this.props.form)
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form>
                <h3>宏大吕大咧头大 我就西嘎发bia</h3>
                <Form.Item style={{ marginBottom: '10px' }}>
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: '所有命运的馈赠,早已在暗中标好了价码' }
                        ]
                    })(
                        <Input
                            prefix={<Icon type="coffee" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="soso"
                        />,
                    )}
                </Form.Item>
            </Form>
        )
    }
}

const Wrapper = Form.create({ name: 'update_modal' })(UpdateModal)
export default Wrapper