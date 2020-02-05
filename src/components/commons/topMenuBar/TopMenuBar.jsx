import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Styled from 'styled-components'
import { UPDATE_CURRENT_LINE } from 'src/reducers/accounts'
import { getCurrentLine } from 'src/selectors/lines'
import Menu from 'src/components/theme/Menu'
import MenuItem from 'src/components/theme/MenuItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faListUl,
  faUserCircle,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import StyledComponent from './styled'

const BrandTitle = Styled.span`
  padding: 0 0 5px 0;
  font-family: 'Bodini 48';
  letter-spacing: 3px;
  font-weight: 900;
  border-bottom: 1px solid #d1ad7d;
  color: #4F412F;
`

const StyledItem = Styled(MenuItem)`
`

const iconColor = '#4F412F'

class topMenuBar extends React.PureComponent {
  render() {
    const { lines } = this.props
    const lineKeys = Object.keys(lines)
    return (
      <StyledComponent>
        {/* <Dropdown item text={curTitle}>
          <Dropdown.Menu>
            {lineKeys
              .filter(resource => lines[resource].index !== curIndex)
              .map(resource => (
                <Dropdown.Item
                  onClick={() => updateCurrentLine(resource)}
                  key={resource}
                  active={lines[resource].index === curIndex}
                  text={lines[resource].title}
                />
              ))}
            <Dropdown.Item >
              <AddNew />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
        <Menu position="left">
          <StyledItem>
            <FontAwesomeIcon icon={faUserCircle} size="xs" color={iconColor} />
          </StyledItem>
          <StyledItem>
            <FontAwesomeIcon icon={faListUl} size="xs" color={iconColor} />
          </StyledItem>
          <StyledItem>
            <FontAwesomeIcon icon={faSearch} size="xs" color={iconColor} />
          </StyledItem>
        </Menu>
        <Menu position="right">
          <MenuItem header name="MemGhost">
            <BrandTitle>MEMGHOST</BrandTitle>
          </MenuItem>
        </Menu>
      </StyledComponent>
    )
  }
}

topMenuBar.propTypes = {
  lines: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      index: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  curIndex: PropTypes.string.isRequired,
  curTitle: PropTypes.string.isRequired,
  updateCurrentLine: PropTypes.func.isRequired,
}

/**
 * map state to props
 * @param  {object} state    state tree
 * @return {object}          state props
 */
const mapStateToProps = state => ({
  curIndex: getCurrentLine(state).index || null,
  curTitle: getCurrentLine(state).title || 'No Title',
  lines: state.lines.lines,
})

/**
 * map dispatch to props
 * @param  {function} dispatch dispatcher
 * @return {object}            mapped autobind action creators
 */
const mapDispatchToProps = dispatch => ({
  updateCurrentLine: uri =>
    dispatch({
      type: UPDATE_CURRENT_LINE,
      payload: { uri },
    }),
})

export default connect(mapStateToProps, mapDispatchToProps)(topMenuBar)
