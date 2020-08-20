import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component
  const createBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <BlogForm createBlog={createBlog} />
    )
  })

  test('calls the event handler passed as prop when submitted with right details', () => {
    // input fields
    const title = component.container.querySelector('input[name="title"]')
    const author = component.container.querySelector('input[name="author"]')
    const url = component.container.querySelector('input[name="url"]')
    const form = component.container.querySelector('form')

    fireEvent.change(title, { target: { value: 'Test Blog' } })
    fireEvent.change(author, { target: { value: 'Author' } })
    fireEvent.change(url, { target: { value: 'https://example.com' } })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'Test Blog',
      author: 'Author',
      url: 'https://example.com'
    })
  })
})