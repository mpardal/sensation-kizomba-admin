import { Box, Stack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Aside() {
  return (
    <Stack
      direction={['row', 'column']}
      as="nav"
      w={['full', '270px']}
      justifyContent={['center', 'unset']}
      minW="270px"
      p={6}
      pt={4}
      pr={8}
      aria-label="Navigation"
      h={['auto', 'calc(100vh - 8.125rem)']}
      whiteSpace="nowrap"
    >
      <AsideItem path="/dashboard">Tableau de bord</AsideItem>
      <AsideItem path="/events">Événements</AsideItem>
    </Stack>
  )
}

function AsideItem({ path, children }: PropsWithChildren<{ path: string }>) {
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

export default Aside
