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
  return ['event', id]
}

export function useGetEvent(
  id: string,
  options: UseQueryOptions<QueryDocumentSnapshot<AppEvent>> = {}
): UseQueryResult<QueryDocumentSnapshot<AppEvent>> {
  return useQuery({
    queryKey: getEventQueryKey(id),
    queryFn: async () => {
      const col = collection(database, 'events') as CollectionReference<AppEvent>
      const docRef = doc(col, id)

      return (await getDoc(docRef)) as QueryDocumentSnapshot<AppEvent>
    },
    ...options,
  })
}
