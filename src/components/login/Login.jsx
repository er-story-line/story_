import React from 'react'
import styled from 'styled-components'
import Card from 'src/styled/Card'
import { Input, Button } from 'semantic-ui-react'

const HeaderWrapper = styled.header`
  position: absolute;
  text-align: center;
  top: 0;
  color: rgb(255, 255, 255);
  padding: 10vh 0px 6vh;
  font-size: 40px;
  font-weight: 600;
`
const LoginInform = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin-bottom: 24px;
  color: rgb(94, 108, 132);
  font-size: 16px;
`
const BoldTitle = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
  line-height: 20px;
  height: 20px;
  margin-top: 8px;
  max-width: 100%;
  overflow: hidden;
  font-size: 16px;
`
const BottomActions = styled.div`
  color: rgb(107, 119, 140);
  padding-top: 24px;
  margin-top: 24px;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
  border-top: 1px solid rgb(213, 216, 222);
`
const ActionsUL = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0px;
  & > li + li::before {
    content: '•';
    margin: 0px 8px;
  }
`
const LI = styled.li`
  display: list-item;
  text-align: match-parent;
`
const LoginCard = styled(Card)`
  max-width: 400px !important;
  width: 100% !important;
  margin: 20px !important;
  padding: 24px 40px !important;
`
const GradiantBackground = styled.div`
  height: 100%;
  position: relative;
  padding-bottom: 0;
  background: transparent;
  z-index: 0;

  &::before {
    background-image: linear-gradient(36deg, #9864ff 20%, #0d11e9 92%);
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: -17%;
    content: '';
    z-index: -1;
    background-position: 0 50%;
    background-repeat: no-repeat;
    background-size: cover;
    transform: skewY(-2.5deg);
  }
`
const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 100%;
`
const InputsWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  .continue-button {
    margin-top: 2em !important;
  }
`
export default () => (
  <GradiantBackground>
    <Container>
      <HeaderWrapper>
        <span>STORY_</span>
      </HeaderWrapper>
      <LoginCard color="purple">
        <LoginInform>
          <div>Log in to continue to:</div>
          <BoldTitle>MemGhost</BoldTitle>
        </LoginInform>
        <InputsWrapper>
          <Input placeholder="Enter email" />
          <Button size="large" color="violet" fluid className="continue-button">
            Continue
          </Button>
        </InputsWrapper>
        <BottomActions>
          <ActionsUL>
            <LI>
              <a>
                <span>Can't log in?</span>
              </a>
            </LI>
            <LI>
              <a>
                <span>Sign up for an account</span>
              </a>
            </LI>
          </ActionsUL>
        </BottomActions>
      </LoginCard>
    </Container>
  </GradiantBackground>
)
