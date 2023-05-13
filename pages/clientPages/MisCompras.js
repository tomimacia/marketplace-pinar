import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { FormatClient } from "../../components/client/FormatClient";
const MisCompras = () => {
  return (
    <Box>
        <FormatClient title='Mis Compras'> 
        <Text mt={5}
          align="center"
          fontSize={[10, 20, 20, 20]}
          color={useColorModeValue("blackAlpha.500","whiteAlpha.500")}>No has realizado compras aun</Text>        
        </FormatClient>
    </Box>
  );
};

export default MisCompras;