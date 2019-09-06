import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'

const height = 66
const width = '99%'

const Img = Styled.img`
  margin-top: -23vh;
  height: ${height}vh;
  width: ${width};
  position: absolute;
  top: 0;
  z-index: -2;
`

const Cover = Styled.div`
  background-color: #FFFFFF;
  opacity: 0.85;
  height: 14vh;
  width: ${width};
  position: absolute;
  top: 20vh;
  z-index: -1;
`

const CoverSolid = Styled.div`
  background-color: #FFFFFF;
  height: 100vh;
  width: ${width};
  position: absolute;
  top: 36vh;
  z-index: -1;
`

const CoverVertical = Styled.div`
  background-color: #FFFFFF;
  opacity: 0.4;
  height: 100vh;
  width: 150px;
  position: absolute;
  top: 0;
  right: 80px;
  z-index: -1;
`

const Wrapper = Styled.div`
  height: ${height};
  width: ${width};
  position: absolute;
  top: 0;
`

const HeaderImg = props => (
  <Wrapper>
    <Img src="https://images.unsplash.com/photo-1544292792-ae284c26e0f9?w=1867&q=80" />
    <Cover />
    <CoverSolid />
    <CoverVertical />
  </Wrapper>
)

export default HeaderImg
