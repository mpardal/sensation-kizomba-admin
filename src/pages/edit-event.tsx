import {
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import EventPageBreadcrumb from '../components/events/event-page-breadcrumb'

function EditEventPage() {
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
        <EventPageBreadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/events/:id/edit">
              Modification (nom)
            </BreadcrumbLink>
          </BreadcrumbItem>
        </EventPageBreadcrumb>

        <HStack h={20} w="full">
          <Heading as="h2" size="lg">
            Événement (nom)
          </Heading>
          <HStack flexGrow={1} justifyContent="flex-end">
            <Button type="submit" size="sm" disabled>
              Enregistrer les changements
            </Button>
          </HStack>
        </HStack>
      </Flex>

      <div>L'édition n'est pas encore implémentée</div>
    </Container>
  )
}

export default EditEventPage
