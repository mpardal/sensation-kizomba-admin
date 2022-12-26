import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { listAll, ref, getDownloadURL, StorageReference, ListResult } from 'firebase/storage'
import { storage } from '../config/firebase'

export function useGetStorageImages({
  ...options
}: UseQueryOptions<
  unknown,
  unknown,
  { result: ListResult; items: { url: string; item: StorageReference }[] }
> = {}) {
  return useQuery({
    queryKey: ['storage', 'images'],
    queryFn: async () => {
      const eventsImagesRef = ref(storage, 'events')
      const eventsImages = await listAll(eventsImagesRef)

      return {
        result: eventsImages,
        items: await Promise.all(
          eventsImages.items.map(async (item) => {
            const url = await getDownloadURL(item)
            return {
              url,
              item,
            }
          })
        ),
      }
    },
    ...options,
  })
}
