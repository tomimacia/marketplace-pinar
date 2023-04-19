import { Button, Flex, Text } from "@chakra-ui/react";

export const ProductSideBarItem = ({ title, children, applyChanges }) => {
  return (
    <Flex
      borderRight="1px solid #A3A3A3"
      flexDir="column"
      w="100%"
      align="center"
      mt={5}
      mb={5}
    >
      <Flex bg="gray.300" pl="5%" align="center" width="100%">
        <Text fontSize="md" fontWeight="medium">
          {title}
        </Text>
      </Flex>
      <Flex
        borderBottom="1px solid #7D7D7D"
        pb="30px"
        pt="15px"
        pl="5%"
        width="100%"
        bg="White"
        flexDir="column"
      >
        {children}
        <Button
          onClick={applyChanges}
          mt={10}
          size="xs"
          bg="gray.300"
          w="50%"
          boxShadow="0 1px 5px"
        >
          Aplicar
        </Button>
      </Flex>
    </Flex>
  );
};
