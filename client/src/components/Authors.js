import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { FETCH_AUTHORS, SET_BIRTHYEAR } from '../queries'

const Authors = (props) => {
  const result = useQuery(FETCH_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editBirthYear] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: FETCH_AUTHORS }],
    onError: (e) => {
      console.error(e)
    }
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (
      <div>
        <h2>authors</h2>
        <p>Loading...</p>
      </div>
    )
  }

  const authors = result.data.allAuthors

  const editAuthor = (event) => {
    event.preventDefault()

    editBirthYear({ variables: { name, born: Number(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={editAuthor}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map(a =>
              <option value={a.name} key={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          born <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
