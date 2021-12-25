import styled from 'styled-components'
import colors from '../../styles/colors'
import { Card } from '../../styles/Global'

export const StyledModal = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  box-shadow: 0 7px 14px 0 rgba(65, 69, 88, .1),
    0 3px 6px rgba(0, 0, 0, .07);
`
export const ModalOverlay = styled.div`
  content: "";
  display: block;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .3);
  z-index: 999;
`

export const ModalCard = styled(Card) `
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  z-index: 1000;
`

export const ModalHeader = styled.div`
  padding: 0 0 0 20px;
  display: flex;
  height: 50px;
  justify-content: space-between;
`

export const ModalClose = styled.button`
  margin: 10px;
  background-color: ${colors.white};
  color: rgb(110, 53, 53);
  border: none;
  font-weight: bold;
  font-size: 20px;
`

export const ModalContent = styled.div`
  padding: 20px;
`

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 20px 20px 20px;
`