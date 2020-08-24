import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import Notify from './Notify'
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Flex,
  Text
} from '@chakra-ui/core'

const BlogForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (e) => {
    e.preventDefault()

    dispatch(createBlog({ title, author, url }))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <Notify />

      <Text fontSize="lg" mb={2}>
        Create New Blog
      </Text>

      <FormControl mb={2}>
        <Flex align="center">
          <FormLabel
            htmlFor="title"
            width="5%"
          >
            Title
          </FormLabel>
          <Input
            placeholder="Blog title"
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Flex>
      </FormControl>

      <FormControl mb={2}>
        <Flex align="center">
          <FormLabel
            htmlFor="author"
            width="5%"
          >
            Author
          </FormLabel>
          <Input
            placeholder="Author"
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Flex>
      </FormControl>

      <FormControl mb={2}>
        <Flex align="center">
          <FormLabel
            htmlFor="url"
            width="5%"
          >
            URL
          </FormLabel>
          <Input
            placeholder="Link to the blog"
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </Flex>
      </FormControl>

      <Button
        type="submit"
        id="create-blog"
        variantColor="green"
      >
        create
      </Button>
    </form>
  )
}

export default BlogForm
