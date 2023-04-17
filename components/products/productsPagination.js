import { Flex, Button, Text } from "@chakra-ui/react";

export const ProductsPagination = ({
  pagina,
  paginasTotales,
  handleAnterior,
  handleSiguiente,
}) => {
  return (
    <Flex w="100%">
      <Button
        isDisabled={pagina === 1}
        size="sm"
        m="auto"
        bg="blue.300"
        onClick={handleAnterior}
        w={['30%','25%','20%','20%']}
      >
        Anterior
      </Button>

      <Text m="auto" p={3} fontWeight="bold">
        {pagina} de {paginasTotales}
      </Text>
      <Button
        isDisabled={pagina === paginasTotales}
        size="sm"
        m="auto"
        bg="blue.300"
        onClick={handleSiguiente}
        w={['30%','25%','25%','20%']}
      >
        Siguiente
      </Button>
    </Flex>
  );
};
