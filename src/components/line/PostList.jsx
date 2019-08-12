import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'
import Post from './Post'

class PostList extends React.Component {
  constructor(props) {
    super(props)

    this.onError = this.onError.bind(this)
  }

  onError(err) {
    const { onError } = this.props
    onError(err)
  }

  render() {
    const { raw } = this.props

    const lis = raw.map((item) => {
      const { resource } = item

      return <Post key={resource} resource={resource} />
    })

    return <Card.Group>{lis}</Card.Group>
  }
}

PostList.propTypes = {
  raw: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
        .isRequired,
      resource: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onError: PropTypes.func,
}

PostList.defaultProps = {
  onError: err => console.error('error', err),
}

/**
 * map state to props
 * @param  {object} state    state tree
 * @return {object}          state props
 */
const mapStateToProps = (state) => {
  const curAccount = state.account.accounts[state.account.curAccountIndex]
  const currentLine = curAccount.lines.current.uri
  const { index } = state.line.lines[currentLine]
  const { raw } = state.line.indices[index]
  return { raw: raw || [] }
}

export default connect(mapStateToProps)(PostList)
