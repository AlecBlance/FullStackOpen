import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (userToken) => {
  token = `Bearer ${userToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (data) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, data, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { 
  getAll,
  create,   
  setToken,
}
