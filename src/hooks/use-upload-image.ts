import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { ref, uploadBytesResumable, UploadTaskSnapshot } from 'firebase/storage'
import { getExtension } from 'mime'
import { SHA256 } from 'crypto-js'
import { storage } from '../config/firebase'

export function useUploadImage({
  onProgress,
  ...options
}: UseMutationOptions<UploadTaskSnapshot, unknown, File> & {
  onProgress?: (snapshot: UploadTaskSnapshot) => void
} = {}) {
  return useMutation({
    mutationFn: async (file) => {
      const ext = getExtension(file.type)
      const sha = SHA256(await file.text()).toString()
      const storageRef = ref(storage, `events/${sha.toString()}${ext ? `.${ext}` : ''}`)

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
