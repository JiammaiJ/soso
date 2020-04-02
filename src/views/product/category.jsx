import React from 'react'
import {
    Card,
    Button,
    Icon,
    Table,
    Modal,
    message
} from 'antd'
import {
    getCategory,
    addCategory,
    deleteCategory,
    updateCatName
} from '../../api/index'
import AddModal from './modal/add-modal'
import UpdateModal from './modal/update-modal'
class Category extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categorys: [],
            subCategory: [],
            categoryName: '',
            categoryId: '0',
            visible: false,
            modalState: null//弹出框内容状态,0:添加,1:修改
        }
        this.columns = [
            {
                title: '商品分类',
                dataIndex: 'name',
            }, {
                title: '操作',
                width: 300,
                render: (data) => (<span>
                    <Button type="danger" onClick={() => this.delCategory(data)}>删除</Button>
                    <Button type="primary" onClick={() => this.showUpdateModal(data)}>修改</Button>
                    {
                        this.state.categoryId === '0' ? <Button type="default" onClick={() => this.showSubCategory(data)}>查看子类</Button> : null
                    }
                </span>)
            }
        ]
    }
    componentDidUpdate() {
    }
    componentDidMount() {
        this.getCate()
    }
    getCate = async () => {
        const { categoryId } = this.state
        const res = await getCategory(categoryId)
        const result = res.data
        if (categoryId !== '0') {
            const subCategory = result.data.reduce((init, item) => {
                const { _id, parentId, name } = item
                const obj = { key: _id, _id, name, parentId }
                init.push(obj)
                return init
            }, [])
            this.setState({ subCategory })
        } else {
            const categorys = result.data.reduce((init, item) => {
                const { _id, parentId, name } = item
                const obj = { key: _id, _id, name, parentId }
                init.push(obj)
                return init
            }, [])
            this.setState({ categorys })
        }
    }
    showSubCategory = (data) => {
        const { _id, name } = data
        this.setState({ categoryId: _id, categoryName: name }, () => {
            const { categoryId } = this.state
            this.getCate(categoryId)
        })
    }
    delCategory = async (data) => {
        const { _id, parentId } = data
        const { categorys, subCategory } = this.state
        if (parentId === '0') {
            Modal.confirm({
                title: '阿蒙三合一唯一性的本体被干掉,祂所有的替代他人命运的分身将消失',
                content: '这就是欺诈',
                okText: '确定',
                cancelText: '取消',
                onOk: async () => {
                    const res = await deleteCategory({ _id })
                    const result = res.data
                    if (result.code === 0 && result.msg === 'success') {
                        const newCat = categorys.filter(item => item._id !== _id)
                        this.setState({ categorys: newCat })
                    } else {
                        message.error('清楚阿蒙失败,阿蒙即将完成神之仪式');
                    }
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        } else {
            const res = await deleteCategory({ _id })
            const result = res.data
            if (result.code === 0 && result.msg === 'success') {
                const newSub = subCategory.filter(item => item._id !== _id)
                this.setState({ subCategory: newSub })
            } else {
                message.error('这只是一个被阿蒙替代命运的可怜虫');
            }
        }
    }
    showUpdateModal = (data) => {
        this.setState({modalState:1,visible:true})
        this.updateId = data._id
    }
    updateCategory = () => {
        this.updateform.validateFields(async (err,val) => {
            if(err){
                message.error('error')
            }else{
                const { name } = val
                const res = await updateCatName({_id:this.updateId,name})
                const result = res.data
                if(result.code===0&&result.msg==='success'){
                    this.getCate()
                    this.updateform.resetFields()
                    this.handleCancel()              
                }else{
                    message.error('后台错误')
                }
            }
        })
    }
    addCate = () => {
        this.addform.validateFields(async (err, val) => {
            if (err) {
                message.error('o pupupupupu')
            } else {
                const { name } = val
                const { categoryId, categorys, subCategory } = this.state
                const res = await addCategory({ name, parentId: categoryId })
                const result = res.data
                if (result.code === 0 && result.msg === 'success') {
                    if (categoryId !== '0') {//添加到subcategory
                        const newSub = subCategory
                        const { _id, parentId, name } = result.data
                        const obj = { key: _id, _id, name, parentId }
                        newSub.push(obj)
                        this.setState({ subCategory: newSub })
                    } else {//加到categorys大分类
                        const newSub = categorys
                        const { _id, parentId, name } = result.data
                        const obj = { key: _id, _id, name, parentId }
                        newSub.push(obj)
                        this.setState({ categorys: newSub })
                    }
                    message.success('嗯gia嗯gia 就嗯gia 蛙洗好桑gia')
                } else {
                    message.error('添加失败');
                }
            }
            this.addform.resetFields()
        })
    }
    handleOk = () => {
        //弹出框内容状态,0:添加,1修改
        const { modalState } = this.state
        if (modalState === 0) {
            this.addCate()
            this.handleCancel()
        } else if (modalState === 1) {
            this.updateCategory()
        }
    }
    handleCancel = () => {
        this.setState({ visible: false })
    }
    getModalTitle = () => {
        //弹出框内容状态,0:添加,1:修改
        const { modalState } = this.state
        switch (modalState) {
            case 0:
                return '添加'
            case 1:
                return '修改'
            default:
                return ''
        }
    }
    render() {
        const { categorys, categoryName, categoryId, subCategory, modalState } = this.state
        const { columns } = this
        const extra = <Button type="primary" onClick={() => this.setState({ modalState: 0, visible: true })}><Icon type="plus" />添加</Button>
        const title = <span>
            <span onClick={() => { this.setState({ categoryId: '0', subCategory: [] }) }} style={{ cursor: 'pointer', color: '#1890ff' }}>商品管理</span>
            {
                categoryId !== '0' ? <span><Icon type="right" style={{ margin: '0 5px' }} />{categoryName}</span> : null
            }
        </span>
        const modalTitle = this.getModalTitle()
        return (
            <Card title={title} extra={extra} style={{ width: '100%' }}>
                <Table dataSource={categoryId === '0' ? categorys : subCategory} columns={columns} pagination={{ pageSize: 5 }} />
                <Modal
                    title={<span>{modalTitle}</span>}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                >
                    {/* modalState 0 状态-添加 */}
                    {
                        modalState === 0 ? <AddModal getForm={(form) => this.addform = form} categoryName={categoryName} />
                        :<UpdateModal getForm={form => this.updateform=form} />
                    }
                </Modal>
            </Card>
        )
    }
}

export default Category