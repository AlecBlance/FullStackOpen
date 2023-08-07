import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const create = async (content) => {
    const newContent = asObject(content)
    const response = await axios.post(baseUrl, newContent)
    return response.data
}

export const update = async (anecdote) => {
  const { id } = anecdote
  const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
  const response = await axios.put(`${baseUrl}/${id}`, newAnecdote)
  return response.data
}