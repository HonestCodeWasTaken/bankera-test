import type { NextPage } from 'next'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Center,
  Input,
  Flex,
  Stack,
  Skeleton,
  Spinner,
  Button,
  HStack,
  Heading,
  Spacer,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ApiCalls from '../Utils/ApiCalls'
import { IBtcData, IExchangeData } from '../Interfaces/IBtcData'
import CurrencyField from '../components/CurrencyField'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'

const Home: NextPage = () => {
  const [currentBtcData, setCurrentBtcData] = useState<IBtcData>()
  const [currentFields, setCurrentFields] = useState<Array<IExchangeData>>()
  const [currentInitFields, setCurrentInitFields] = useState<Array<IExchangeData>>()
  const MINUTE_MS = 60000;
  const dataFetch = async () => {
    const data: IBtcData = await ApiCalls.fetchUrl('https://api.coindesk.com/v1/bpi/currentprice.json')
    setCurrentBtcData(data)
  }
  const removeField = (i: number) => {
    if (currentFields) {
      let fieldsCopy = currentFields
      fieldsCopy = fieldsCopy.filter((x, index) => index !== i)
      setCurrentFields(fieldsCopy)
    }
  }
  const addField = (i: number) => {
    if (currentFields) {
      let currencyToPush = currentFields[i]
      let pushedFields = currentFields
      pushedFields.push(currencyToPush)
      setCurrentFields(pushedFields)
    }
  }
  useEffect(() => {
    const dataFetchInit = async () => {
      const data: IBtcData = await ApiCalls.fetchUrl('https://api.coindesk.com/v1/bpi/currentprice.json')
      setCurrentBtcData(data)
      setCurrentFields(Object.values(data.bpi))
      setCurrentInitFields(Object.values(data.bpi))
    }
    dataFetchInit()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      dataFetch()
    }, MINUTE_MS);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])


  return (
    <Flex flexDir="column" minHeight="100vh" alignItems='center' justifyContent="center">
      <Flex flexDir="column" maxW='400px' maxH='400px'>
        <FormControl py={3}>
          <FormLabel >Bitcoin converter</FormLabel>
          <Input id='email' type='number' />
          <FormHelperText>{currentBtcData?.disclaimer}</FormHelperText>
        </FormControl>
        <HStack py={2}>
          <Heading py={2} as='h5' fontSize='22px'>Currency exchange rates</Heading>
          <Spacer/>
        {currentFields && currentInitFields && currentFields.length !== currentInitFields.length ? <Menu closeOnSelect={false}>
          <MenuButton textAlign='center'  maxW='120px' my={3} as={Button} colorScheme='blue'>
            Currencies
          </MenuButton>
          <MenuList minWidth='240px'>
            <MenuOptionGroup onChange={} value={currentFields.map(x => x.code)} title='Select Currency' type='checkbox'>
            {currentInitFields.map((currency, index) => (
            <MenuItemOption  onClick={() => addField(index)} key={index} value={currency.code}>{currency.code}</MenuItemOption>
          ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu> : null}
        </HStack>
        {currentFields ? <Flex flexDir="column">
          {currentFields.map((currency, index) => (
            <CurrencyField key={index} currency={currency} removeCurrency={() => removeField(index)}></CurrencyField>
          ))}
        </Flex> : <Spinner />}
      </Flex>
    </Flex >
  )
}

export default Home
