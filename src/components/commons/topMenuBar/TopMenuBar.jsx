import React from 'react'
import PropTypes from 'prop-types'
import StyledComponent from './styled'
import AddNew from './partials/newLine'

const topMenuBar = ({ children }) => (
  <StyledComponent>
    {children}
    <AddNew />
  </StyledComponent>
)

topMenuBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

topMenuBar.defaultProps = () => ({
  children: null,
})

export default topMenuBar
