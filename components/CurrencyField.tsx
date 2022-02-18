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
  numberInput: string
}

const CurrencyField = ({ numberInput, currency, removeCurrency }: Props) => {
  const calculateCurrency = (rate_float: number, currencyCode: string) => {
    if (numberInput !== '') {
      const num = parseFloat(numberInput) * rate_float
      return new Intl.NumberFormat(`en-US`, {
        currency: currencyCode,
        style: 'currency',
      }).format(num)
    }

    return new Intl.NumberFormat(`en-US`, {
      currency: currencyCode,
      style: 'currency',
    }).format(0)
  }
  return (
    <Flex>
      <Stat>
        <StatLabel>{`${currency.code} to BTC exchange`}</StatLabel>
        <StatNumber>{`${calculateCurrency(
          currency.rate_float,
          currency.code
        )}`}</StatNumber>
      </Stat>
      <Spacer />
      <CloseButton onClick={removeCurrency} />
    </Flex>
  )
}

export default CurrencyField
