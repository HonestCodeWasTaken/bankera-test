import * as React from 'react'

import { useColorMode, useColorModeValue, Text, Flex } from '@chakra-ui/react'

export const DarkModeSwitch: React.FC = () => {
  const { toggleColorMode } = useColorMode()
  return (
    <Flex
      _hover={{ cursor: 'pointer' }}
      onClick={toggleColorMode}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Text fontSize="30px">{useColorModeValue('☀️', '🌙')}</Text>
    </Flex>
  )
}
