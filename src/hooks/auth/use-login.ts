import { FirebaseError } from 'firebase/app'
import { useCallback, useState } from 'react'

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error>()

  const getErrorMessage = useCallback((error: unknown) => {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          return "L'adresse e-mail ou le mot de passe est incorrect."
        default:
          return "Une erreur d'authentification est survenue."
      }
    }

    return 'Une erreur inconnue est survenue.'
  }, [])

  const login = useCallback(
    async (username: string, password: string): Promise<'not-found' | 'wrong-id' | null> => {
      try {
        setError(undefined)
        setIsLoading(true)
        // await signInWithEmailAndPassword(auth, username, password)

        const res = await fetch('http://localhost:3000/api/admin-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        })

        if (!res.ok) {
          const data = await res.json()

          // noinspection ExceptionCaughtLocallyJS
          throw new Error(data.error)
        }

        return null
      } catch (err) {
        if (err instanceof FirebaseError) {
          switch (err.code) {
            case 'auth/user-not-found':
              setError(new Error(getErrorMessage(err)))

              return 'not-found'
            case 'auth/wrong-password':
            case 'auth/invalid-email':
              setError(new Error(getErrorMessage(err)))

              return 'wrong-id'
            default:
              return null
          }
        }

        setError(err as Error)

        throw err
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  return { login, isLoading, error, isError: Boolean(error) }
}
