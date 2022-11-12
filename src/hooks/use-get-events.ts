import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { collection, getDocs, CollectionReference, QuerySnapshot, query, orderBy } from 'firebase/firestore'
import { database } from '../config/firebase'
import { AppEvent } from '../types/app-event'

export function useGetEvents(options: UseQueryOptions<QuerySnapshot<AppEvent>> = {}): UseQueryResult<QuerySnapshot<AppEvent>> {
  return useQuery({
    queryKey: ['events'],
    queryFn: () => {
      const col = collection(database, 'events') as CollectionReference<AppEvent>
      const eventsQuery = query<AppEvent>(col, orderBy('date.from', 'desc'))

      return getDocs<AppEvent>(eventsQuery)
    },
    ...options
  })
}
