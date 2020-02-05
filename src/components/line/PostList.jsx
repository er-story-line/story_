import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentLineRaw } from 'src/selectors/lines'
import CardGroup from 'src/components/theme/CardGroup'
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

    const lis = raw.map(item => {
      const { resource } = item

      return <Post key={resource} resource={resource} />
    })

    return <CardGroup>{lis}</CardGroup>
  }
}

PostList.propTypes = {
  raw: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
        .isRequired,
      resource: PropTypes.string.isRequired,
    })
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
const mapStateToProps = state => ({ raw: getCurrentLineRaw(state) })

export default connect(mapStateToProps)(PostList)
