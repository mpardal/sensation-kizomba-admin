import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import {
  addDoc,
  collection,
  CollectionReference,
  DocumentReference,
  Timestamp,
} from 'firebase/firestore'
import { UploadTaskSnapshot } from 'firebase/storage'
import { database } from '../config/firebase'
import { AppEvent } from '../types/app-event'
import { AppEventType } from '../types/app-event-type'
import { EventFormZodValues } from '../utils/form/event-form-zod'
import { useUploadImage } from './use-upload-image'

export function useCreateEvent({
  ...options
}: UseMutationOptions<DocumentReference<AppEvent>, unknown, EventFormZodValues> = {}) {
  const uploadImage = useUploadImage()

  return useMutation({
    mutationFn: async (form) => {
      const date = {
        from: Timestamp.fromDate(form.dateFrom),
      } as AppEvent['date']

      if (form.dateTo) {
        date.to = Timestamp.fromDate(form.dateTo)
      }

      const imagesToUpload = form.images ?? []

      const imageUploadedSnapshots = await Promise.allSettled(
        imagesToUpload.map((image) => uploadImage.mutateAsync(image))
      )

      const successFullImageUploadedSnapshots = imageUploadedSnapshots.filter(
        (imageUploadedSnapshot) => imageUploadedSnapshot.status === 'fulfilled'
      ) as PromiseFulfilledResult<UploadTaskSnapshot>[]

      console.log(successFullImageUploadedSnapshots[0]?.value)

      const colRef = collection(database, 'events') as CollectionReference<AppEvent>
      return await addDoc(colRef, {
        type: form.type as AppEventType,
        title: form.title,
        city: form.city,
        address: form.address,
        date,
        description: form.description,
        weezeventUrl: form.weezeventUrl,
        images: successFullImageUploadedSnapshots.map(
          (imageUploadedSnapshot) => imageUploadedSnapshot.value.ref.fullPath
        ),
      })
    },
    ...options,
  })
}
