import React from 'react'
import {
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  CloseButton,
  Spacer,
} from '@chakra-ui/react'
import { IExchangeData } from '../Interfaces/IBtcData'

interface Props {
  currency: IExchangeData
  removeCurrency: () => void
}

const CurrencyField = ({ currency, removeCurrency }: Props) => {
  function htmlDecode(input: string){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes[0].nodeValue;
  }

  return (
    <Flex>
      <Stat>
        <StatLabel>{`${currency.code} to BTC exchange`}</StatLabel>
        <StatNumber>{`${htmlDecode(currency.symbol)} ${currency.rate}`}</StatNumber>
      </Stat>
      <Spacer />
      <CloseButton onClick={removeCurrency} />
    </Flex>
  )
}

export default CurrencyField