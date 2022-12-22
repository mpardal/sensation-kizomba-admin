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
import { Formik } from 'formik'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EventForm from '../components/events/event-form'
import EventPageBreadcrumb from '../components/events/event-page-breadcrumb'
import { useEditEvent } from '../hooks/use-edit-event'
import { useGetEvent } from '../hooks/use-get-event'
import { useGetEventImages } from '../hooks/use-get-event-images'
import { AppEvent } from '../types/app-event'
import { EventFormZod, EventFormZodValues } from '../utils/form/event-form-zod'
import { toFormikValidationSchema } from '../utils/zod-formik-adapter'

function EditEventPage() {
  const { id } = useParams<{ id: string }>()
  const getEvent = useGetEvent(id as string, { cacheTime: 0 })
  const getEventImages = useGetEventImages(id as string)
  const editEvent = useEditEvent(id as string)
  const navigate = useNavigate()

  if (getEvent.isLoading || getEventImages.isLoading) {
    return (
      <Container maxW="8xl">
        <Heading>Chargement...</Heading>
      </Container>
    )
  }

  if (!getEvent.isSuccess || !getEventImages.isSuccess) {
    return (
      <Container maxW="8xl">
        <Heading>Erreur</Heading>
        <Link to="/events" title="retour à la liste">
          Retour
        </Link>
      </Container>
    )
  }

  const getEventData = getEvent.data.data() as AppEvent

  return (
    <Container maxW="8xl">
      <Formik<
        Omit<EventFormZodValues, 'dateFrom' | 'dateTo'> & {
          dateFrom: string
          dateTo: string
        }
      >
        initialValues={{
          title: getEventData.title,
          type: getEventData.type,
          dateFrom: getEventData.date.from.toDate().toISOString().slice(0, -1), // get ISOString and remove the "Z" at the end. input date expect a ISO date without the "Z"
          dateTo: getEventData.date.to?.toDate().toISOString().slice(0, -1) ?? '',
          address: getEventData.address,
          city: getEventData.city,
          description: getEventData.description,
          weezeventUrl: getEventData.weezeventUrl,
          images: getEventData.images,
        }}
        onSubmit={async (values) => {
          await editEvent.mutateAsync({ form: EventFormZod.parse(values), event: getEventData })
          navigate('/events')
        }}
        validateOnMount
        validateOnChange
        validateOnBlur
        validationSchema={toFormikValidationSchema(EventFormZod)}
      >
        {({
          values,
          errors,
          setFieldValue,
          handleSubmit,
          handleBlur,
          handleChange,
          isValid,
          isSubmitting,
        }) => (
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

            <EventForm
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              errors={errors}
              setFieldValue={setFieldValue}
            />
          </form>
        )}
      </Formik>
    </Container>
  )
}

export default EditEventPage
