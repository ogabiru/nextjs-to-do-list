import React, {useRef} from 'react'
import { PropTypes } from 'prop-types';
import lodash from 'lodash'

import {
  FormField,
  Grid,
  H2,
  Button
} from '../../styles/Global'

import {
  Todos,
  Todo,
  TodoHeader,
  TodoDelete,
  TodoTitle,
  TodoDescription,
  TodoTime,
  TodoFooter,
} from './styles'
import colors from '../../styles/colors'

import { msToTime } from '../../utils/time' 

const TodoList = ({todos, remove, create, start, pause, finish}) => {
  const titleRef = useRef()
  const descRef = useRef()

  const grouped = lodash.groupBy(todos, todo => {
    if (todo.finished_at !== null) {
      return 'finished'
    } else if (todo.started_at !== null && todo.paused_at === null) {
      return 'started'
    } else {
      return 'created'
    }
  })

  const getTimeSpent = todo => {
    let time_spent = 0;
    if (todo.started_at !== null) {
      time_spent = msToTime(todo.time_spent + (new Date().getTime() - todo.started_at))
    } else {
      time_spent = msToTime(todo.time_spent)
    }
    return time_spent;
  }

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        create(titleRef.current.value, descRef.current.value)
        titleRef.current.value = ''
        descRef.current.value = ''
      }}>
        <FormField>
          <label>Title</label>
          <input type="text" ref={titleRef}></input>
        </FormField>
        <FormField>
          <label>Description</label>
          <textarea ref={descRef}></textarea>
        </FormField>
        <div><Button type="submit">Add To Do</Button></div>
      </form>
      <Grid>
        <div>
          <H2 color={colors.primaryDark}>To do list</H2>
          <Todos>
            {
              (grouped.created !== undefined) && grouped.created.map( todo => {
                return (
                  <Todo key={todo.id} color={colors.primary}>
                    <TodoHeader>
                      <TodoDelete onClick={() => remove(todo)}>Delete</TodoDelete>
                    </TodoHeader>
                    <TodoTitle>{todo.title}</TodoTitle>
                    <TodoDescription>{todo.description}</TodoDescription>
                    <TodoTime>Time spent: {getTimeSpent(todo)}</TodoTime>
                    <TodoFooter>
                      <Button onClick={() => start(todo)}>Start</Button>
                    </TodoFooter>
                  </Todo>
                )
              })
            }
          </Todos>
        </div>
        <div>
          <H2 color={colors.warningDark}>In progress</H2>
          <Todos>
            {
              (grouped.started !== undefined) && grouped.started.map( todo => {
                return (
                  <Todo key={todo.id} color={colors.warning}>
                    <TodoHeader>
                      <TodoDelete onClick={() => remove(todo)}>Delete</TodoDelete>
                    </TodoHeader>
                    <TodoTitle>{todo.title}</TodoTitle>
                    <TodoDescription>{todo.description}</TodoDescription>
                    <TodoTime>Started at: {new Date(todo.started_at).toUTCString()}</TodoTime>
                    <TodoFooter>
                      <Button onClick={() => pause(todo)}>Pause</Button>
                      <Button onClick={() => finish(todo)}>Finish</Button>
                    </TodoFooter>
                  </Todo>
                )
              })
            }
          </Todos>
        </div>
        <div>
          <H2 color={colors.successDark}>Finished</H2>
          <Todos>
            {
              (grouped.finished !== undefined) && grouped.finished.map( todo => {
                return (
                  <Todo key={todo.id} color={colors.success}>
                    <TodoHeader>
                      <TodoDelete onClick={() => remove(todo)}>Delete</TodoDelete>
                    </TodoHeader>
                    <TodoTitle>{todo.title}</TodoTitle>
                    <TodoDescription>{todo.description}</TodoDescription>
                    <TodoTime>Time spent: {getTimeSpent(todo)}</TodoTime>
                  </Todo>
                )
              })
            }
          </Todos>
        </div>
      </Grid>
    </div>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array,
  remove: PropTypes.func,
  create: PropTypes.func,
  start: PropTypes.func,
  pause: PropTypes.func,
  finish: PropTypes.func
}

export default TodoList