import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentLineUri } from 'src/selectors/accounts'
import { Container, MenuItem } from 'semantic-ui-react'
import RepoFactory from 'src/repos/RepoFactory'
import Importer from 'src/lib/Importer'
import accounts from 'src/testdata/accounts'
import lines from 'src/testdata/lines'
import posts from 'src/testdata/posts'
import EditableLine from './line/EditableLine'
import TopMenuBar from './commons/topMenuBar/TopMenuBar'
import LineWrapper from './line/LineWrapper'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.lineRepo = RepoFactory.getLineRepo()

    // Import test data
    if (process.env.NODE_ENV === 'development') {
      const importer = new Importer()
      importer.importSingle({
        accounts,
        posts,
        lines,
      })
    }
  }

  render() {
    const { uri } = this.props

    return (
      <LineWrapper>
        <TopMenuBar>
          <MenuItem header>Story_ (aka Storyline)</MenuItem>
        </TopMenuBar>
        <Container text style={{ margin: '2em' }}>
          {uri && <EditableLine resource={uri} lineRepo={this.lineRepo} />}
        </Container>
      </LineWrapper>
    )
  }
}

/**
 * propTypes
 * @type {object}
 */
App.propTypes = {
  // state props
  uri: PropTypes.string,
}

App.defaultProps = () => ({
  uri: null,
})

/**
 * map state to props
 * @param  {object} state    state tree
 * @return {object}          state props
 */
const mapStateToProps = state => ({ uri: getCurrentLineUri(state) })

export default connect(mapStateToProps)(App)
