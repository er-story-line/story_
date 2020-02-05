import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'moment'
import Unified from 'unified'
import Parse from 'remark-parse'
import Rehype from 'remark-rehype'
import Highlight from 'rehype-highlight'
import Reactify from 'rehype-react'
import Card from 'src/components/theme/Card'
import Label from 'src/components/theme/Label'
import { H1, H2, H3, H4, BlockQuote } from './MarkdownElements'

class Post extends React.Component {
  constructor(props) {
    super(props)

    this.processor = Unified()
      .use(Parse)
      .use(Rehype)
      .use(Highlight)
      .use(Reactify, {
        createElement: React.createElement,
        components: {
          h1: H1,
          h2: H2,
          h3: H3,
          h4: H4,
          blockquote: BlockQuote,
        },
      })
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
          <Label as="div" size="tiny" basic ribbon="right">
            {Moment(date.toString()).fromNow()}
          </Label>
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
    })
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
