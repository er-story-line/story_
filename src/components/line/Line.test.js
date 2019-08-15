import React from 'react'
import renderer from 'react-test-renderer'
import Line from './Line'

jest.mock('./PostList', () => () => 'PostList')

describe('Line', () => {
  it('renders', () => {
    const tree = renderer.create(<Line title="My Line" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
