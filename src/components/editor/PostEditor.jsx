import React from 'react'
import PropTypes from 'prop-types'
import UUID from 'uuid'
import { Card } from 'semantic-ui-react'
import RichTextEditor from './RichTextEditor'
import './post-editor.css'

const famousFirstLines = [
  'If you can keep your head when all about you...',
  'I must go down to the seas again, to the lonely sea and the sky,...',
  'Half a league, half a league,...',
  'Midway upon the journey of our life...',
  'Whose woods these are I think I know...',
  'Much have I travelled in the realms of gold,...',
  'How do I love thee? Let me count the ways.',
  'In Xanadu did Kubla Khan...',
  "Sing, goddess, of Achilles' ruinous anger...",
  "O MY Luve's like a red, red rose...",
]

class PostEditor extends React.Component {
  constructor(props) {
    super(props)

    const i = Math.floor(Math.random() * famousFirstLines.length)
    const firstLine = famousFirstLines[i]

    this.state = {
      placeholder: firstLine,
      key: UUID(),
    }

    this.reset = this.reset.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  async onSave(md) {
    const { lineRepo, resource } = this.props
    await lineRepo.addPost(resource, {
      content: md,
      type: 'markdown',
    })
    this.reset()
  }

  reset() {
    const i = Math.floor(Math.random() * famousFirstLines.length)
    const firstLine = famousFirstLines[i]

    this.setState({
      key: UUID(),
      placeholder: firstLine,
    })
  }

  render() {
    const { placeholder, content, key } = this.state

    return (
      <Card fluid>
        <Card.Content>
          <RichTextEditor
            key={key}
            placeholder={placeholder}
            onSave={this.onSave}
            content={content}
          />
        </Card.Content>
      </Card>
    )
  }
}

PostEditor.propTypes = {
  resource: PropTypes.string.isRequired,
  lineRepo: PropTypes.shape({
    addPost: PropTypes.func.isRequired,
  }).isRequired,
}

export default PostEditor
