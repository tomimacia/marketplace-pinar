import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

export const EmptyCart = () => {
  return (
    <Flex flexDir="column" m="auto">
      <Text fontSize={[20, 30, 40, 40]} color="blackAlpha.600">
        Tu carrito esta vacio!
      </Text>
      <Text fontSize={[10, 20, 20, 20]} color="blackAlpha.500">
        Agrega productos al carrito para realizar tu compra.
      </Text>
    </Flex>
  )
}

