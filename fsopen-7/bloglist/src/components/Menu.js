import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/authReducer'
import { Text, Flex, Heading, Box, Button } from '@chakra-ui/core'

const MenuItem = (props) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {props.children}
  </Text>
)

const Menu = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'-0.1rem'}>
          blogs app
        </Heading>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems='center'
        flexGrow={1}
      >
        <MenuItem><Link to="/blogs">Blogs</Link></MenuItem>
        <MenuItem><Link to="/users">Users</Link></MenuItem>
      </Box>

      <Box>
        <Text>{auth.name} logged in</Text>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'block' }}
        mt={{ base: 4, md: 0 }}
      >
        <Button
          onClick={handleLogout}
          bg="transparent"
          border="1px"
        >
          Logout
        </Button>
      </Box>
    </Flex>
  )
}

export default Menu