import type { NextPage } from 'next'
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Flex,
  Spinner,
  Button,
  HStack,
  Heading,
  Spacer,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ApiCalls from '../Utils/ApiCalls'
import { IBtcData, ICurrency, IExchangeData } from '../Interfaces/IBtcData'
import CurrencyField from '../components/CurrencyField'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from '@chakra-ui/react'

const Home: NextPage = () => {
  const [disclaimer, setDisclaimer] = useState<string>('')
  const [numberInput, setNumberInput] = useState<string>('1')
  const [currentFields, setCurrentFields] = useState<Array<IExchangeData>>([])
  const [currentInitFields, setCurrentInitFields] = useState<Array<IExchangeData>>([])
  const MINUTE_MS = 60000;
  const dataFetch = async () => {
    const data: IBtcData = await ApiCalls.fetchUrl('https://api.coindesk.com/v1/bpi/currentprice.json')
    let fields: Array<IExchangeData> = Object.values(data.bpi)
    console.log(fields[1].rate_float)
    setCurrentInitFields(fields)
    // if (currentFields) {
      setCurrentFields(prevValue => fields.filter(x => prevValue.some(y => y.code === x.code)))
      //? if you need to set state based on the previous value of the state,
      //? you should use the callback version to make sure you're working with the correct previous state
      // let value = fields.filter(x => currentFields.some(y => y.code === x.code))
      // console.log(value[0].rate_float)
      // setCurrentFields(value)
    // }
  }
  const removeField = (i: number) => {
    if (currentFields) {
      let fieldsCopy = currentFields
      fieldsCopy = fieldsCopy.filter((x, index) => index !== i)
      setCurrentFields(fieldsCopy)
    }
  }
  const onSelectChange = (code: string | string[]) => {
    if (currentInitFields !== undefined) {
      const newArray: Array<IExchangeData> = currentInitFields.filter(x => code.includes(x.code))
      console.log(newArray)
      setCurrentFields(newArray)
    }
  }
  const dataFetchInit = async () => {
    const data: IBtcData = await ApiCalls.fetchUrl('https://api.coindesk.com/v1/bpi/currentprice.json')
    setDisclaimer(data.disclaimer)
    const values = Object.values(data.bpi)
    setCurrentFields(values)
    setCurrentInitFields(values)
  }
  useEffect(() => {
    dataFetchInit()
  }, [])

  
  useEffect(() => {
    // dataFetchInit()
    const interval = setInterval(() => {
      dataFetch()
    }, MINUTE_MS);
    return () => {
      console.log('component unmounted')
      clearInterval(interval)
     } // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])


  return (
    <>
    
    <Flex flexDir="column" minHeight="100vh" alignItems='center' justifyContent="center">
      <Flex px={3} flexDir="column" maxW='400px' maxH='400px'>
        <FormControl py={3}>
          <FormLabel >Bitcoin converter</FormLabel>
          <Input value={numberInput} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNumberInput(event.target.value)} defaultValue={1} type='number' />
          <FormHelperText>{disclaimer}</FormHelperText>
        </FormControl>
        <HStack py={2}>
          <Heading py={2} as='h5' fontSize='22px'>Currency exchange rates</Heading>
          <Spacer />
          {currentFields && currentInitFields && currentFields.length !== currentInitFields.length ? <Menu closeOnSelect={false}>
            <MenuButton textAlign='center' maxW='120px' my={3} as={Button} colorScheme='blue'>
              Currencies
            </MenuButton>
            <MenuList minWidth='240px'>
              <MenuOptionGroup onChange={(code) => onSelectChange(code)} value={currentFields.map(x => x.code)} title='Select Currency' type='checkbox'>
                {currentInitFields.map((currency, index) => (
                  <MenuItemOption key={index} value={currency.code}>{currency.code}</MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu> : null}
        </HStack>
        {currentFields ? <Flex flexDir="column">
          {currentFields.map((currency, index) => (
            <CurrencyField key={index} currency={currency} removeCurrency={() => removeField(index)} numberInput={numberInput}></CurrencyField>
          ))}
        </Flex> : <Spinner />}
      </Flex>
    </Flex >
    </>
  )
}

export default Home
