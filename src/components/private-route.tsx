import { useAuth0 } from '@auth0/auth0-react'
import { Fade } from '@chakra-ui/react'
import { PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function PrivateRoute({ children }: PropsWithChildren) {
  const navigate = useNavigate()
  const { isLoading, isAuthenticated } = useAuth0()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login')
    }
  }, [isAuthenticated])

  return (
    <Fade in={!isLoading && isAuthenticated} unmountOnExit>
      {children}
    </Fade>
  )
}
