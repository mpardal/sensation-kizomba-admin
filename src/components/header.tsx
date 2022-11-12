import { HamburgerIcon } from '@chakra-ui/icons'
import { Badge, Box, Button, Flex, Heading, HStack, IconButton } from '@chakra-ui/react'

function Nav() {
  return <HStack spacing={6} as="header" maxW="8xl" mx="auto" h="4.5rem" w="full" position="sticky" top={0} bg="chakra-body-bg" zIndex={10}>
    <Box display={[null, null, null, 'none']} pl={6}>
      <IconButton icon={<HamburgerIcon />} aria-label="ouvrir la navigation" colorScheme="gray" />
    </Box>
    <Flex justifyContent="space-between" w="full" pr={6}>
      <Heading as="h1" size="lg" className="font-cagliostro" color="orange.200">Sensation Kizomba</Heading>
      <HStack spacing={6}>
        <Badge>Connecté en tant que Admin</Badge>
        <Button color="white" variant="outline" size="sm">Se déconnecter</Button>
      </HStack>
    </Flex>
  </HStack>
}

export default Nav
