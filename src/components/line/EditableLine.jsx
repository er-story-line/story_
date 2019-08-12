import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Line from './Line'
import PostEditor from '../editor/PostEditor'

const EditorContainer = styled.div`
  margin-top: 2em;
`

class EditableLine extends React.Component {
  constructor(props) {
    super(props)

    this.setEditorElement = this.setEditorElement.bind(this)
    this.scrollToEditor = this.scrollToEditor.bind(this)
    this.onError = this.onError.bind(this)
  }

  componentDidUpdate() {
    this.scrollToEditor()
  }

  setEditorElement(el) {
    this.editorElement = el
  }

  scrollToEditor() {
    this.editorElement.scrollIntoView({ behavior: 'smooth' })
  }

  onError(err) {
    const { onError } = this.props
    onError(err)
  }

  render() {
    const { resource, postRepo, lineRepo } = this.props
    const { title, index } = lineRepo.getMetadata(resource)
    console.log(title, 'title')
    console.log(index, 'index')

    return (
      <>
        {resource && title && (
          <Line
            title={title}
            index={index}
            postRepo={postRepo}
            lineRepo={lineRepo}
          />
        )}
        <EditorContainer ref={this.setEditorElement}>
          <PostEditor resource={resource} lineRepo={lineRepo} />
        </EditorContainer>
      </>
    )
  }
}

EditableLine.propTypes = {
  resource: PropTypes.string.isRequired,
  lineRepo: PropTypes.shape({
    getMetadata: PropTypes.func.isRequired,
    getIndex: PropTypes.func.isRequired,
  }).isRequired,
  postRepo: PropTypes.shape({
    get: PropTypes.func.isRequired,
  }).isRequired,
}

export default EditableLine
