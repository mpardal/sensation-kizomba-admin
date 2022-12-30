import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Fade,
  Flex,
  Heading,
  HStack,
  IconButton,
  LinkBox,
  LinkOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import DeleteEventAlertDialog from '../components/events/delete-event-alert-dialog'
import EventPageBreadcrumb from '../components/events/event-page-breadcrumb'
import { useDeleteEvent } from '../hooks/use-delete-event'
import { useDeleteEventAlertDialog } from '../hooks/use-delete-event-alert-dialog'
import { getEventsQueryKey, useGetEvents } from '../hooks/use-get-events'

function EventsPage() {
  const queryClient = useQueryClient()
  const eventQuery = useGetEvents()
  const deleteEvent = useDeleteEvent()
  const {
    state: deleteEventDialog,
    dispatchTryDelete,
    dispatchDelete,
    dispatchClose,
  } = useDeleteEventAlertDialog()

  return (
    <Container maxW="8xl">
      <Flex
        as="section"
        direction="column"
        alignItems="flex-start"
        bg="gray.700"
        borderRadius="2xl"
        px={6}
        py={2}
      >
        <EventPageBreadcrumb />

        <HStack h={20} w="full">
          <Heading as="h2" size="lg">
            Événements
          </Heading>
          <HStack flexGrow={1} justifyContent="flex-end">
            <Button
              aria-label="créer un événement"
              role="navigation"
              as={Link}
              to="/events/new"
              size="sm"
            >
              Nouveau
            </Button>
          </HStack>
        </HStack>
      </Flex>

      <Box as="section">
        {eventQuery.isLoading && (
          <Flex py={6} h="xs" alignItems="center" justifyContent="center">
            <Text fontSize="2xl">Chargement des événements...</Text>
          </Flex>
        )}

        {eventQuery.isError && <code>Error: {JSON.stringify(eventQuery.error, undefined, 2)}</code>}

        <Fade in={!eventQuery.isLoading}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th />
                  <Th>Nom</Th>
                  <Th>Début</Th>
                  <Th>Fin</Th>
                  <Th>Type</Th>
                </Tr>
              </Thead>
              <Tbody>
                {eventQuery.data &&
                  eventQuery.data.docs.map((event) => {
                    const data = event.data()

                    return (
                      <LinkBox
                        as={Tr}
                        key={event.id}
                        aria-label={data.title}
                        //transform="scale(1)" // Hack to make `<Tr>` position relative
                      >
                        <Td aria-label="actions sur les événements" textAlign="center">
                          <IconButton
                            aria-label="supprimer l'événement"
                            icon={<DeleteIcon />}
                            size="xs"
                            role="alertdialog"
                            colorScheme="red"
                            onClick={() => {
                              dispatchTryDelete(data.title, async () => {
                                await deleteEvent.mutateAsync(event.id)
                                await queryClient.invalidateQueries(getEventsQueryKey)
                              })
                            }}
                            pos="relative"
                            zIndex={1}
                          />
                          <LinkOverlay to={`/events/${event.id}/edit`} as={Link}>
                            <IconButton
                              size="xs"
                              as="span"
                              aria-label="éditer l'événement"
                              role="navigation"
                              icon={<EditIcon />}
                              colorScheme="gray"
                              bg="gray.600 "
                              ml={2}
                            />
                          </LinkOverlay>
                        </Td>
                        <Td aria-label="nom de l'événement">{data.title}</Td>
                        <Td aria-label="date de début de l'événement">
                          {dayjs(data.date.from.toDate()).format('DD/MM/YYYY HH:mm')}
                        </Td>
                        <Td aria-label="date de fin de l'événement">
                          {data.date.to
                            ? dayjs(data.date.to.toDate()).format('DD/MM/YYYY HH:mm')
                            : 'N/A'}
                        </Td>
                        <Td aria-label="type d'événement">{data.type}</Td>
                      </LinkBox>
                    )
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        </Fade>
      </Box>

      <DeleteEventAlertDialog
        title={deleteEventDialog.title ?? 'événement'}
        isOpen={deleteEventDialog.isOpen}
        onClose={dispatchClose}
        onConfirm={dispatchDelete}
        isLoading={deleteEvent.isLoading}
      />
    </Container>
  )
}

export default EventsPage
