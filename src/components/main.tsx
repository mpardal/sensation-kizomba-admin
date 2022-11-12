import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Aside from './aside'
import Header from './header'

function Main() {
  return <div>
    <Header />
    <div className="flex">
      <Aside />
      <Box as="main" flexGrow={1} overflowX="auto">
        <Outlet />
      </Box>
    </div>
  </div>
}

export default Main
