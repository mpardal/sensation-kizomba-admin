import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import {
  collection,
  getDocs,
  CollectionReference,
  QuerySnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { database } from '../config/firebase'
import { AppEvent } from '../types/app-event'

export type GetEventsResultType = QuerySnapshot<AppEvent>

export const getEventsQueryKey = ['events'] as const

export function useGetEvents(
  options: UseQueryOptions<GetEventsResultType> = {}
): UseQueryResult<GetEventsResultType> {
  return useQuery({
    queryKey: getEventsQueryKey,
    queryFn: () => {
      const col = collection(database, 'events') as CollectionReference<AppEvent>
      const eventsQuery = query<AppEvent>(col, orderBy('date.from', 'desc'))

      return getDocs<AppEvent>(eventsQuery)
    },
    ...options,
  })
}
