import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteFor(state, action) {
      const id = action.payload
      return state.map(anecdote => anecdote.id === id ? {...anecdote, votes: anecdote.votes + 1}: anecdote)
    },
    createAnecdote(state, action) {
      const content = asObject(action.payload)
      return state.concat(content)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteFor, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer