import { useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleNameInput = (e) => setNewName(e.target.value)

  const handleNumberInput = (e) => setNewNumber(e.target.value)

  const handleFilterInput = (e) => setFilter(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {name: newName, number: newNumber}
    if (persons.some(({name}) => name === newName)) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) return
      const {id} = persons.find(({name}) => name === data.name);
      personsService
        .updatePerson(id, data)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id == returnedPerson.id ? returnedPerson: person))
        })
    } else {
      personsService
        .addPerson(data)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
    }
  }

  const handleDelete = (personId, name) => {
    if (!window.confirm(`Delete ${name} ?`)) return
    personsService.deletePerson(personId)
      .then(setPersons(persons.filter(({id}) => id !== personId)))
  }

  const formInput = {
    name: {
      value: newName,
      callback: handleNameInput
    },
    number: {
      value: newNumber,
      callback: handleNumberInput
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} callback={handleFilterInput} />
      <h3>add a new</h3>
      <PersonForm submitCallback={handleSubmit} inputData={formInput} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deleteCallback={handleDelete}/>
    </div>
  )
}

export default App