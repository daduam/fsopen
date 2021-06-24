import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import CountryList from './components/CountryList'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filterString, setFilterString] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        // console.log(response.data)
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  let countriesToShow = countries.filter(
    (country) => country.name.toLowerCase().includes(filterString.toLowerCase())
  )

  const handleFilterInputChange = (event) => {
    // console.log(event.target.value)
    setFilterString(event.target.value)
  }

  const handleShowClick = (event) => {
    setFilterString(event.target.previousSibling.data)
  }

  return (
    <div>
      <Filter value={filterString} onChange={handleFilterInputChange} />
      <CountryList countries={countriesToShow} onClick={handleShowClick} />
    </div>
  )
}

export default App
