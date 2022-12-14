import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import phoneServices from './services/phone';
import Notification from './components/Notification';

import { useState, useEffect } from 'react';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchText, setSearchText] = useState('');
  const [notificationMsg, setNotificationMsg] = useState(null);
  const [isSuccess, setIsSuccess] = useState(true);

  const effect = () => {
    phoneServices
      .getAll()
      .then(data => {
        setPersons(data);
      });
  }

  useEffect(effect, []);

  const displayNotification = (message, isSuccess) => {
    setNotificationMsg(message);
    setIsSuccess(isSuccess);
    setTimeout(() => {setNotificationMsg(null)}, 5000);
  }

  const updateContact = () => {
    const person = persons.find(p => p.name === newName);
    const id = person.id;
    phoneServices
      .update(id, newName, newNumber)
      .then(response => {
        displayNotification(`${newName} is updated.`, true);
        const remainingPerson = persons.filter(p => p.id !== response.id);
        setPersons(remainingPerson.concat(response));
        setNewName('');
        setNewNumber('');
      });
  }

  const addContact = (event) => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        updateContact();
      } else {
        return;
      }
    } else {
      const newPerson = {name: newName,
                        number: newNumber};

      phoneServices
      .create(newPerson)
      .then(data => {
        displayNotification(`${newName} is added.`, true);
        setPersons(persons.concat(data));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        displayNotification(error.response.data, false);
      });
    }
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

  const deleteContact = (name) => {
    if(window.confirm(`delete ${name}`)) {
      const person = persons.find(p => p.name === name);
      const id = person.id;
      phoneServices
        .deleteRequest(id)
        .then(() => {
          displayNotification(`${name} is deleted`, true);
          const newPersons = persons.filter(p => p.id !== id);
          setPersons(newPersons);
        })
        .catch(error => {
          displayNotification(`${name} does not exist`, false);
          setPersons(persons.filter(p => p.name !== name));
        });
    }
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMsg} isSuccess={isSuccess}/>
      <Filter searchText={searchText} handler={handleSearchTextChange}/>
      <h3>add a new</h3>
      <PersonForm newName={newName} handleInputChange={handleInputChange}
                  newNumber={newNumber} handleNumberChange={handleNumberChange}
                  addContact={addContact}/>
      <h3>Numbers</h3>
      <Persons persons={persons} searchText={searchText} deleteContact={deleteContact}/>
    </div>
  )
}

export default App