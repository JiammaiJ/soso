import {ajax} from './ajax'

// export const submitBlog = (data) => ajax('/api/submitblog',data,'POST')

// export const getBlog = () => ajax('/api/getblog')

// 商品初始化,获取分类 parentId
export const getCategory = (data) => ajax('/api/soso/getcategory',{parentId:data},'GET')

// 添加商品分类 层级根据parentId 0-第一级列表 后续子元素根据第一级的_id做parentId
// 参数 name:名称 parentId:父Id
export const addCategory = (data) => ajax('/api/soso/addcategory',data,'POST')

// _id 删除所有parentId和 _id 删除父类的时候下面的子元素也删除 子元素parentId=_id
export const deleteCategory = (data) => ajax('/api/soso/deletecategory',{data},'DELETE')

// 根据_id更新名称
export const updateCatName = (data) => ajax('/api/soso/updatename',data,'POST')