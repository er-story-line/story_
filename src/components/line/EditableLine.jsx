import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentLineUri } from 'src/selectors/accounts'
import { Container } from 'semantic-ui-react'
import styled from 'styled-components'
import TopMenuBar from 'src/components/commons/topMenuBar/TopMenuBar'
import LineWrapper from 'src/components/line/LineWrapper'
import RepoFactory from 'src/repos/RepoFactory'
import PostEditor from '../editor/PostEditor'
import Line from './Line'

const EditorContainer = styled.div`
  margin-top: 2em;
`

class EditableLine extends React.Component {
  constructor(props) {
    super(props)

    this.lineRepo = RepoFactory.getLineRepo()

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
    const { resource } = this.props
    const { title } = this.lineRepo.getMetadata(resource)

    return (
      <>
        <TopMenuBar />
        <LineWrapper>
          <Container text style={{ margin: '2em' }}>
            {resource && title && <Line title={title} />}
            <EditorContainer ref={this.setEditorElement}>
              <PostEditor resource={resource} lineRepo={this.lineRepo} />
            </EditorContainer>
          </Container>
        </LineWrapper>
      </>
    )
  }
}

EditableLine.propTypes = {
  // state props
  resource: PropTypes.string,
  onError: PropTypes.func,
}

EditableLine.defaultProps = {
  resource: null,
  onError: err => console.error('error', err),
}

/**
 * map state to props
 * @param  {object} state    state tree
 * @return {object}          state props
 */
const mapStateToProps = state => ({ resource: getCurrentLineUri(state) })

export default connect(mapStateToProps)(EditableLine)
