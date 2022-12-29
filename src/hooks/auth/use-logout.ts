import { signOut } from 'firebase/auth'
import { useCallback } from 'react'
import { auth } from '../../config/firebase'

export function useLogout() {
  return useCallback(() => {
    return signOut(auth)
  }, [])
}
