import React from 'react'
import Country from './Country'


const CountryList = ({ countries, onClick }) => {
  if (countries.length === 0) {
    return (
      <div>
        no matches
      </div>
    )
  }
  if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  }
  if (countries.length < 10) {
    return (
      <div>
        {countries.map((country) =>
          <div key={country.name}>
            {country.name}
            <button onClick={onClick}>show</button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>Too many matches, specify another filter</div>
  )
}

export default CountryList
