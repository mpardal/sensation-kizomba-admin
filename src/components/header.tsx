import { Box, Button, Flex, Heading, HStack } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/auth/use-auth'
import { useLogout } from '../hooks/auth/use-logout'

function Header() {
  const navigate = useNavigate()
  const logout = useLogout()
  const { isLogged } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <Box as="header" w="full" h="4.5rem" pos="sticky" top={0} bg="chakra-body-bg" zIndex={10}>
      <HStack spacing={6} maxW="8xl" mx="auto" w="full" h="full" px={6}>
        <Flex justifyContent="space-between" w="full" as="section">
          <Heading as="h1" size="lg" className="font-cagliostro" color="orange.200">
            Sensation Kizomba
          </Heading>
          {isLogged ? (
            <Button colorScheme="gray" variant="outline" size="sm" onClick={handleLogout}>
              Se déconnecter
            </Button>
          ) : (
            <Button variant="outline" size="sm" as={Link} to={'/login'}>
              Se connecter
            </Button>
          )}
        </Flex>
      </HStack>
    </Box>
  )
}

export default Header
