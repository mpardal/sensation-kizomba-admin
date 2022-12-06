import {
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import EventForm from '../components/events/event-form'
import EventPageBreadcrumb from '../components/events/event-page-breadcrumb'
import { useCreateEvent } from '../hooks/use-create-event'
import { EventFormZod, EventFormZodValues } from '../utils/form/event-form-zod'
import { toFormikValidationSchema } from '../utils/zod-formik-adapter'

function NewEventPage() {
  const createEvent = useCreateEvent()
  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    isValid,
    isSubmitting,
    setFieldValue,
    errors,
  } = useFormik<
    Omit<EventFormZodValues, 'dateFrom' | 'dateTo'> & { dateFrom: string; dateTo: string }
  >({
    initialValues: {
      title: '',
      teacher: '',
      type: 'once',
      dateFrom: '',
      dateTo: '',
      address: '',
      city: '',
      description: '',
      weezeventUrl: '',
    },
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: toFormikValidationSchema(EventFormZod),
    onSubmit: async (values) => {
      await createEvent.mutateAsync(EventFormZod.parse(values))
    },
  })

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
              <BreadcrumbLink as={Link} to="/events/new">
                Nouveau
              </BreadcrumbLink>
            </BreadcrumbItem>
          </EventPageBreadcrumb>

          <HStack h={20} w="full">
            <Heading as="h2" size="lg">
              Nouveau événement
            </Heading>
            <HStack flexGrow={1} justifyContent="flex-end">
              <Button
                type="submit"
                size="sm"
                disabled={!isValid || isSubmitting}
                isLoading={isSubmitting}
              >
                Enregistrer
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
    </Container>
  )
}

export default NewEventPage
