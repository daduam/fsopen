import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { FETCH_BOOKS, ME } from '../queries'

const Recommend = (props) => {
  const [currentUser, setCurrentUser] = useState(null)

  const user = useQuery(ME)

  useEffect(() => {
    setCurrentUser(user.data ? user.data.me : null)
  }, [user.data])

  const result = useQuery(FETCH_BOOKS, {
    variables: { genre: currentUser ? currentUser.favoriteGenre : '' }
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>

      <div>
        books in your favorite genre <strong>{currentUser.favoriteGenre}</strong>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.publised}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend