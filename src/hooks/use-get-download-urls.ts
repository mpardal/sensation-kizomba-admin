import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../config/firebase'

export function getDownloadUrls() {
  return ['storage', 'download-urls']
}

export function useGetDownloadUrls(urls: string[], options: UseQueryOptions<string[]> = {}) {
  return useQuery({
    queryKey: getDownloadUrls(),
    queryFn: async () => {
      return Promise.all(urls.map((url) => getDownloadURL(ref(storage, url))))
    },
    cacheTime: 0,
    ...options,
  })
}
