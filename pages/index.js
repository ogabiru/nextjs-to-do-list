import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import TodoList from '../components/TodoList'
import Modal from '../components/Modal'
import styles from '../styles/Global.module.css'

export default function App() {
  const [todos, setTodos] = useState([])
  const [modalTodo, setModalTodo] = useState({open: false})
  const [modalError, setModalError] = useState({open: false})

  const openModal = (item) => {
    setModalTodo({open: true, activeTodo: item})
  }
  const closeModal = () => {
    setModalTodo({open: false})
  }

  const openErrorModal = (title, desc) => {
    setModalError({open: true, title: title, desc: desc})
  }
  const closeErrorModal = () => {
    setModalError({open: false})
  }

  const getTodos = async () => {
    let response = await fetch('http://localhost:3000/api/todos')
    .then(async res => {
      return await res.json()
    })
    .catch(err => {
      return err
    })
    if (response.error !== undefined) {
      openErrorModal('Error', response.error)
    }
    setTodos(response)
    return response
  }

  const createTodo = async (title, description) => {

    title = (title !== "") ? title : null
    description = (description !== "") ? description : null

    let response = await fetch('http://localhost:3000/api/todos',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({title: title, description: description})
    })
    .then(async res => {
      return await res.json()
    })
    .catch(err => {
      return { error: err.message }
    })
    if (response.error !== undefined) {
      openErrorModal('Error', response.error)
    }
    getTodos()
    return response
  }

  const deleteTodo = async () => {
    let response = await fetch('http://localhost:3000/api/todos/'+modalTodo.activeTodo.id,
    {
      method: 'DELETE'
    })
    .then(async res => {
      return await res.json()
    })
    .catch(err => {
      return { error: err.message }
    })
    if (response.error !== undefined) {
      openErrorModal('Error', response.error)
    }
    getTodos()
    closeModal()
  }

  const startTodo = async (todo) => {
    let response = await fetch('http://localhost:3000/api/todos/'+todo.id,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({
        title: todo.title,
        description: todo.description,
        started_at: new Date().getTime(),
        paused_at: null,
        finished_at: null,
        time_spent: todo.time_spent
      })
    })
    .then(async res => {
      return await res.json()
    })
    .catch(err => {
      return { error: err.message }
    })
    if (response.error !== undefined) {
      openErrorModal('Error', response.error)
    }
    getTodos()
    return response
  }

  const pauseTodo = async (todo) => {
    let response = await fetch('http://localhost:3000/api/todos/'+todo.id,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({
        title: todo.title,
        description: todo.description,
        started_at: null,
        paused_at: new Date().getTime(),
        finished_at: null,
        time_spent: (todo.time_spent + (new Date().getTime() - todo.started_at))
      })
    })
    .then(async res => {
      return await res.json()
    })
    .catch(err => {
      return { error: err.message }
    })
    if (response.error !== undefined) {
      openErrorModal('Error', response.error)
    }
    getTodos()
    return response
  }

  const finishTodo = async (todo) => {
    await fetch('http://localhost:3000/api/todos/'+todo.id,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({
        title: todo.title,
        description: todo.description,
        started_at: null,
        paused_at: null,
        finished_at: new Date().getTime(),
        time_spent: (todo.time_spent + (new Date().getTime() - todo.started_at))
      })
    })
    .then(async res => {
      if (res.status === 200) {
        res = await res.json()
        if (res.error !== undefined) {
          openErrorModal('Error', res.error)
        }
        getTodos()
        return res
      }
      return res
    })
    .catch(err => {
      openErrorModal('Error', err.message)
      return err
    })
  }

  useEffect(async () => {
    await getTodos()
  }, [])

  return (
    <div id="app" className={styles.container}>
      <Head>
        <title>My TO DO List</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <TodoList
          todos={todos}
          remove={openModal}
          create={createTodo}
          start={startTodo}
          pause={pauseTodo}
          finish={finishTodo} />
      </main>
      <Modal
        open={modalTodo.open}
        title="Delete this to do?"
        content="Are you sure you want to delete this to do?"
        actionTitle="Delete"
        action={deleteTodo}
        close={closeModal}
      />
      <Modal
        open={modalError.open}
        title={modalError.title}
        content={modalError.desc}
        close={closeErrorModal}
      />
    </div>
  )
}