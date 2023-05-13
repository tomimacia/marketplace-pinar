import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { ProductPrice } from "../products/ProductPrice";
import { CartFooter } from "./CartFooter";
import { PlusMinusProduct } from "./PlusMinusProduct";

export const CartProducts = ({
  products,
  actions,
  cartList,
  quantityTotal,
}) => {
  return (
    <>
      {products.map((product, i) => {
        if (cartList.includes(product.id)) {
          let cantidad = cartList.reduce((acc, elem) => {
            return elem === product.id ? acc + 1 : acc;
          }, 0);

          return (
            <Flex
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transitionDuration={"0.2s"}
              transitionDelay={`${i * 0.2}s`}
              key={product.id}
              border="1px solid black"
              borderRadius="5px"
              p={1}
              mt={2}
            >
              <Flex w="100%" borderRadius="5px">
                <Flex
                  w={["80px", "120px", "160px", "160px"]}
                  minW={["80px", "120px", "160px", "160px"]}
                  h={["120px", "120px", "160px", "160px"]}
                  ml={["10px", "20px", "35px", "40px"]}
                  mr={["10px", "20px", "35px", "40px"]}
                >
                  <Link href={`/productPages/Productos/${product.id}`}>
                    <Image
                      cursor="pointer"
                      border={[
                        "none",
                        "1px solid #c7c7c7",
                        "1px solid #c7c7c7",
                        "1px solid #c7c7c7",
                      ]}
                      boxSize={["100px", "120px", "160px", "160px"]}
                      objectFit="cover"
                      borderRadius="5px"
                      src={product.Img}
                    />
                  </Link>
                </Flex>
                <Flex justify="space-between" flexDir="column" w="100%">
                  <Flex align="center">
                    <Flex>
                      <Link href={`/productPages/Productos/${product.id}`}>
                        <Heading
                          cursor="pointer"
                          fontSize={[12, 14, 18, 20]}
                          fontWeight="bold"
                        >
                          {product.Nombre}
                        </Heading>
                      </Link>
                    </Flex>
                  </Flex>
                  <Flex align="center">
                    <ProductPrice
                      fontSizeProp={[8, 10, 12, 15]}
                      precio={product.Precio}
                      descuento={product.Descuento}
                    />
                    <Text ml={5} fontSize={[10, 11, 12, 15]} fontWeight="bold">
                      Total: $
                      {product.Precio *
                        (product.Descuento ? 1 - product.Descuento * 0.01 : 1) *
                        cantidad}
                    </Text>
                  </Flex>
                  <PlusMinusProduct
                    cantidad={cantidad}
                    plusOne={() => actions.plusOne(product.id)}
                    minusOne={() => actions.minusOne(product.id)}
                    deleteAll={() => actions.deleteProduct(product.id)}
                  />
                </Flex>

                <Flex p={2} flexDir="column" justify="flex-end"></Flex>
              </Flex>
            </Flex>
          );
        }
      })}
      <CartFooter
        deleteCart={actions.deleteCart}
        total={quantityTotal(products)}
      />
    </>
  );
};
