import { Button, Flex, Text } from "@chakra-ui/react";

export const PlusMinusProduct = ({ cantidad, minusOne, plusOne,deleteAll }) => {
  return (
    <Flex>
      <Button color='blue.300' fontSize={[11, 12, 15, 18]} size={["xs", "xs", "sm", "sm"]} onClick={minusOne}>
        -
      </Button>
      <Text align="center" fontSize={[11, 12, 15, 18]}>
        {cantidad}
      </Text>
      <Button color='blue.300' size={["xs", "xs", "sm", "sm"]} onClick={plusOne}>
        +
      </Button>
      <Button size="xs" fontSize={[11, 12, 15, 18]} bg="transparent" color="blue.500" onClick={deleteAll}>
        Eliminar
      </Button>
    </Flex>
  );
};
