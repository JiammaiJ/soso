import React from 'react'
import {
    Form,
    Input,
    Icon
} from 'antd'

class AddModal extends React.Component {
    constructor(props) {
        super(props)
        this.state={}
    }
    componentDidMount() {
        const form = this.props.form
        this.props.getForm(form)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { categoryName } = this.props
        return (
            <Form>
                <h1>
                    {
                        categoryName===''?'商品分类':categoryName
                    }
                </h1>
                <Form.Item style={{ marginBottom: '10px' }}>
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message:'所有命运的馈赠,早已在暗中标好了价码' }
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
const Wrapper = Form.create({ name: 'add_modal' })(AddModal)
export default Wrapper

