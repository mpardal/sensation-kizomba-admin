import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

function EventPageBreadcrumb({ children, ...rest }: PropsWithChildren<BreadcrumbProps>) {
  return (
    <Breadcrumb {...rest}>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/events">
          Événements
        </BreadcrumbLink>
      </BreadcrumbItem>
      {children}
    </Breadcrumb>
  )
}

export default EventPageBreadcrumb
