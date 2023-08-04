import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
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

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    await anecdoteService.create(content)
    dispatch(createAnecdote(content))
  }
}

export default anecdoteSlice.reducer