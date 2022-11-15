import { useState, useEffect, useRef } from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'
// import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(() => {
    const loggedUser = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUser) {
      const loggedUserJSON = JSON.parse(loggedUser)
      noteService.setToken(loggedUserJSON.token)
      return loggedUserJSON
    } else {
      return null
    }
  })

  useEffect(() => {
    noteService
      .getAll().then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const noteFormRef = useRef()

  const notesToShow = showAll
    ? notes
    : notes.filter(n => n.important === true)

  // communicate with DB
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage(`${user.username} logged in`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addNote = async (noteData) => {
    try {
      const response = await noteService.create(noteData)
      setNotes(notes.concat(response))
    } catch (exception) {
      console.log('failed to add note')
      console.log(exception)
    }
  }

  const toggleImportanceOf = async (id) => {
    console.log(id)
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    try {
      const response = await noteService.update(id, changedNote)
      const newNotes = notes.map(n => n.id !== id ? n : response)
      setNotes(newNotes)
    } catch (exception) {
      console.log('Unable to update note')
    }

  }

  // display helpers
  const loginForm = () => {
    const hideWhenLoginVisible = { display: loginVisible ? 'none' : '' }
    const showWhenLoginVisible = { display: loginVisible ? '' : 'none' }

    return (
      <>
        <div style={hideWhenLoginVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenLoginVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </>
    )
  }

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote}/>
    </Togglable>
  )

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {user === null ? loginForm() : noteForm()}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      <ul>
        {notesToShow.map((note, idx) => {
          return (
            <Note key={idx}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default App