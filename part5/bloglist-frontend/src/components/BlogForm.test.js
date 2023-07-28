import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {
  let container
  const user = userEvent.setup()
  const mockCreateBlog = jest.fn()

  beforeEach(() => {
    container = render(
      <BlogForm createBlog={mockCreateBlog}/>
    ).container
  })

  test('eventHandler receive correct info', async () => {
    const titleInput = container.querySelector('input[name="title"]')
    const authorInput = container.querySelector('input[name="author"]')
    const urlInput = container.querySelector('input[name="url"]')
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'Test title')
    await user.type(authorInput, 'Test author')
    await user.type(urlInput, 'Test url')
    await user.click(createButton)

    const calls = mockCreateBlog.mock.calls
    const { title, author, url } = calls[0][0]
    expect(calls).toHaveLength(1)
    expect(title).toBe('Test title')
    expect(author).toBe('Test author')
    expect(url).toBe('Test url')
  })
})