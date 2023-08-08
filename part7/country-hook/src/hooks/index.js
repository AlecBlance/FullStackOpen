import { useState, useEffect } from 'react'
import { getCountry } from '../services/country'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      getCountry(name)
        .then(country => {
          const { name: {common}, capital, population, flags: {svg} } = country
          setCountry({found: true, data: {name: common, capital, population, flag: svg}})
        })
        .catch(error => setCountry({found: false}))
    }
  }, [name])

  return country
}