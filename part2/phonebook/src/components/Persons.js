import React from 'react'


const Persons = ({ persons, deletePersonOf }) => (
  <ul>
    {persons.map(person => {
      return (
        <li key={person.name}>
          {person.name} {person.number}
          &nbsp;
          <button onClick={() => deletePersonOf(person.id)}>delete</button>
        </li>
      )
    })}
  </ul>
)

export default Persons
