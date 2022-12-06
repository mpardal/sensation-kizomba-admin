import { EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
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
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import EventPageBreadcrumb from '../components/events/event-page-breadcrumb'
import { useGetEvents } from '../hooks/use-get-events'

function EventsPage() {
  const eventQuery = useGetEvents()

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
        {eventQuery.isLoading && <span>Chargement des événements...</span>}

        {eventQuery.isError && <code>Error: {JSON.stringify(eventQuery.error, undefined, 2)}</code>}

        {eventQuery.isSuccess && (
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
                {eventQuery.data.docs.map((event) => {
                  const data = event.data()

                  return (
                    <LinkBox
                      as={Tr}
                      key={event.id}
                      aria-label={data.title}
                      //transform="scale(1)" // Hack to make `<Tr>` position relative
                    >
                      <Td aria-label="actions sur les événements" textAlign="center">
                        <LinkOverlay to={`/events/${event.id}/edit`} as={Link}>
                          <IconButton
                            size="xs"
                            as="span"
                            aria-label="éditer l'événement"
                            role="navigation"
                            icon={<EditIcon />}
                            colorScheme="gray"
                            bg="gray.600 "
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
        )}
      </Box>
    </Container>
  )
}

export default EventsPage
