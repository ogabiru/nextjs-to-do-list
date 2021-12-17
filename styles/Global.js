import styled from 'styled-components'
import colors from './colors'

export const H2 = styled.h2`
  color: ${props => props.color ? props.color : colors.black}
`
export const Container = styled.div`
  padding: 0 2rem;
`

export const Main = styled.div`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export const Grid = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content:space-around;
  flex-wrap: wrap;
  max-width: 1024px;
  text-align: center;
  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
  }
`

export const Card = styled.div`
  border-radius: 3px;
  box-shadow: 0 7px 14px 0 rgba(65, 69, 88, .1),
    0 3px 6px rgba(0, 0, 0, .07);
`

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 5px;
  input {
    width: 300px;
  }
  textarea {
    width: 300px;
    max-width: 300px;
    min-width: 300px;
    height: 80px;
    max-height: 80px;
    min-height: 80px;
  }
`

export const Button = styled.button`
  padding: 4px 20px;
  background-color: ${colors.secondary};
  border: none;
  cursor: pointer;
  border-radius: 3px;
  box-shadow: 0 7px 14px 0 rgba(65, 69, 88, .1),
    0 3px 6px rgba(0, 0, 0, .07);
`