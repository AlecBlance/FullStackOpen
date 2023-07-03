const CountryData = ({country: {name: {common}, capital, area, languages, flags: {png}}}) => {
    const languagesList = Object.entries(languages).map(([key, language]) => <li key={key}>{language}</li>)
    return(
        <>
            <h1>{common}</h1>
            <p>capital {capital}</p>
            <p>area {area}</p>
            <h3>languages:</h3>
            <ul>{languagesList}</ul>
            <img src={png}></img>
        </>
    )
}

export default CountryData