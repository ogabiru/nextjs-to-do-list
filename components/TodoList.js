import React, {useRef} from 'react'
import { PropTypes } from 'prop-types';
import todoStyles from '../styles/Todo.module.css'
import styles from '../styles/Global.module.css'
import lodash from 'lodash'

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

  const msToTime = ms => {
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) return seconds + " Sec";
    else if (minutes < 60) return minutes + " Min";
    else if (hours < 24) return hours + " Hrs";
    else return days + " Days"
  }

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
        <div className={styles.form_field}>
          <label>Title</label>
          <input type="text" ref={titleRef}></input>
        </div>
        <div className={styles.form_field}>
          <label>Description</label>
          <textarea ref={descRef}></textarea>
        </div>
        <div><button type="submit">Add To Do</button></div>
      </form>
      <div className={styles.grid}>
        <div>
          <h2 className={styles.text_primary}>To do list</h2>
          <ul className={todoStyles.todo_list}>
            {
              (grouped.created !== undefined) && grouped.created.map( todo => {
                return (
                  <li key={todo.id}
                  className={`${todoStyles.todo} ${styles.card} ${styles.primary}`}>
                    <i onClick={() => remove(todo)} className={styles.text_white}>Delete</i>
                    <strong>{todo.title}</strong>
                    <span>{todo.description}</span>
                    <small>Time spent: {getTimeSpent(todo)}</small>
                    <div><button onClick={() => start(todo)}>Start</button></div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div>
          <h2 className={styles.text_warning}>In progress</h2>
          <ul className={todoStyles.todo_list}>
            {
              (grouped.started !== undefined) && grouped.started.map( todo => {
                return (
                  <li key={todo.id}
                  className={`${todoStyles.todo} ${styles.card} ${styles.warning}`}>
                    <i onClick={() => remove(todo)} className={styles.text_white}>Delete</i>
                    <strong>{todo.title}</strong>
                    <span>{todo.description}</span>
                    <small>Started at: {new Date(todo.started_at).toUTCString()}</small>
                    <div>
                      <button onClick={() => pause(todo)}>Pause</button>
                      <button onClick={() => finish(todo)}>Finish</button>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div>
          <h2 className={styles.text_success}>Finished</h2>
          <ul className={todoStyles.todo_list}>
            {
              (grouped.finished !== undefined) && grouped.finished.map( todo => {
                return (
                  <li key={todo.id}
                  className={`${todoStyles.todo} ${styles.card} ${styles.success}`}>
                    <i onClick={() => remove(todo)} className={styles.text_white}>Delete</i>
                    <strong>{todo.title}</strong>
                    <span>{todo.description}</span>
                    <small>Time spent: {getTimeSpent(todo)}</small>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
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