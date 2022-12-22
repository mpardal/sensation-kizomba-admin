import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { ref, uploadBytesResumable, UploadTaskSnapshot } from 'firebase/storage'
import { getExtension } from 'mime'
import { v4 as uuid } from 'uuid'
import { storage } from '../config/firebase'

export function useUploadImage({
  onProgress,
  ...options
}: UseMutationOptions<UploadTaskSnapshot, unknown, Blob> & {
  onProgress?: (snapshot: UploadTaskSnapshot) => void
} = {}) {
  return useMutation({
    mutationFn: (file) => {
      const ext = getExtension(file.type)
      const storageRef = ref(storage, `events/${uuid()}${ext ? `.${ext}` : ''}`)

      const task = uploadBytesResumable(storageRef, file, { contentType: file.type })

      return new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          (snapshot) => {
            onProgress?.(snapshot)
          },
          (error) => {
            reject(error)
          },
          () => {
            resolve(task.snapshot)
          }
        )
      })
    },
    ...options,
  })
}
