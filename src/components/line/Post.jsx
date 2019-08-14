import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'moment'
import Unified from 'unified'
import Parse from 'remark-parse'
import Rehype from 'remark-rehype'
import Highlight from 'rehype-highlight'
import Reactify from 'rehype-react'
import Card from 'src/styled/Card'
import { Feed } from 'semantic-ui-react'

class Post extends React.Component {
  constructor(props) {
    super(props)

    this.processor = Unified()
      .use(Parse)
      .use(Rehype)
      .use(Highlight)
      .use(Reactify, { createElement: React.createElement })
  }

  onError(err) {
    const { onError } = this.props
    onError(err)
  }

  render() {
    const { resource, posts } = this.props
    const { date, content } = posts[resource]

    const htmlContent = this.processor.processSync(content).contents

    return (
      <Card fluid>
        <Card.Content>
          <Feed>
            <Feed.Event>
              <Feed.Content>
                <Feed.Date content={Moment(date.toString()).fromNow()} />
              </Feed.Content>
            </Feed.Event>
          </Feed>
          {htmlContent}
        </Card.Content>
      </Card>
    )
  }
}

Post.propTypes = {
  resource: PropTypes.string.isRequired,
  posts: PropTypes.objectOf(
    PropTypes.shape({
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
        .isRequired,
      type: PropTypes.string,
      content: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onError: PropTypes.func,
}

Post.defaultProps = {
  onError: err => console.error('error', err),
}

/**
 * map state to props
 * @param  {object} state    state tree
 * @return {object}          state props
 */
const mapStateToProps = state => ({
  posts: state.posts.posts,
})

export default connect(mapStateToProps)(Post)
