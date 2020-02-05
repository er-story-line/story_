/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

/*
  This are simple wrapper elements for passing into the markdown parser
*/

import React from 'react'
import Styled from 'styled-components'
import Header from 'src/components/theme/Header'

export const H1 = props => <Header as="h1">{props.children}</Header>
export const H2 = props => <Header as="h2">{props.children}</Header>
export const H3 = props => <Header as="h3">{props.children}</Header>
export const H4 = props => <Header as="h4">{props.children}</Header>

const BlockQuoteContent = Styled.div`
  /* background-color: #F7F7F7; */
  padding: 0.5em;
`

const BlockQuoteWrapper = Styled.blockquote`
  padding: 0.5em 0; 
  border-top: 1px dashed #4f412f;
  border-bottom: 1px dashed #4f412f;
  color: #629AA6;
`

export const BlockQuote = ({ children }) => (
  <BlockQuoteWrapper>
    <BlockQuoteContent>{children}</BlockQuoteContent>
  </BlockQuoteWrapper>
)
