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

  onError(err) {
    const { onError } = this.props
    onError(err)
  }

  setEditorElement(el) {
    this.editorElement = el
  }

  scrollToEditor() {
    this.editorElement.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    const { resource, lineRepo } = this.props
    const { title } = lineRepo.getMetadata(resource)

    return (
      <>
        {resource && title && <Line title={title} />}
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
  onError: PropTypes.func,
}

EditableLine.defaultProps = {
  onError: err => console.error('error', err),
}

export default EditableLine
