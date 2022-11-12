import { FormControl, FormLabel, HStack, Input, Textarea, VStack } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { PropsWithChildren } from 'react'
import { EventFormZodValues } from '../../utils/form/event-form-zod'
import EventEditor from './editor/event-editor'

type UseFormikResult = ReturnType<typeof useFormik<EventFormZodValues>>

function EventForm({
  handleBlur,
  handleChange,
  values,
  children,
}: PropsWithChildren<{
  handleChange: UseFormikResult['handleChange']
  handleBlur: UseFormikResult['handleBlur']
  values: UseFormikResult['values']
}>) {
  return (
    <>
      <VStack pt={4} alignItems="stretch">
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
        </FormControl>

        <HStack>
          <FormControl>
            <FormLabel htmlFor="dateFrom" aria-label="date de début de l'événement">
              Date de début
            </FormLabel>
            <Input
              type="text"
              id="dateFrom"
              name="dateFrom"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.dateFrom}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="dateTo" aria-label="date de fin de l'événement">
              Date de fin
            </FormLabel>
            <Input
              type="text"
              id="dateTo"
              name="dateTo"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.dateTo}
            />
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
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="type" aria-label="type de l'événement">
            Type
          </FormLabel>
          <Input
            type="text"
            id="type"
            name="type"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.type}
          />
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
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="description" aria-label="description visuel de l'événement">
            Description
          </FormLabel>
          <EventEditor id="description" name="description" />
        </FormControl>
      </VStack>

      {children}
    </>
  )
}

export default EventForm
