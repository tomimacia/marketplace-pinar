import { Text, VStack } from "@chakra-ui/react";

const Footer = () => {  
  return (
    <VStack
      pos="absolute"
      placeContent='center'
      bottom={0}
      h="4rem"
      bg="gray.400"
      w="100%"
    >
      <Text fontSize={['9px','11px','13px','13px']} textAlign='center'>
        Las marcas y logos de marketplacepinar.com marketplacepinar.com/tv
        marketplacepinar.com/reviews son propiedad de MarketPlace Pinar SRL <br /> Todos los
        derechos reservados 2023
      </Text>
    </VStack>
  );
};

export default Footer;
