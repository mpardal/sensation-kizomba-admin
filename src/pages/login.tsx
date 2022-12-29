import {
  Alert,
  AlertDescription,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  Fade,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/auth/use-auth'
import { useLogin } from '../hooks/auth/use-login'
import { GrSecure } from 'react-icons/gr'
import { FormEvent, useEffect } from 'react'

function LoginPage() {
  const { isLogged } = useAuth()
  const navigate = useNavigate()
  const { login, isLoading, isError, error } = useLogin()

  useEffect(() => {
    if (isLogged) {
      navigate('/events')
    }
  }, [isLogged])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const username = (formData.get('username') as string).trim()
    const password = formData.get('password') as string

    if (username.length === 0 || password.length === 0) {
      return
    }

    try {
      await login(username, password)

      navigate('/events')
    } catch (err) {
      console.error(err)
    }
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
            Connexion à l'administration
          </Heading>
          <Avatar icon={<GrSecure />} colorScheme="orange" />
        </VStack>
        <Box w="full">
          <form onSubmit={handleSubmit}>
            <VStack>
              <Input name="username" type="text" placeholder="Nom d'utilisateur" required min={6} />
              <Input
                name="password"
                type="password"
                placeholder="Mot de passe"
                required
                minLength={8}
              />
              <Button isLoading={isLoading} w="full" type="submit">
                Se connecter
              </Button>
              <Fade in={isError}>
                <Alert status="error" w="full">
                  <AlertIcon />
                  <AlertDescription>{error?.message}</AlertDescription>
                </Alert>
              </Fade>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  )
}

export default LoginPage
