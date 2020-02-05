import React from 'react'
import PropTypes from 'prop-types'
import MenuContainer from 'src/components/theme/MenuContainer'
import Menu from 'src/components/theme/Menu'
import MenuItem from 'src/components/theme/MenuItem'
import Button from 'src/components/theme/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faImage,
  faVideo,
  faHeadphones,
} from '@fortawesome/free-solid-svg-icons'

class MediaMenu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeItem: 'image',
      isUpload: false,
    }

    this.onItemClick = this.onItemClick.bind(this)
    this.onSwitch = this.onSwitch.bind(this)
  }

  onItemClick(e, { name }) {
    const { onItemClick } = this.props
    const { isUpload } = this.state

    this.setState({ activeItem: name })
    onItemClick(name, isUpload)
  }

  onSwitch(isUpload) {
    const { onItemClick } = this.props
    const { activeItem } = this.state
    this.setState({ isUpload })
    onItemClick(activeItem, isUpload)
  }

  render() {
    const { isUpload, activeItem } = this.state

    return (
      <MenuContainer pointing secondary>
        <MenuItem
          name="image"
          active={activeItem === 'image'}
          onClick={this.onItemClick}
        >
          <FontAwesomeIcon icon={faImage} title="image" />
        </MenuItem>
        <MenuItem
          name="video"
          active={activeItem === 'video'}
          onClick={this.onItemClick}
        >
          <FontAwesomeIcon icon={faVideo} title="video" />
        </MenuItem>
        <MenuItem
          name="audio"
          active={activeItem === 'audio'}
          onClick={this.onItemClick}
        >
          <FontAwesomeIcon title="audio" icon={faHeadphones} />
        </MenuItem>
        <Menu position="right">
          <MenuItem align="right">
            <Button.Group>
              <Button positive={!isUpload} onClick={() => this.onSwitch(false)}>
                Select
              </Button>
              <Button.Or></Button.Or>
              <Button positive={isUpload} onClick={() => this.onSwitch(true)}>
                Upload
              </Button>
            </Button.Group>
          </MenuItem>
        </Menu>
      </MenuContainer>
    )
  }
}

MediaMenu.propTypes = {
  onItemClick: PropTypes.func,
}

MediaMenu.defaultProps = {
  onItemClick: () => {},
}

export default MediaMenu
