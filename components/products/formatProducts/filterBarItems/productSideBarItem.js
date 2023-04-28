import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";

export const ProductSideBarItem = ({ title, children, applyChanges }) => {
  
  return (
    <Flex
      
      flexDir="column"
      w="100%"
      align="center"
      mt={5}      
    >
      <Flex borderRadius='6' p={2} bg="blue.500" pl="5%" align="center" width="100%">
        <Text fontSize="lg" fontWeight="medium">
          {title}
        </Text>
      </Flex>
      <Flex        
        pb="30px"
        pt="15px"
        pl="5%"
        width="100%"
        bg={useColorModeValue("white","gray.500")}
        flexDir="column"
      >
        {children}
        <Button
          onClick={applyChanges}
          mt={10}
          size="xs"
          bg="gray.300"
          w="50%"
          color='black'
          boxShadow="0 1px 5px"
        >
          Aplicar
        </Button>
      </Flex>
    </Flex>
  );
};
