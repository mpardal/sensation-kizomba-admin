import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Aside from './aside'
import Header from './header'
import NavMobile from './nav-mobile'

function Main() {
  return (
    <div>
      <Header />
      <Box as="section" display="flex">
        <Aside />
        <NavMobile />
        <Box as="main" flexGrow={1} overflowX="auto">
          <Outlet />
        </Box>
      </Box>
    </div>
  )
}

export default Main
