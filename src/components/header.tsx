import { useAuth0 } from '@auth0/auth0-react'
import { Box, Button, Fade, Flex, Heading, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Header() {
  const { logout, isLoading, isAuthenticated } = useAuth0()

  return (
    <Fade in={!isLoading}>
      <Box as="header" w="full" h="4.5rem" pos="sticky" top={0} bg="chakra-body-bg" zIndex={10}>
        <HStack spacing={6} maxW="8xl" mx="auto" w="full" h="full" px={6}>
          <Flex justifyContent="space-between" w="full" as="section">
            <Heading as="h1" size="lg" className="font-cagliostro" color="orange.200">
              Sensation Kizomba
            </Heading>
            {isAuthenticated ? (
              <Button
                colorScheme="gray"
                variant="outline"
                size="sm"
                onClick={() => {
                  logout({
                    returnTo: window.location.origin,
                  })
                }}
              >
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
    </Fade>
  )
}

export default Header
