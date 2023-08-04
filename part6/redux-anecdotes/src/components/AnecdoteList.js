import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes.filter(({content}) => content.toLowerCase().includes(state.filter.toLowerCase())))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    const { content } = anecdote
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted '${content}'`, 10))
  }

  return (
    <>
    {anecdotes.sort((a,b)=> b.votes-a.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
  </>
  )
}

export default AnecdoteList