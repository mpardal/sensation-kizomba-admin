import { z } from 'zod'
import { AppEventType } from '../../types/app-event-type'

const eventTypes = [
  'daily',
  'weekly',
  'bimonthly',
  'monthly',
  'quarterly',
  'quadrennial',
  'yearly',
  'once',
  'other',
] as AppEventType[]

export const EventFormZod = z
  .object({
    title: z.string({
      required_error: 'Requis',
    }),
    teacher: z.string({
      required_error: 'Requis',
    }),
    type: z.enum(eventTypes as [string, ...string[]], { required_error: 'Requis' }),
    dateFrom: z.preprocess(
      (arg) => {
        if (typeof arg == 'string' || arg instanceof Date) return new Date(arg)
      },
      z.date({
        required_error: 'Requis',
        invalid_type_error: 'Date invalide',
      })
    ),
    dateTo: z
      .preprocess(
        (arg) => {
          if ((typeof arg == 'string' && arg !== '') || arg instanceof Date) {
            return new Date(arg)
          }

          return undefined
        },
        z
          .date({
            invalid_type_error: 'Date invalide',
          })
          .optional()
      )
      .optional(),
    address: z.string({
      required_error: 'Requis',
    }),
    city: z.string({
      required_error: 'Requis',
    }),
    description: z.string({
      required_error: 'Requis',
    }),
    weezeventUrl: z
      .string({
        required_error: 'Requis',
      })
      .url('Url invalide')
      .regex(/^https:\/\/my.weezevent.com\/.+/, {
        message: 'Doit avoir la forme suivante https://my.weezevent.com/',
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    const dateFrom = new Date(data.dateFrom)
    const dateTo = data.dateTo ? new Date(data.dateTo) : undefined

    if (dateTo && dateTo < dateFrom) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        message: 'La date de fin doit être supérieure à la date de début',
        path: ['dateTo'],
        type: 'date',
        minimum: dateFrom.getTime(),
        inclusive: true,
      })
    }

    if (dateTo && dateFrom > dateTo) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        message: 'La date de début doit être inférieure à la date de fin',
        path: ['dateFrom'],
        type: 'date',
        maximum: dateTo.getTime(),
        inclusive: true,
      })
    }
  })

export type EventFormZodValues = z.infer<typeof EventFormZod>
