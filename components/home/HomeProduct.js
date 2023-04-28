import { Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { ProductPrice } from "../products/ProductPrice";

export const HomeProduct = ({ product, i }) => {
  return (
    <Flex
      boxShadow="0 5px 5px"      
      borderRadius="5px"
      w={["175px", "200px", "225px", "225px"]}
      h={["140px", "160px", "190px", "190px"]}
      key={product.id}
    >
      <Flex flexDir="column" w="100%" borderRadius="5px" bg="white">
        {/* Flex del nombre */}
        <Flex minH="25%" maxH="25%">
          <Link href={`/productPages/productos/${product.id}`}>
            <Text
              cursor="pointer"
              fontSize={[12, 13, 14, 14]}
              fontWeight="bold"
              lineHeight="18px"
              title={product.Nombre}
              textOverflow="ellipsis"
              overflow="hidden"
              m="auto"
            >
              {product.Nombre}
            </Text>
          </Link>
        </Flex>
        {/* Flex de Imagen y precio */}
        <Flex
          maxH="100px"
          h="100%"
          placeContent="space-around"
          align="center"
          m={3}
        >
          {/* Flex de la imagen */}
          <Flex
            w={["80px", "80px", "120px", "120px"]}
            minW={["80px", "80px", "120px", "120px"]}
            h={["120px", "120px", "120px", "120px"]}
            minH={["120px", "120px", "120px", "120px"]}
            maxH={["120px", "120px", "120px", "120px"]}
          >
            <Link href={`/productPages/productos/${product.id}`}>
              <Image
                cursor="pointer"
                border={[
                  "none",
                  "1px solid #c7c7c7",
                  "1px solid #c7c7c7",
                  "1px solid #c7c7c7",
                ]}
                boxSize={["100px", "100px", "120px", "120px"]}
                objectFit="cover"
                borderRadius="5px"
                bg="white"
                src={product.Img[0]}
              />
            </Link>
          </Flex>
          {/* precio */}
          <ProductPrice
            fontSizeProp={[11, 12, 13, 14]}
            precio={product.Precio}
            descuento={product.Descuento}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
