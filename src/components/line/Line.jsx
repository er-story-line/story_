import React from 'react'
import PropTypes from 'prop-types'
import PostList from './PostList'

const Line = (props) => {
  const {
    title, index, postRepo, lineRepo,
  } = props

  return (
    <>
      <h1>{title}</h1>
      {index && (
        <PostList resource={index} postRepo={postRepo} lineRepo={lineRepo} />
      )}
    </>
  )
}

Line.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  lineRepo: PropTypes.shape({
    getMetadata: PropTypes.func.isRequired,
    getIndex: PropTypes.func.isRequired,
  }).isRequired,
  postRepo: PropTypes.shape({
    get: PropTypes.func.isRequired,
  }).isRequired,
}

export default Line
