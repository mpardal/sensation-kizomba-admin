import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Aside from './aside'
import Header from './header'

function Main() {
  return (
    <div>
      <Header />
      <Box as="section" display="flex">
        <Aside />
        <Box as="main" flexGrow={1} overflowX="auto">
          <Outlet />
        </Box>
      </Box>
    </div>
  )
}

export default Main
