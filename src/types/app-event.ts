import { AppEventDate } from './app-event-date'
import { AppEventType } from './app-event-type'

export type AppEvent = {
  city: string
  title: string
  address: string
  teacher: string
  type: AppEventType
  date: AppEventDate
  description: string
  weezeventUrl?: string
}
