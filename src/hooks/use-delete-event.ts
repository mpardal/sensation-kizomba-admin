import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { doc, deleteDoc } from 'firebase/firestore'
import { database } from '../config/firebase'

export function useDeleteEvent({ ...options }: UseMutationOptions<void, unknown, string> = {}) {
  return useMutation({
    mutationFn: async (eventId) => {
      const eventRef = doc(database, 'events', eventId)

      await deleteDoc(eventRef)
    },
    ...options,
  })
}
