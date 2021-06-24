import React, { useState } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import personService from './Services/personService'
import Notification from './Components/Notification'

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

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

    const person = persons.find(p => p.name === newName)

    if (person === undefined) {
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
          setNotificationMessage(`Added ${newName}`)
          setNotificationType('success')
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationType(null)
          }, 5000)
        })
        .catch(error => {
          // console.log(error.response.data)
          setNotificationMessage(error.response.data.error)
          setNotificationType('error')
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationType(null)
          }, 5000)
        })
    }
    else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
      const id = person.id

      personService
        .update(id, { ...person, number: newNumber })
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== id).concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Changed number for ${newName}`)
          setNotificationType('success')
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationType(null)
          }, 5000)
        })
        .catch(error => {
          setNotificationMessage(`Information of ${newName} has already been removed from server`)
          setNotificationType('error')
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationType(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
    else {
      // window(`${newName} is already added to the phonebook`)
      setNewName('')
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
      <Notification message={notificationMessage} type={notificationType} />
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
