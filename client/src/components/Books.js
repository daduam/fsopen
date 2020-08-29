import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { FETCH_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(FETCH_BOOKS)
  const [genre, setGenre] = useState('')

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (
      <div>
        <h2>books</h2>
        <p>Loading...</p>
      </div>
    )
  }

  const books = result.data.allBooks
  const booksByGenre = genre === ''
    ? books
    : books.filter(b => b.genres.includes(genre))
  let genres = [...new Set(books.map(b => b.genres).flat())]

  return (
    <div>
      <h2>books</h2>

      <p>in genre <strong>{genre !== '' ? genre : 'all'}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksByGenre.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        {
          genres.map(g => (
            <button key={g} onClick={() => setGenre(g)}>{g}</button>
          ))
        }
        <button onClick={() => setGenre('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books