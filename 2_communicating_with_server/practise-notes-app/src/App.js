import { useState, useEffect } from 'react';

import Note from './components/Note';
import Notification from './components/Notification';
import noteService from './services/notes';
import Footer from './components/Footer';

const SERVER_URL = 'http://localhost:3001/notes';

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('foo bar');

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      })
  }, []);

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    noteService
        .create(noteObject)
        .then(returnedNote => {
          setNotes(notes.concat(returnedNote));
          setNewNote('');
        });
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  const toggleShowAll = () => setShowAll(!showAll);

  const toggleImportannceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = {...note, important: !note.important};

    noteService
         .update(id, changedNote)
         .then(returnedNote => {
          const newNotes = notes.map(n => n.id !== id ? n : returnedNote);
          setNotes(newNotes);
         })
         .catch(error => {
          setErrorMessage(`the note ${note.content} was already deleted from server`);
          setTimeout(() => {setErrorMessage(null)}, 5000);
          setNotes(notes.filter(n => n.id !== id));
         });
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={toggleShowAll}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} 
                note={note} 
                toggleImportannce={() => toggleImportannceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
          <input onChange={handleNoteChange} value={newNote}/>
          <button type="submit">save</button>
      </form>
      <Footer/>
    </div>
  )
}

export default App