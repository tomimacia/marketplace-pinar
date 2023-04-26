import React, { useEffect } from "react";
import { BusquedaGeneral } from "../../components/products/BusquedaGeneral";
import { FormatProduct } from "../../components/products/FormatProducts";
import { Box, Flex } from "@chakra-ui/react";
import { useReset } from "../../contexts/productsContext";

const busquedaProducts = () => {
  const reset = useReset()
  useEffect(()=>{
    reset()
  },[])
  return (
    <FormatProduct loader={false}>
      <Box
        mt={[2, 4, 7, 10]}
        minH="30vh"
        m={2}
        border="1px solid #a7a7a7"
        borderRadius="15px"
      >
        <Flex justify="center" flexDir="column" p={2} m={2}>
        <BusquedaGeneral />
        </Flex>
      </Box>
    </FormatProduct>
  );
};

export default busquedaProducts;
