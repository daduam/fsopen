import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Weather = ({ weather, city }) => {
  if (!weather) {
    return null;
  }

  return (
    <div>
      <h2>Weather in {city}</h2>
      <div>
        <strong>temperature:</strong> {weather.temperature} Celcius
      </div>
      <img src={weather.weather_icons[0]} alt={weather.weather_descriptions[0]} />
      <div>
        <strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}
      </div>

    </div>
  )

}

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  const params = {
    access_key: process.env.REACT_APP_WEATHERSTACK_KEY,
    query: country.capital
  }

  const hook = () => {
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        setWeather(response.data.current)
      })
  }
  // console.log(process.env.REACT_APP_WEATHERSTACK_KEY)
  useEffect(hook, [])

  return (
    <div>
      <h1>{country.name}</h1>
      <div>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
      </div>
      <div>
        <h2>languages</h2>
        <ul>
          {country.languages.map((language) =>
            <li key={language.name}>{language.name}</li>
          )}
        </ul>
      </div>
      <div>
        <img alt={`flag of ${country.name}`} src={country.flag} width="100px" />
      </div>
      <Weather weather={weather} city={country.capital} />
    </div>
  )
}

export default Country
