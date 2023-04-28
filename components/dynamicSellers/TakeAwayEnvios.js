import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

export const TakeAwayEnvios = ({sellerRef}) => {
  return (
    <Flex p={3} mt={8} flexDir="column">
      <Heading
        fontSize={["15px", "20px", "20px", "25px"]}
        m="20px 0 20px 0"
        lineHeight="30px"
      >
        Take away y envíos
      </Heading>
      <Text lineHeight="25px" fontSize={["13px", "15px", "16px", "17px"]}>
        Nos encontramos en la localidad de{" "}
        <Text as="span" fontWeight="bold">
          {sellerRef.direccion.localidad}
        </Text>
        , ubicados en{" "}
        <Text as="span" fontWeight="bold">
          {sellerRef.direccion.direccion}
        </Text>
        . Con take away podes pasar a retirar tu pedido, o hacemos envios en un
        radio de{" "}
        <Text as="span" fontWeight="bold">
          'radio'km
        </Text>
        . Con tu compra mayor a
        <Text as="span" fontWeight="bold">
          'limite de compra'
        </Text>{" "}
        el envio es GRATIS!. En caso de ser un monto menor, el costo de envío es
        de{" "}
        <Text as="span" fontWeight="bold">
          'costo de envío'
        </Text>
        .
      </Text>
    </Flex>
  );
};
