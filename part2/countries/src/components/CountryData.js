import weatherService from './../services/weather'
import {useState, useEffect} from 'react'

const CountryData = ({country: {name: {common}, capital, area, languages, flags: {png}}}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        weatherService
            .getWeather(capital)
            .then(weather => setWeather(weather))
    }, [])

    if (!weather) return

    const languagesList = Object.entries(languages).map(([key, language]) => <li key={key}>{language}</li>)    
    const {main: {temp}, weather: [{icon}], wind: {speed}} = weather
    
    return(
        <>
            <h1>{common}</h1>
            <p>capital {capital}</p>
            <p>area {area}</p>
            <h3>languages:</h3>
            <ul>{languagesList}</ul>
            <img src={png}></img>
            <h2>Weather in {capital}</h2>
            <p>temperature {temp} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${icon}@4x.png`}/>
            <p>wind {speed} m/s</p>
        </>
    )
}

export default CountryData