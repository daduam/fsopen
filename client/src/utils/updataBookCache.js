import { FETCH_BOOKS } from '../queries'

const includedIn = (set, obj) => set.map(b => b.id).includes(obj.id)

export const updateBookCache = (client, addedBook) => {
  const dataInStore = client.readQuery({ query: FETCH_BOOKS })

  if (!includedIn(dataInStore.allBooks, addedBook)) {
    client.writeQuery({
      query: FETCH_BOOKS,
      data: { allBooks: dataInStore.allBooks.concat(addedBook) }
    })
  }
}