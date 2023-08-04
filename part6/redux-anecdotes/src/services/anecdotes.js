import axios from 'axios'
import { asObject } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (data) => {
  const newData = asObject(data)
  const response = await axios.post(baseUrl, newData)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create } 