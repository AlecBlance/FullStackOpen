import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const getWeather = (capital) => {
    return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&mode=json&units=metric&appid=${api_key}`)
    .then(response => response.data)
}

export default {getWeather}