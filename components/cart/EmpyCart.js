import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export const EmptyCart = () => {
  return (
    <Flex flexDir="column" m="auto">
      <Text
        userSelect="none"
        fontSize={[20, 30, 40, 40]}
        color={useColorModeValue("blackAlpha.600", "whiteAlpha.600")}
      >
        Tu carrito esta vacio!
      </Text>
      <Text
        userSelect="none"
        fontSize={[10, 20, 20, 20]}
        color={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}
      >
        Agrega productos al carrito para realizar tu compra.
      </Text>
    </Flex>
  );
};
