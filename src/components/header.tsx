import { Box, Button, Flex, Heading, HStack } from '@chakra-ui/react'

function Header() {
  return (
    <Box as="header" w="full" h="4.5rem" pos="sticky" top={0} bg="chakra-body-bg" zIndex={10}>
      <HStack spacing={6} maxW="8xl" mx="auto" w="full" h="full" px={6}>
        <Flex justifyContent="space-between" w="full" pr={6} as="section">
          <Heading as="h1" size="lg" className="font-cagliostro" color="orange.200">
            Sensation Kizomba
          </Heading>
          <Button color="white" variant="outline" size="sm">
            Se déconnecter
          </Button>
        </Flex>
      </HStack>
    </Box>
  )
}

export default Header
