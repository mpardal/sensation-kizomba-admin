import {
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { PropsWithChildren, useEffect } from 'react'
import { EventFormZodValues } from '../../utils/form/event-form-zod'
import EventEditor from './editor/event-editor'

type UseFormikResult = ReturnType<
  typeof useFormik<
    Omit<EventFormZodValues, 'dateFrom' | 'dateTo'> & { dateFrom: string; dateTo: string }
  >
>

function EventForm({
  handleBlur,
  handleChange,
  values,
  setFieldValue,
  errors,
  children,
}: PropsWithChildren<{
  handleChange: UseFormikResult['handleChange']
  handleBlur: UseFormikResult['handleBlur']
  values: UseFormikResult['values']
  setFieldValue: UseFormikResult['setFieldValue']
  errors: UseFormikResult['errors']
}>) {
  useEffect(() => {
    if (values.dateTo !== undefined) {
      setFieldValue('type', 'once')
    }
  }, [])

  useEffect(() => {
    if (values.dateFrom !== '') {
      if (values.dateTo === undefined) {
        return
      }

      const from = new Date(values.dateFrom)
      const to = new Date(values.dateTo)

      if (from > to) {
        setFieldValue('dateTo', '')
      }
    }
  }, [])

  return (
    <>
      <VStack py={4} alignItems="stretch">
        <FormControl>
          <FormLabel htmlFor="title" aria-label="nom de l'événement">
            Nom
          </FormLabel>
          <Input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
          />
          {errors.title && <FormHelperText color="red.500">{errors.title}</FormHelperText>}
        </FormControl>

        <HStack alignItems="stretch">
          <FormControl>
            <FormLabel htmlFor="dateFrom" aria-label="date de début de l'événement">
              Date de début
            </FormLabel>
            <Input
              type="datetime-local"
              id="dateFrom"
              name="dateFrom"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.dateFrom}
            />
            {errors.dateFrom && <FormHelperText color="red.500">{errors.dateFrom}</FormHelperText>}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="dateTo" aria-label="date de fin de l'événement">
              Date de fin
            </FormLabel>
            <Input
              type="datetime-local"
              id="dateTo"
              name="dateTo"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.dateTo}
              min={values.dateFrom}
            />
            {errors.dateTo && <FormHelperText color="red.500">{errors.dateTo}</FormHelperText>}
          </FormControl>
        </HStack>

        <FormControl>
          <FormLabel htmlFor="teacher" aria-label="professeur(s) de l'événement">
            Professeur
          </FormLabel>
          <Input
            type="text"
            id="teacher"
            name="teacher"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.teacher}
          />
          {errors.teacher && <FormHelperText color="red.500">{errors.teacher}</FormHelperText>}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="type" aria-label="type de l'événement">
            Type
          </FormLabel>
          <Select
            id="type"
            name="type"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.type}
            disabled={values.dateTo !== ''}
          >
            <option value="once">Une fois</option>
            <option value="daily">Tous les jours</option>
            <option value="weekly">Toutes les semaines</option>
            <option value="bimonthly">Toutes les deux semaines</option>
            <option value="monthly">Tous les mois</option>
            <option value="quarterly">Tous les 3 mois</option>
            <option value="quadrennial">Tous les 4 mois</option>
            <option value="yearly">Tous les ans</option>
            <option value="other">Autre</option>
          </Select>
          {errors.type && <FormHelperText color="red.500">{errors.type}</FormHelperText>}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="address" aria-label="adresse de l'événement">
            Adresse
          </FormLabel>
          <Input
            type="text"
            id="address"
            name="address"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.address}
          />
          {errors.address && <FormHelperText color="red.500">{errors.address}</FormHelperText>}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="city" aria-label="ville de l'événement">
            Ville
          </FormLabel>
          <Input
            type="text"
            id="city"
            name="city"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.city}
          />
          {errors.city && <FormHelperText color="red.500">{errors.city}</FormHelperText>}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="description" aria-label="description visuel de l'événement">
            Description
          </FormLabel>
          {errors.description && (
            <FormHelperText color="red.500">{errors.description}</FormHelperText>
          )}
          <EventEditor
            id="description"
            name="description"
            onChange={(value) => setFieldValue('description', value)}
          />
        </FormControl>
      </VStack>

      {children}
    </>
  )
}

export default EventForm
