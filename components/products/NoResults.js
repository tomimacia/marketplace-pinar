import { Flex, Text } from "@chakra-ui/react";


export const NoResults = () => {
  return (
    <Flex>
      <Text userSelect='none' fontSize={[15, 20, 25, 25]} color="blackAlpha.600">
        No se encontraron resultados
      </Text>
    </Flex>
  );
};
