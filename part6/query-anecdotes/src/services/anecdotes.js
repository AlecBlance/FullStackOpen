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
    if (content.length < 5) return 
    const newContent = asObject(content)
    const response = await axios.post(baseUrl, newContent)
    return response.data
}