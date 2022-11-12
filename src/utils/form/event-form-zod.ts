import { z } from 'zod'
import { AppEventType } from '../../types/app-event-type'

const eventTypes = ['daily', 'weekly', 'bimonthly', 'monthly', 'quarterly', 'quadrennial', 'yearly', 'other'] as AppEventType[]

export const EventFormZod = z.object({
  title: z.string(),
  teacher: z.string(),
  type: z.enum(eventTypes as [string, ...string[]]),
  dateFrom: z.string(),
  dateTo: z.string().optional(),
  address: z.string(),
  city: z.string(),
  description: z.string(),
})

export type EventFormZodValues = z.infer<typeof EventFormZod>
