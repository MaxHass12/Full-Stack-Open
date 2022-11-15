import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  const sortedBlogs = blogs.sort((a, b) => a.likes - b.likes)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const savedUser = window.localStorage.getItem('loggedBlogsAppUser')
    if (savedUser) {
      const savedUserJSON = JSON.parse(savedUser)
      blogService.setToken(savedUserJSON.token)
      setUser(savedUserJSON)
    }
  }, [])

  // communication with database
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      console.log('login succesfull')
      window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const createNewBlog = async (data) => {
    const { title, author, url } = data
    try {
      const newBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(newBlog))
      setMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => { setMessage('') }, 5000)
    } catch (exception) {
      console.log('Error creating new blog')
      console.log(exception)
    }
  }

  const updateLikes = async (blogId, data) => {
    try {
      const response = await blogService.updateBlog(blogId, data)
      const remainingBlogs = blogs.filter((b) => b.id !== blogId)
      const newBlogs = remainingBlogs.concat(response)
      setBlogs(newBlogs)
    } catch (exception) {
      console.log('failed updating likes')
      console.log(exception)
    }
  }

  const deleteBlog = async (blogId, user) => {
    try {
      await blogService.deleteBlog(blogId, user)
      const blogsCopy = [...blogs]
      const deletedBlogIndex = blogsCopy.findIndex((b) => b.id === blogId)
      blogsCopy.splice(deletedBlogIndex, 1)
      setBlogs(blogsCopy)
    } catch (exception) {
      console.log('failed to delete blog')
      console.log(exception)
    }
  }

  // event handlers
  const handleUsernameChange = ({ target }) => setUsername(target.value)

  const handlePasswordChange = ({ target }) => setPassword(target.value)

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  // display helpers
  const displayMessage = () => {
    if (message === '') return null

    return (
      <div className="message">{message}</div>
    )
  }

  const dispalyLoginForm = () => (
    <>
      <h2>login to the application</h2>
      {displayMessage()}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          password
          <input id="password" type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button id="login" type="submit">login</button>
      </form>
    </>
  )

  const displayBlogs = () => (
    <>
      <br />
      <div id="blogs">
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateLikes}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
      </div>
    </>
  )

  const displayUserInfo = () => (
    <>
      <h2>Blogs</h2>
      {displayMessage()}
      <div>
        {user.name}
        {' '}
        is signed in
        <button onClick={handleLogout}>logout</button>
      </div>
    </>
  )

  const displayCreateNewBlogForm = () => (
    <Togglable buttonLabel="new blog">
      <NewBlogForm createNewBlog={createNewBlog} />
    </Togglable>
  )

  // return JSX
  if (user === null) {
    return (
      <>
        {dispalyLoginForm()}
      </>
    )
  }
  return (
    <>
      {displayUserInfo()}
      {displayCreateNewBlogForm()}
      {displayBlogs()}
    </>
  )
}

export default App
