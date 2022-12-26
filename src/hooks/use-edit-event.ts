import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { updateDoc, collection, CollectionReference, Timestamp, doc } from 'firebase/firestore'
import { UploadTaskSnapshot, deleteObject, ref } from 'firebase/storage'
import { database, storage } from '../config/firebase'
import { AppEvent } from '../types/app-event'
import { AppEventType } from '../types/app-event-type'
import { EventFormZodValues } from '../utils/form/event-form-zod'
import { useUploadImage } from './use-upload-image'

export function useEditEvent(
  id: string,
  {
    ...options
  }: UseMutationOptions<void, unknown, { form: EventFormZodValues; event: AppEvent }> = {}
) {
  const queryClient = useQueryClient()
  const uploadImage = useUploadImage()

  return useMutation({
    mutationFn: async ({ form, event }) => {
      const date = {
        from: Timestamp.fromDate(form.dateFrom),
      } as AppEvent['date']

      if (form.dateTo) {
        date.to = Timestamp.fromDate(form.dateTo)
      }

      const imagesToUpload = (form.images ?? []).filter((image) => image instanceof Blob) as Blob[]
      const imagesAsString = (form.images ?? []).filter(
        (image) => typeof image === 'string'
      ) as string[]
      const imagesToDeleteFromStorage = event.images.filter(
        (image) => !imagesAsString.includes(image)
      )
      const imagesToKeepFromStorage = event.images.filter((image) => imagesAsString.includes(image))
      const imageUploadedSnapshots = await Promise.allSettled(
        imagesToUpload.map((image) => uploadImage.mutateAsync(image))
      )

      await Promise.allSettled(
        imagesToDeleteFromStorage.map((image) => deleteObject(ref(storage, image)))
      )

      const successFullImageUploadedSnapshots = imageUploadedSnapshots.filter(
        (imageUploadedSnapshot) => imageUploadedSnapshot.status === 'fulfilled'
      ) as PromiseFulfilledResult<UploadTaskSnapshot>[]

      const colRef = collection(database, 'events') as CollectionReference<AppEvent>
      const docRef = doc(colRef, id)

      await updateDoc(docRef, {
        type: form.type as AppEventType,
        title: form.title,
        city: form.city,
        address: form.address,
        date,
        description: form.description,
        weezeventUrl: form.weezeventUrl,
        images: [
          ...imagesToKeepFromStorage,
          ...successFullImageUploadedSnapshots.map(
            (imageUploadedSnapshot) => imageUploadedSnapshot.value.ref.fullPath
          ),
        ],
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['events'])
    },
    ...options,
  })
}
