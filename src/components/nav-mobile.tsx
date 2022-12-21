import { Box, Stack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { Link, useLocation } from 'react-router-dom'

function navMobile() {
  return (
    <Stack
      display={[null, null, null, 'none']}
      direction="row"
      as="nav"
      p={6}
      pt={4}
      pr={8}
      textAlign="center"
      aria-label="Navigation mobile"
    >
      <NavItem path="/dashboard"> Tableau de bord</NavItem>
      <NavItem path="/events"> Événements</NavItem>
    </Stack>
  )
}

function NavItem({ path, children }: PropsWithChildren<{ path: string }>) {
  const { pathname } = useLocation()
  const active = pathname.startsWith(path)

  return (
    <Box
      as={Link}
      to={path}
      borderRadius="md"
      py={1}
      px={3}
      fontWeight={active ? 600 : 500}
      bg={active ? 'orange.200' : 'transparent'}
      color={active ? 'gray.700' : undefined}
      transition="background-color 0.15s ease-in-out"
      fontSize="sm"
    >
      {children}
    </Box>
  )
}

export default navMobile
