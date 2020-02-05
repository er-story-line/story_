import React from 'react'
import PropTypes from 'prop-types'
import MenuContainer from 'src/components/theme/MenuContainer'

const style = {
  borderRadius: 0,
  // borderBottom: '1px solid rgba(34,36,38,.15)',
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  backgroundColor: '#ffffff',
  opacity: 0.95,
  fontFamily: 'Bodoni 11',
  fontWeight: 100,
  letterSpacing: '2px',
  fontVariant: 'small-caps',
}

const TopMenuBar = ({ children }) => (
  <MenuContainer stackable fixed="top" size="massive" secondary style={style}>
    {children}
  </MenuContainer>
)

TopMenuBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

TopMenuBar.defaultProps = () => ({
  children: null,
})

export default TopMenuBar
