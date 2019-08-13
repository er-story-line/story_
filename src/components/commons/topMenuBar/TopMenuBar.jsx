import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { UPDATE_CURRENT_LINE } from 'src/reducers/accounts'
import { getCurrentLine } from 'src/selectors/lines'
import { Icon, Dropdown, Menu } from 'semantic-ui-react'
import StyledComponent from './styled'
import AddNew from './partials/newLine'

class topMenuBar extends React.PureComponent {
  render() {
    const { lines, curIndex, updateCurrentLine } = this.props
    const lineKeys = Object.keys(lines)
    return (
      <StyledComponent>
        <Dropdown item text="_s">
          <Dropdown.Menu>
            {lineKeys.map(resource => (
              <Dropdown.Item
                onClick={() => lines[resource].index !== curIndex
                  && updateCurrentLine(resource)
                }
                key={resource}
                active={lines[resource].index === curIndex}
                text={lines[resource].title}
              />
            ))}
            {lineKeys.length === 0 && (
              <Dropdown.Item text="No Lines Yet :(" />
            )}
          </Dropdown.Menu>
        </Dropdown>
        <AddNew />
        <Menu.Menu position="right">
          <Menu.Item header name="Story_">
            <Icon name="book" />
            Story_
          </Menu.Item>
        </Menu.Menu>
      </StyledComponent>
    )
  }
}

topMenuBar.propTypes = {
  lines: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      index: PropTypes.string.isRequired,
    }).isRequired,
  ),
  curIndex: PropTypes.string.isRequired,
  updateCurrentLine: PropTypes.func.isRequired,
}

topMenuBar.defaultProps = () => ({
  children: null,
})

/**
 * map state to props
 * @param  {object} state    state tree
 * @return {object}          state props
 */
const mapStateToProps = state => ({
  curIndex: getCurrentLine(state).index || null,
  lines: state.lines.lines,
})

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
  mapStateToProps,
  mapDispatchToProps,
)(topMenuBar)
