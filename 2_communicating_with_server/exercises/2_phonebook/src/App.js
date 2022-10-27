import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import axios from 'axios';

import { useState, useEffect } from 'react';

const DB_URL = 'http://localhost:3001/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchText, setSearchText] = useState('');

  const effect = () => {
    axios.get(DB_URL)
         .then(response => {
          const fetchedPersons = response.data;
          setPersons(fetchedPersons);
         });
  }

  useEffect(effect, []);

  const addContact = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const newPerson = {name: newName,
                       number: newNumber};
    
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }
  
  const handleInputChange = (event) => {
    const input =  event.target.value;
    setNewName(input);
  }
  
  const handleNumberChange = (event) => {
    const input = event.target.value;
    setNewNumber(input);
  }

  const handleSearchTextChange = (event) => {
    const input = event.target.value;
    setSearchText(input);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchText={searchText} handler={handleSearchTextChange}/>
      <h3>add a new</h3>
      <PersonForm newName={newName} handleInputChange={handleInputChange}
                  newNumber={newNumber} handleNumberChange={handleNumberChange}
                  addContact={addContact}/>
      <h3>Numbers</h3>
      <Persons persons={persons} searchText={searchText} />
    </div>
  )
}

export default App