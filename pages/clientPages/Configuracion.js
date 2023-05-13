import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { FormatClient } from "../../components/client/FormatClient";

const Configuracion = () => {
  return (
    <Box>
        <FormatClient title='Configuracion'> 
        <Text mt={5}
          align="center"
          fontSize={[10, 20, 20, 20]}
          color={useColorModeValue("blackAlpha.500","whiteAlpha.500")}>Currently unavailable</Text>
        </FormatClient>
    </Box>
  );
};

export default Configuracion;
