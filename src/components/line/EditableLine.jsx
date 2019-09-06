import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentLineUri } from 'src/selectors/accounts'
import { Container, Modal } from 'semantic-ui-react'
import styled from 'styled-components'
import TopMenuBar from 'src/components/commons/topMenuBar/TopMenuBar'
import HeaderImg from 'src/components/commons/headerImg/HeaderImg'
import LineWrapper from 'src/components/line/LineWrapper'
import RepoFactory from 'src/repos/RepoFactory'
import MediaSelect from 'src/components/mediaselect/MediaSelect'
import { actionCreators } from 'src/reducers/modal'
import PostEditor from '../editor/PostEditor'
import Line from './Line'

const { closeModal } = actionCreators

const EditorContainer = styled.div`
  margin-top: 2em;
`

class EditableLine extends React.Component {
  constructor(props) {
    super(props)

    this.lineRepo = RepoFactory.getLineRepo()

    this.setEditorElement = this.setEditorElement.bind(this)
    this.onError = this.onError.bind(this)
  }

  onError(err) {
    const { onError } = this.props
    onError(err)
  }

  setEditorElement(el) {
    this.editorElement = el
  }

  render() {
    const {
      resource, modalOpen, modalContent, handleModalClose,
    } = this.props
    const { title } = this.lineRepo.getMetadata(resource)

    let overlay = null
    if (modalOpen) {
      switch (modalContent) {
        case 'MediaSelect':
          overlay = <MediaSelect />
          break
        default:
          overlay = null
      }
    }

    return (
      <>
        <TopMenuBar />
        {/* <HeaderImg /> */}
        <LineWrapper>
          <Container text style={{ margin: '2em' }}>
            {resource && title && <Line title={title} />}
            <EditorContainer ref={this.setEditorElement}>
              <PostEditor resource={resource} lineRepo={this.lineRepo} />
            </EditorContainer>
          </Container>
          <Modal
            open={modalOpen}
            dimmer="blurring"
            closeIcon
            closeOnDimmerClick
            closeOnEscape
            onClose={handleModalClose}
          >
            {overlay}
          </Modal>
        </LineWrapper>
      </>
    )
  }
}

EditableLine.propTypes = {
  // state props
  resource: PropTypes.string,
  onError: PropTypes.func,
  handleModalClose: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  modalContent: PropTypes.string,
}

EditableLine.defaultProps = {
  resource: null,
  modalContent: null,
  onError: err => console.error('error', err),
}

/**
 * map dispatch to props
 * @param  {function} dispatch dispatcher
 * @return {object}            mapped autobind action creators
 */
const mapDispatchToProps = dispatch => ({
  handleModalClose: () => dispatch(closeModal()),
})

/**
 * map state to props
 * @param  {object} state    state tree
 * @return {object}          state props
 */
const mapStateToProps = state => ({
  resource: getCurrentLineUri(state),
  modalOpen: state.modal.open,
  modalContent: state.modal.content,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditableLine)
