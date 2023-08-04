import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

  const dispatch = useDispatch()
  const create = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    await anecdoteService.create(content)
    dispatch(createAnecdote(content))
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