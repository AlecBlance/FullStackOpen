import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const blog = {
    title: 'Definitely React',
    author: 'Alec Blance',
    url: 'http://facebook-blog.com',
    likes: 0,
    id: '23hjk12b32klkls2zs',
    user: {
      name: 'Alec Blance',
      username: 'AlecBlance'
    }
  }

  const mockHandleLikes = jest.fn()
  const mockHandleRemove = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog blog={blog} handleLikes={mockHandleLikes} removeButton={true} handleRemove={mockHandleRemove}/>
    ).container
  })

  test('has title and author', () => {
    screen.getByText('Definitely React Alec Blance')
  })

  test('has optional URL or number of likes by default', () => {
    const div = container.querySelector('.togglableInfo')
    expect(div).toHaveStyle('display: none')
  })
})