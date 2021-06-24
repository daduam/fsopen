import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@chakra-ui/core'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  return (
    <Box p={5}>
      <div style={hideWhenVisible}>
        <Button
          onClick={toggleVisibility}
          variantColor="teal"
        >
          {props.buttonLabel}
        </Button>
      </div>

      <Box style={showWhenVisible}>
        <Button
          onClick={toggleVisibility}
          variantColor="red"
          variant="outline"
          mb={2}
        >
          cancel
        </Button>

        {props.children}
      </Box>
    </Box>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
