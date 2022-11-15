import { useState } from 'react'

function NewBlogForm(props) {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  // event handlers
  const handleTitleChange = ({ target }) => setTitle(target.value)
  const handleAuthorChange = ({ target }) => setAuthor(target.value)
  const handleUrlChange = ({ target }) => setUrl(target.value)

  const createNewBlog = async (event) => {
    event.preventDefault()
    await props.createNewBlog({ title, author, url })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <>
      <h2>Create New Blog</h2>
      <form onSubmit={createNewBlog}>
        <div>
          title:
          <input value={title} onChange={handleTitleChange} id="title-input"/>
        </div>
        <div>
          author:
          <input value={author} onChange={handleAuthorChange} id="author-input"/>
        </div>
        <div>
          url:
          <input value={url} onChange={handleUrlChange} id="url-input"/>
        </div>
        <button type="submit" id="submit">submit</button>
      </form>
    </>
  )
}

export default NewBlogForm
