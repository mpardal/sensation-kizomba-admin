import { HamburgerIcon } from '@chakra-ui/icons'
import { Badge, Box, Button, Flex, Heading, HStack, IconButton } from '@chakra-ui/react'

function Nav() {
  return (
    <Box as="header" w="full" h="4.5rem" position="sticky" top={0} bg="chakra-body-bg" zIndex={10}>
      <HStack spacing={6} maxW="8xl" mx="auto" w="full" h="full">
        <Box display={[null, null, null, 'none']} pl={6}>
          <IconButton
            icon={<HamburgerIcon />}
            aria-label="ouvrir la navigation"
            colorScheme="gray"
          />
        </Box>
        <Flex justifyContent="space-between" w="full" pr={6} as="section">
          <Heading as="h1" size="lg" className="font-cagliostro" color="orange.200">
            Sensation Kizomba
          </Heading>
          <HStack spacing={6} as="section">
            <Badge>Connecté en tant que Admin</Badge>
            <Button color="white" variant="outline" size="sm">
              Se déconnecter
            </Button>
          </HStack>
        </Flex>
      </HStack>
    </Box>
  )
}

export default Nav
