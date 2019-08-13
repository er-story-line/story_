import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { UPDATE_CURRENT_LINE } from 'src/reducers/accounts'
import {
  MenuItem, Icon, Button, Input,
} from 'semantic-ui-react'
import RepoFactory from 'src/repos/RepoFactory'
import styled, { keyframes } from 'styled-components'

const MenuItemFlush = styled(MenuItem)`
  &::before {
    width: 0 !important;
  }
`
const MenuItemFlushLeft = styled(MenuItem)`
  max-width: 250px;
  width: 100%;
  padding-top: 8px !important;
  padding-bottom: 8px !important;
`

const FadeOut = () => keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const FadeIn = () => keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const ExpandAnimation = () => keyframes`
  from {
    width: 0px;
  }
  to {
    width: 250px;
  }
`

const CenteredIcon = styled(Icon)`
  margin: 0 !important;
`

const IconRelWrapper = styled.div`
  width: 21.234px;
  height: 18px;
`
const FadeOutIcon = styled.div`
  opacity: 1;
  position: absolute;
  animation: ${FadeOut()} 0.2s linear 0s 1 normal forwards;
`
const FadeInIcon = styled.div`
  opacity: 0;
  position: absolute;
  animation: ${FadeIn()} 0.2s linear 0s 1 normal forwards;
`

const SlideOut = styled.div`
  width: 0px;
  animation: ${ExpandAnimation()} 0.3s ease 0s 1 normal forwards;
`

class NewLine extends React.Component {
  constructor(props) {
    super(props)

    this.lineRepo = RepoFactory.getLineRepo()
    this.handleOnCreateLine = this.handleOnCreateLine.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.expandTitleInput = this.expandTitleInput.bind(this)
    this.toggleCreate = this.toggleCreate.bind(this)

    this.state = {
      expand: false,
      collapse: false,
      title: '',
    }
  }

  async handleOnCreateLine() {
    const { title } = this.state
    const { updateCurrentLine } = this.props
    try {
      const { mdResource } = await this.lineRepo.add(title)
      this.setState({
        title: '',
        expand: false,
        collapse: true,
      })
      updateCurrentLine(mdResource)
    } catch (error) {
      console.error(error)
    }
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value })
  }

  expandTitleInput() {
    this.setState({
      expand: true,
    })
  }

  toggleCreate() {
    this.setState(({ expand, collapse }) => ({
      expand: !expand,
      collapse: !collapse,
    }))
  }

  render() {
    const { expand, collapse, title } = this.state
    let dom = null
    if (expand === true) {
      dom = (
        <>
          <MenuItemFlush onClick={this.toggleCreate}>
            <IconRelWrapper>
              <FadeOutIcon>
                <CenteredIcon name="add" />
              </FadeOutIcon>
              <FadeInIcon>
                <CenteredIcon name="minus" />
              </FadeInIcon>
            </IconRelWrapper>
          </MenuItemFlush>
          <MenuItemFlushLeft>
            <SlideOut>
              <Input
                onChange={this.handleTitleChange}
                value={title}
                size="mini"
                fluid
                label={
                  <Button
                    primary
                    disabled={!title}
                    size="mini"
                    onClick={this.handleOnCreateLine}
                  >
                    <CenteredIcon name="check" />
                  </Button>
                }
                placeholder="Line Title..."
                style={{ maxHeight: '35px' }}
                labelPosition="right"
              />
            </SlideOut>
          </MenuItemFlushLeft>
        </>
      )
    } else if (collapse === true) {
      dom = (
        <>
          <MenuItem onClick={this.toggleCreate}>
            <CenteredIcon name="add" />
          </MenuItem>
        </>
      )
    } else {
      dom = (
        <MenuItem onClick={this.expandTitleInput}>
          <CenteredIcon name="add" />
        </MenuItem>
      )
    }

    return dom
  }
}

/**
 * propTypes
 * @type {object}
 */
NewLine.propTypes = {
  // dispatch props
  updateCurrentLine: PropTypes.func.isRequired,
}

/**
 * map dispatch to props
 * @param  {function} dispatch dispatcher
 * @return {object}            mapped autobind action creators
 */
const mapDispatchToProps = dispatch => ({
  updateCurrentLine: uri => dispatch({
    type: UPDATE_CURRENT_LINE,
    payload: { uri },
  }),
})

export default connect(
  null,
  mapDispatchToProps,
)(NewLine)
