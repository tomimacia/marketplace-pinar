import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

export const CartFooter = ({deleteCart,total}) => {
  return (
    <Flex flexDir="column">
      <Flex justify='flex-end' p={5}>
        <Text fontWeight='bold' fontSize='lg'>Total: ${total}</Text>
      </Flex>
      <Button
        size="sm"
        w="90px"
        m="auto"
        mt={2}
        onClick={deleteCart}
        bg="blue.300"
      >
        Borrar carro
      </Button>
    </Flex>
  );
};
