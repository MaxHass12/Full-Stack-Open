import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'a_title',
      author: 'a_author',
      url: 'a_url',
      likes: 1,
      user: {
        name: 'user_name',
      }
    }
    const user = {
      name: 'user_name',
    }
    mockHandler = jest.fn()
    container = render(<Blog blog={blog} user={user} updateBlog={mockHandler}/>).container
  })

  test('renders blog title and author', () => {
    const element = container.querySelector('.blog')
    expect(element).toHaveTextContent('a_title')
    expect(element).toHaveTextContent('a_author')
  })

  test('does not render url and likes', () => {
    const element2 = screen.queryByText('url')
    expect(element2).toBeNull()
  
    const element3 = screen.queryByText('likes')
    expect(element3).toBeNull()
  })

  test('url and like shown after clicking button', async () => {
    const viewButton = screen.queryByText('view')
    const user = userEvent.setup()
    await user.click(viewButton)

    const element = container.querySelector('.blog')
    expect(element).toHaveTextContent('url')
    expect(element).toHaveTextContent('likes')
  })

  test('clicking like twice calls the handler twice', async () => {
    const likeButton = screen.queryByText('like')
    const user = userEvent.setup()

    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})


