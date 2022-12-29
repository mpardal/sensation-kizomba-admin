import { useAuth0 } from '@auth0/auth0-react'
import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Aside from './aside'
import Header from './header'

function Main() {
  const { isAuthenticated } = useAuth0()

  return (
    <main>
      <Header />
      <Flex as="section" flexDirection={['column', null, null, 'row']}>
        {isAuthenticated && <Aside />}
        <Box as="main" flexGrow={1} overflowX="auto">
          <Outlet />
        </Box>
      </Flex>
    </main>
  )
}

export default Main
