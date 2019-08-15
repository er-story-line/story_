import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import LineWrapper from './LineWrapper'

describe('LineWrapper', () => {
  const styles = {
    backgroundColor: 'white',
  }
  it('renders', () => {
    const tree = renderer.create(<LineWrapper {...styles} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
