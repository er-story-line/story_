import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'
import Post from './Post'

class PostList extends React.Component {
  constructor(props) {
    super(props)

    this.onError = this.onError.bind(this)
    this.onPostAdd = this.onPostAdd.bind(this)
    this.hookupEvents = this.hookupEvents.bind(this)
  }

  componentDidMount() {
    const { resource, lineRepo } = this.props
    if (!resource) {
      return
    }

    this.hookupEvents(lineRepo, resource)
  }

  /**
   * shouldComponentUpdate
   * @param  {object} nextProps next props
   * @param  {object} nextState next state
   * @return {boolean}          should component update
   */
  shouldComponentUpdate(nextProps) {
    console.log('shouldComponentUpdate')
    return true
  }

  onError(err) {
    const { onError } = this.props
    onError(err)
  }

  onPostAdd(update) {
    const { item, post } = update
    const { postRepo, lineRepo, index } = this.props
    console.log('Subscribed line received update', update)

    /* postRepo
      .add(post)
      .then(res => console.log(res))
      .catch(err => console.error(err))
    lineRepo
      .updateIndex(index, item)
      .then(res => console.log(res))
      .catch(err => console.error(err)) */
  }

  hookupEvents(lineRepo, resource) {
    lineRepo.events.off('post.add', this.onPostAdd)
    lineRepo.events.on('post.add', this.onPostAdd)
  }

  render() {
    const { postRepo, indices, index } = this.props
    console.log('re-render')

    const lis = indices[index].raw.map((item) => {
      const { resource } = item

      return <Post key={resource} resource={resource} postRepo={postRepo} />
    })

    return <Card.Group>{lis}</Card.Group>
  }
}

PostList.propTypes = {
  resource: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  indices: PropTypes.object.isRequired,
  lineRepo: PropTypes.shape({
    getIndex: PropTypes.func.isRequired,
    updateIndex: PropTypes.func.isRequired,
  }).isRequired,
  postRepo: PropTypes.shape({
    get: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
  }).isRequired,
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
  const currentLine = state.account.accounts[state.account.curAccountIndex].lines.current.uri
  const { index } = state.line.lines[currentLine]
  const { indices } = state.line
  return {
    indices,
    index,
  }
}
export default connect(mapStateToProps)(PostList)
