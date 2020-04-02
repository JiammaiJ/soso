import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

// import { submitBlog, getBlog } from '../../api/index'
export default class Editor extends React.Component {

  state = {
    editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'), // 设置编辑器初始内容
    outputHTML: '<p></p>',
    test:`"<p><a href="www.baidu.com" target="_blank">www.baidu.com</a>你好，<strong>世界!</strong></p><p></p><hr/><p></p><div class="media-wrap image-wrap"><img src="data:image/png;base64,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"/></div><p></p>"`
  }

  componentDidMount () {
    this.isLivinig = true
    // 3秒后更改编辑器内容
    setTimeout(this.setEditorContentAsync, 3000)
  }

  componentWillUnmount () {
    this.isLivinig = false
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML()
    })
  }

  setEditorContentAsync = () => {
    this.isLivinig && this.setState({
      editorState: BraftEditor.createEditorState('<p>你好，<b>世界!</b><p>')
    })
  }
  submit = () => {
    // const obj = {
    //     content:this.state.outputHTML
    // }
    // submitBlog(obj).then(res => {
    //     console.log(res.data)
    // })
  }
  get = () => {
    // getBlog().then(res => {
    //     console.log(res.data)
    // })
  }
  render () {

    const { editorState, outputHTML } = this.state
    return (
      <div>
        <div className="editor-wrapper">
          <BraftEditor
            value={editorState}
            onChange={this.handleChange}
          />
        </div>
        <h5>输出内容</h5>
        <div className="output-content">{outputHTML}</div>
        <button onClick={this.submit}>submit</button>
        <button onClick={this.get}>get</button>
        <div dangerouslySetInnerHTML={{
              __html: this.state.test
            }}></div>
      </div>
    )

  }

}