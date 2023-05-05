import { Flex, Button, Text } from "@chakra-ui/react";

export const Pagination = ({
  pagina,
  paginasTotales,
  handleAnterior,
  handleSiguiente,
  condition
}) => {
  if(paginasTotales > 1 && condition)
  return (
    <Flex p={[0,1,2,3]} w="100%">
      <Button
        isDisabled={pagina === 1}
        size="sm"
        _focus={{bg:"transparent"}}
        bg="transparent"
        m="auto"
        _hover={pagina > 1 && {color:"blue.500"}}
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
        _focus={{bg:"transparent"}}
        bg="transparent"
        size="sm"
        m="auto"
        _hover={pagina < paginasTotales && {color:"blue.500"}}        
        onClick={handleSiguiente}
        w={['30%','25%','25%','20%']}
      >
        Siguiente
      </Button>
    </Flex>
  );
};
