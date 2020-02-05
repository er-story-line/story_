import React from 'react'
import PropTypes from 'prop-types'
import Header from 'src/components/theme/Header'
import Styled from 'styled-components'
import PostList from './PostList'

const StyledHeader = Styled(Header)`
  font-size: 4em;
  margin-top: 20vh;
  text-align: center;
`

const Line = props => {
  const { title } = props

  return (
    <>
      <StyledHeader as="h1">{title}</StyledHeader>
      <PostList />
    </>
  )
}

Line.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Line
