import dayjs from 'dayjs'

export function toInputTypeDate(date: Date): string {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ss.SSS')
}
