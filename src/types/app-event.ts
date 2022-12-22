import { AppEventCity } from './app-event-city'
import { AppEventDate } from './app-event-date'
import { AppEventType } from './app-event-type'

export type AppEvent = {
  city: AppEventCity
  title: string
  address: string
  type: AppEventType
  date: AppEventDate
  description: string
  weezeventUrl?: string
  images: string[]
}
