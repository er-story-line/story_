import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Login from './Login'

test('<Login /> renders correctly', () => {
  const tree = renderer.create(<Login />).toJSON()
  expect(tree).toMatchSnapshot()
})
