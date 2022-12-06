import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import {
  addDoc,
  collection,
  CollectionReference,
  DocumentReference,
  Timestamp,
} from 'firebase/firestore'
import { database } from '../config/firebase'
import { AppEvent } from '../types/app-event'
import { AppEventType } from '../types/app-event-type'
import { EventFormZodValues } from '../utils/form/event-form-zod'

export function useCreateEvent({
  ...options
}: UseMutationOptions<DocumentReference<AppEvent>, unknown, EventFormZodValues> = {}) {
  return useMutation({
    mutationFn: async (form) => {
      const date = {
        from: Timestamp.fromDate(form.dateFrom),
      } as AppEvent['date']

      if (form.dateTo) {
        date.to = Timestamp.fromDate(form.dateTo)
      }

      const colRef = collection(database, 'events') as CollectionReference<AppEvent>
      return await addDoc(colRef, {
        type: form.type as AppEventType,
        title: form.title,
        teacher: form.teacher,
        city: form.city,
        address: form.address,
        date,
        description: form.description,
        weezeventUrl: form.weezeventUrl,
      })
    },
    ...options,
  })
}
