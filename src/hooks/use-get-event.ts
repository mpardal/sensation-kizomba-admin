import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import { database } from '../config/firebase'
import { AppEvent } from '../types/app-event'

export type GetEventResultType = QueryDocumentSnapshot<AppEvent>

export function getEventQueryKey(id: string) {
  return ['events', id]
}

export function useGetEvent(
  id: string,
  options: UseQueryOptions<GetEventResultType> = {}
): UseQueryResult<GetEventResultType> {
  return useQuery({
    queryKey: getEventQueryKey(id),
    queryFn: async () => {
      const col = collection(database, 'events') as CollectionReference<AppEvent>
      const docRef = doc(col, id)

      const myDoc = (await getDoc(docRef)) as QueryDocumentSnapshot<AppEvent>

      if (!myDoc.exists()) {
        throw new Error('event not found')
      }

      return myDoc
    },
    retry: 1,
    ...options,
  })
}
