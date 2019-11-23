import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Styled from 'styled-components'
import { UPDATE_CURRENT_LINE } from 'src/reducers/accounts'
import { getCurrentLine } from 'src/selectors/lines'
import { Dropdown, Menu } from 'semantic-ui-react'
import StyledComponent from './styled'
import AddNew from './partials/newLine'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faListUl,
  faUserCircle,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { UserSession, AppConfig } from 'blockstack'
import { Person } from 'blockstack/lib/profiles/profileSchemas'

const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig })

const BrandTitle = Styled.span`
  padding: 0 0 5px 0;
  font-family: 'Bodini 48';
  letter-spacing: 3px;
  font-weight: 900;
  border-bottom: 1px solid #d1ad7d;
  color: #4F412F;
`

const StyledItem = Styled(Menu.Item)`
`

const iconColor = '#4F412F'

const signin = () => {
  userSession.redirectToSignIn()
}

const signOut = () => {
  userSession.signUserOut(window.location.origin)
}

class topMenuBar extends React.PureComponent {
  render() {
    const { lines, curIndex, curTitle, updateCurrentLine } = this.props
    const lineKeys = Object.keys(lines)
    let person = null
    let isSignedIn = false

    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(userdata => {
        console.log('Userdata received', userdata)
        window.history.replaceState({}, document.title, '/')
        //TODO this appears to need to actually reload the page
      })
    }

    if (userSession.isUserSignedIn()) {
      isSignedIn = true
      console.log('User is signed in')
      let userdata = userSession.loadUserData()
      console.log('userdata', userdata)
      person = new Person(userdata.profile)
      console.log('person', person)
    }

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
        <Menu.Menu position="left">
          <Dropdown
            item
            icon={
              <FontAwesomeIcon
                icon={faUserCircle}
                size="xs"
                color={iconColor}
              />
            }
          >
            <Dropdown.Menu>
              {isSignedIn ? (
                <>
                  <Dropdown.Item text={person.name() || 'Anonymous'} />
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={signOut} text="Sign Out" />
                </>
              ) : (
                <Dropdown.Item onClick={signin} text="Sign In" />
              )}
            </Dropdown.Menu>
          </Dropdown>
          <StyledItem>
            <FontAwesomeIcon icon={faListUl} size="xs" color={iconColor} />
          </StyledItem>
          <StyledItem>
            <FontAwesomeIcon icon={faSearch} size="xs" color={iconColor} />
          </StyledItem>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item header name="MemGhost">
            <BrandTitle>MEMGHOST</BrandTitle>
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
