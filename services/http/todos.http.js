const endpoint = 'http://localhost:3000/api/todos/'

const getTodos = async () => {
  return await fetch(endpoint)
  .then(res => {
    return res.json()
  })
  .catch(err => {
    return err
  })
}

const createTodo = async ({title, description}) => {

  title = (title !== "") ? title : null
  description = (description !== "") ? description : null

  return await fetch(endpoint,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify({title: title, description: description})
  })
  .then(res => {
    return res.json()
  })
  .catch(err => {
    return err
  })
}

const deleteTodo = async (id) => {
  return await fetch(endpoint+id,
  {
    method: 'DELETE'
  })
  .then(res => {
    return res.json()
  })
  .catch(err => {
    return { error: err.message }
  })
}

const updateTodo = async (id, {title, description, started_at, paused_at, finished_at, time_spent}) => {
  return await fetch(endpoint+id,
  {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify({
      title: title,
      description: description,
      started_at: started_at,
      paused_at: paused_at,
      finished_at: finished_at,
      time_spent: time_spent
    })
  })
  .then(async res => {
    return res.json()
  })
  .catch(err => {
    return err
  })
}

export { getTodos, createTodo, deleteTodo, updateTodo }