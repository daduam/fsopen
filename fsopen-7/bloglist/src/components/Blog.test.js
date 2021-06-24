import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'Blog Title',
    author: 'Test Guy',
    url: 'https://example.com'
  }

  const likeBlog = jest.fn()
  const deleteBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        likeBlog={likeBlog}
        creator={true}
        deleteBlog={deleteBlog}
      />
    )
  })

  test('renders only blog title and author by deafault', () => {
    const div = component.container.querySelector('.displayHidden')

    expect(div).toBe(null)
  })

  test('renders blog url and number of likes when details toggle is clicked', () => {
    const detailsToggle = component.getByText('view')

    fireEvent.click(detailsToggle)

    const detailsDiv = component.container.querySelector('.defaultHidden')

    expect(detailsDiv).toBeDefined()
  })

  test('handleLike gets called twice when like button is clicked twice', () => {
    const detailsToggle = component.getByText('view')
    fireEvent.click(detailsToggle)

    const likeBtn = component.container.querySelector('.likeBtn')

    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})
