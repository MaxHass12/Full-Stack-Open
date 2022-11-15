import { useState } from 'react'

function Blog({
  blog, updateBlog, deleteBlog, user,
}) {
  const [detailsVisible, setDetailsVisible] = useState(false)

  console.log('user: ', user)

  const BLOG_STYLE = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const conciseView = { display: detailsVisible ? 'none' : '' }
  const detailsView = { display: detailsVisible ? '' : 'none' }

  const toggleDisplay = () => { setDetailsVisible(!detailsVisible) }

  const handleLike = () => {
    const blogId = blog.id
    const newLikes = blog.likes + 1
    const data = {
      user: blog.user.id,
      likes: newLikes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    updateBlog(blogId, data)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const blogId = blog.id
      const user = { _id: blog.user }
      deleteBlog(blogId, user)
    }
  }

  return (
    <div style={BLOG_STYLE} className="blog">
      <div style={conciseView}>
        {blog.title}
        {' '}
        {blog.author}
        <button onClick={toggleDisplay}>view</button>
      </div>
      <div style={detailsView}>
        {blog.title}
        {' '}
        {blog.author}
        <button onClick={toggleDisplay}>hide</button>
        <p>{blog.url}</p>
        <p>
          likes
          {` ${blog.likes}`}
          {' '}
          <button onClick={handleLike}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {
          (blog.user.name === user.name)
            ? <button onClick={removeBlog}>remove</button>
            : ''
        }
      </div>
    </div>
  )
}

export default Blog
