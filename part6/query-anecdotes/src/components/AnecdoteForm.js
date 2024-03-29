import { useMutation, useQueryClient } from "react-query"
import { create } from "../services/anecdotes"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(create, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      dispatch({type: 'SET', payload: `anecdote '${newAnecdote.content}' has been added`})
      setTimeout(() => dispatch({type: 'REMOVE'}), 5000)
    },
    onError: ({ response }) => {
      const { error } = response.data
      dispatch({type: 'SET', payload: error})
      setTimeout(() => dispatch({type: 'REMOVE'}), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
