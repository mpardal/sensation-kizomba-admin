import { useAuth0 } from '@auth0/auth0-react'
import { Button, Container, Heading, VStack } from '@chakra-ui/react'
import { GrSecure } from 'react-icons/gr'

function LoginPage() {
  const { loginWithRedirect } = useAuth0()

  const handleLogin = () => {
    loginWithRedirect().catch((err) => {
      console.error(err)
    })
  }

  return (
    <Container maxW="md">
      <VStack
        spacing={8}
        className="container mx-auto p-4"
        aria-label="connexion à l'administration de Sensation Kizomba"
      >
        <VStack spacing={2}>
          <Heading as="h1" textAlign="center">
            Administration
          </Heading>
        </VStack>
        <Button leftIcon={<GrSecure />} colorScheme="orange" onClick={handleLogin}>
          Se connecter
        </Button>
      </VStack>
    </Container>
  )
}

export default LoginPage
