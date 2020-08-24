import React, { useEffect } from 'react'
import { initializeBlogs } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Box,
  Badge,
  Grid
} from '@chakra-ui/core'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    (async () => {
      dispatch(initializeBlogs())
    })()
  }, [dispatch])

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={5} mx={5} my={5}>
      {blogs.map(blog =>
        <Link to={`blogs/${blog.id}`} key={blog.id}>
          <Box
            borderWidth="1px"
            borderRadius="5px"
            p={5}
          >
            <Badge p="2px">{blog.author}</Badge>
            <Box
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {blog.title}
            </Box>
          </Box>
        </Link>
      )}
    </Grid>
  )
}

export default BlogList