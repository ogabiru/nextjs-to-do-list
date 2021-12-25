import styled from 'styled-components'
import colors from '../../styles/colors'
import {
  Card,
  Button
} from '../../styles/Global'

export const Todos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  min-width: 340px;
`
export const Todo = styled(Card)`
  display: flex;
  width: 300px;
  flex-direction: column;
  z-index: 1000;
  margin: 10px;
  background-color: ${props => props.color ? props.color : colors.white}
`

export const TodoHeader = styled.div `
  padding: 5px 10px;
  display: flex;
  height: 30px;
  justify-content: flex-end;
`

export const TodoDelete = styled.div `
  cursor: pointer;
  color: ${colors.white}
`

export const TodoTitle = styled.div `
  padding: 5px 20px 10px 20px;
  text-align: left;
  font-weight: bold;
`

export const TodoDescription = styled.div`
  padding: 0 20px 20px 20px;
  text-align: left;
`

export const TodoTime = styled.small`
  padding: 0 20px 10px 20px;
  color: #fff;
`

export const TodoFooter = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
`

export const TodoButton = styled(Button)`
  background-color: ${props => props.color ? props.color : colors.secondary}
`