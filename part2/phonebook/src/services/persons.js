import axios from 'axios'

const getAll = () => axios.get('http://localhost:3001/persons').then(response => response.data)

const add = data => axios.post('http://localhost:3001/persons', data).then(response => response.data)

export default {getAll, add}