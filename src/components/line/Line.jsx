import React from 'react'
import PropTypes from 'prop-types'
import PostList from './PostList'

const Line = (props) => {
  const { title } = props

  return (
    <>
      <h1>{title}</h1>
      <PostList />
    </>
  )
}

Line.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Line
