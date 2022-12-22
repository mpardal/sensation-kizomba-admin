import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { collection, CollectionReference, doc, DocumentSnapshot, getDoc } from 'firebase/firestore'
import { ref, getBlob, getDownloadURL } from 'firebase/storage'
import { database, storage } from '../config/firebase'
import { AppEvent } from '../types/app-event'

export function useGetEventImages(
  id: string,
  options: UseQueryOptions<string[]> = {}
): UseQueryResult<string[]> {
  return useQuery({
    queryKey: ['events', id, 'images'],
    queryFn: async () => {
      const col = collection(database, 'events') as CollectionReference<AppEvent>
      const docRef = doc(col, id)

      const eventSnapshot = (await getDoc(docRef)) as DocumentSnapshot<AppEvent>

      if (!eventSnapshot.exists()) {
        throw new Error('Event not found')
      }

      const successFullImageDownloadUrls = (
        await Promise.allSettled(
          await (eventSnapshot.data().images ?? []).map(async (image) => {
            return getDownloadURL(ref(storage, image))
          })
        )
      ).filter((result) => result.status === 'fulfilled') as PromiseFulfilledResult<string>[]

      return successFullImageDownloadUrls.map((result) => result.value)
    },
    ...options,
  })
}
