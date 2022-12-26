import {
  Box,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EventForm from '../components/events/event-form'
import EventPageBreadcrumb from '../components/events/event-page-breadcrumb'
import { useEditEvent } from '../hooks/use-edit-event'
import { useGetEvent } from '../hooks/use-get-event'
import { AppEvent } from '../types/app-event'
import { EventFormZod, EventFormZodValues } from '../utils/form/event-form-zod'
import { toFormikValidationSchema } from '../utils/zod-formik-adapter'

function EditEventPage() {
  const { id } = useParams<{ id: string }>()
  const [shouldDisplayForm, setShouldDisplayForm] = useState(false)
  const getEvent = useGetEvent(id as string, {
    cacheTime: 0,
    onSuccess: (event) => {
      const data = event.data() as AppEvent

      setValues({
        title: data.title,
        type: data.type,
        dateFrom: data.date.from.toDate().toISOString().slice(0, -1), // get ISOString and remove the "Z" at the end. input date expect a ISO date without the "Z"
        dateTo: data.date.to?.toDate().toISOString().slice(0, -1) ?? '',
        address: data.address,
        city: data.city,
        description: data.description,
        weezeventUrl: data.weezeventUrl,
        images: data.images,
      })
      setShouldDisplayForm(true)
    },
  })
  const editEvent = useEditEvent(id as string)
  const navigate = useNavigate()

  const {
    values,
    setValues,
    errors,
    setFieldValue,
    handleSubmit,
    handleBlur,
    handleChange,
    isValid,
    isSubmitting,
  } = useFormik<
    Omit<EventFormZodValues, 'dateFrom' | 'dateTo'> & {
      dateFrom: string
      dateTo: string
    }
  >({
    initialValues: {
      title: '',
      type: 'weekly',
      dateFrom: '', // get ISOString and remove the "Z" at the end. input date expect a ISO date without the "Z"
      dateTo: '',
      address: '',
      city: 'nantes',
      description: '',
      weezeventUrl: '',
      images: [],
    },
    onSubmit: async (values) => {
      await editEvent.mutateAsync({
        form: EventFormZod.parse(values),
        event: getEventData as AppEvent,
      })
      navigate('/events')
    },
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: toFormikValidationSchema(EventFormZod),
  })

  if (getEvent.isFetched && !getEvent.isSuccess) {
    return (
      <Container maxW="8xl">
        <Heading>Erreur</Heading>
        <Link to="/events" title="retour à la liste">
          Retour
        </Link>
      </Container>
    )
  }

  const getEventData = getEvent.data?.data()

  return (
    <Container maxW="8xl">
      <form onSubmit={handleSubmit}>
        <Flex
          as="section"
          direction="column"
          alignItems="flex-start"
          bg="gray.700"
          borderRadius="2xl"
          px={6}
          py={2}
        >
          <EventPageBreadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/events/:id/edit" whiteSpace="nowrap">
                <Box as="span" display={['none', null, 'inline']}>
                  Modification
                </Box>{' '}
                <Box as="span">{getEventData?.title ?? null}</Box>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </EventPageBreadcrumb>

          <HStack
            h={20}
            w="full"
            wrap={['wrap', null, 'nowrap']}
            justifyContent={['center', null, 'unset']}
          >
            <Heading as="h2" size="lg">
              Événement {getEventData?.title ?? null}
            </Heading>
            <HStack flexGrow={1} justifyContent={['center', null, 'flex-end']}>
              <Button
                type="submit"
                size="sm"
                disabled={!isValid || isSubmitting}
                isLoading={editEvent.isLoading}
              >
                Enregistrer les changements
              </Button>
            </HStack>
          </HStack>
        </Flex>

        {getEvent.isSuccess && shouldDisplayForm && (
          <EventForm
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            errors={errors}
            setFieldValue={setFieldValue}
          />
        )}
      </form>
    </Container>
  )
}

export default EditEventPage
