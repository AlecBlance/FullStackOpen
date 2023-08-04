import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()
  const create = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    dispatch(addAnecdote(content))
    dispatch(setNotification(`you created '${content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm