import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'

describe('<NewBlogForm />', () => {
  test('form sends the correct data to backend when submitted', async () => {
    const mockHandler = jest.fn()
    const user = userEvent.setup()

    const container = render(<NewBlogForm createNewBlog={mockHandler} />).container

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    const submitButton = container.querySelector('#submit')

    await user.type(titleInput, 'a_title')
    await user.type(authorInput, 'an_author')
    await user.type(urlInput, 'an_url')
    await user.click(submitButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('a_title')
    expect(mockHandler.mock.calls[0][0].author).toBe('an_author')
    expect(mockHandler.mock.calls[0][0].url).toBe('an_url')
  })
})