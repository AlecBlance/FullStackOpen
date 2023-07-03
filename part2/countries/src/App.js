import {useState, useEffect} from 'react'
import axios from 'axios'
import CountryData from './components/CountryData'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(countries => setCountries(countries.data))
  }, [])

  if (!countries) return

  const handleCountrySearch = (e) => {
    const search = e.target.value
    setSearch(search)
    setFilteredCountries(countries.filter(({name: {common}}) => common.toLowerCase().includes(search.toLowerCase())))
  }

  return (
    <div>
      find countries <input value={search} onChange={handleCountrySearch} />
      <div>
        { !search ? null 
        : filteredCountries.length > 10 ? <p>Too many matches, specify another filter</p>
        : filteredCountries.length == 1 ? <CountryData country={filteredCountries[0]} /> 
        : <Countries countries={filteredCountries} handleShow={setFilteredCountries}/>}
      </div>
    </div>
  )
}

export default App;
