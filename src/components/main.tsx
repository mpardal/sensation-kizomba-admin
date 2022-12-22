import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Aside from './aside'
import Header from './header'

function Main() {
  return (
    <div>
      <Header />
      <Flex as="section" flexDirection={['column', 'row']}>
        <Aside />
        <Box as="main" flexGrow={1} overflowX="auto">
          <Outlet />
        </Box>
      </Flex>
    </div>
  )
}

export default Main
