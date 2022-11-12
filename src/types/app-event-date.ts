import { Timestamp } from 'firebase/firestore'

export type AppEventDate = {
  from: Timestamp
  to?: Timestamp
}
