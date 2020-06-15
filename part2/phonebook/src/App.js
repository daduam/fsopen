import React, { useState } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import personService from './Services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useState(hook, [])

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }

  // event listener for submit button
  const addPerson = (event) => {
    event.preventDefault();

    if (persons.find(person => person.name === newName) === undefined) {
      const personObject = {
        name: newName,
        number: newNumber,
        show: true
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
    else {
      alert(`${newName} is already added to the phonebook`)
    }
  }

  const handleFilterInputChange = (event) => {
    setFilterString(event.target.value)
    setShowAll(filterString.length === 0 ? true : false)
  }

  const deletePersonOf = (id) => {
    const [person] = persons.filter(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(id)
        .then(statusCode => {
          if (statusCode === 200) {
            setPersons(persons.filter(p => p !== person))
          }
        })
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(
      person => person.name.toLowerCase().includes(filterString)
    )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterString} onChange={handleFilterInputChange} />

      <h2>Add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        onNameChange={handleNameInputChange}
        onNumberChange={handleNumberInputChange}
        onClick={addPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePersonOf={deletePersonOf} />
    </div>
  )
}

export default App
