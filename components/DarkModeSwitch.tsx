import { Box, IconButton, useColorMode, useColorModeValue, Text, Flex } from '@chakra-ui/react'
import * as React from 'react'

interface Props {
}
export const DarkModeSwitch: React.FC<Props> = (props) => {
  const { toggleColorMode } = useColorMode()
  const bg = useColorModeValue('white', '#333333')

  return (
    <Flex _hover={{cursor: "pointer"}} onClick={toggleColorMode} alignItems={"center"} justifyContent={'center'}>
        <Text fontSize='30px'>{useColorModeValue('☀️', '🌙')}</Text>
    </Flex>
  )
}