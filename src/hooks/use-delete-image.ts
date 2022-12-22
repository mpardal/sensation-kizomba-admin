import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { deleteObject, ref } from 'firebase/storage'
import { storage } from '../config/firebase'

export function useDeleteImage({ ...options }: UseMutationOptions<void, unknown, string> = {}) {
  return useMutation({
    mutationFn: async (imagePath) => {
      await deleteObject(ref(storage, imagePath))
    },
    ...options,
  })
}
