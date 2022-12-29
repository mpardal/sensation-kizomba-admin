import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/auth/use-auth'
import Aside from './aside'
import Header from './header'

function Main() {
  const { isLogged } = useAuth()

  return (
    <main>
      <Header />
      <Flex as="section" flexDirection={['column', null, null, 'row']}>
        {isLogged && <Aside />}
        <Box as="main" flexGrow={1} overflowX="auto">
          <Outlet />
        </Box>
      </Flex>
    </main>
  )
}

export default Main
