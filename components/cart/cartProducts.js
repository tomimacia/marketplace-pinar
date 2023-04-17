import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { ProductPrice } from "../products/productPrice";
import { CartFooter } from "./cartFooter";

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
              <Flex w="100%" borderRadius="5px" bg="white">
                <Flex
                  w={["80px", "120px", "160px", "160px"]}
                  minW={["80px", "120px", "160px", "160px"]}
                  h={["120px", "120px", "160px", "160px"]}
                  ml={["10px", "20px", "35px", "40px"]}
                  mr={["10px", "20px", "35px", "40px"]}
                >
                  <Image
                    border={[
                      "none",
                      "1px solid black",
                      "1px solid black",
                      "1px solid black",
                    ]}
                    boxSize={["100px", "120px", "160px", "160px"]}
                    objectFit="cover"
                    borderRadius="5px"
                    src={product.Img}
                  />
                </Flex>
                <Flex flexGrow={1} flexDir="column">
                  <Flex align="center" flexGrow={7}>
                    <Flex flexGrow={2}>
                      <Text fontSize={17} fontWeight="bold">
                        {product.Nombre}
                      </Text>
                    </Flex>
                    <Flex flexGrow={1}>
                      <Button
                        bg="blue.300"
                        size={["xs", "sm", "md", "md"]}
                        onClick={() => actions.minusOne(product.id)}
                      >
                        -
                      </Button>
                      <Text
                        ml={3}
                        mr={3}
                        w="40px"
                        align="center"
                        border="1px solid black"
                        fontSize={22}
                      >
                        {cantidad}
                      </Text>
                      <Button
                        bg="blue.300"
                        size={["xs", "sm", "md", "md"]}
                        onClick={() => actions.plusOne(product.id)}
                      >
                        +
                      </Button>
                    </Flex>
                  </Flex>
                  <Flex align="flex-end">
                    <ProductPrice
                      precio={product.Precio}
                      descuento={product.Descuento}
                    />
                    <Text ml={5} fontWeight="bold">
                      Total: $
                      {product.Precio *
                        (product.Descuento ? 1 - product.Descuento * 0.01 : 1) *
                        cantidad}
                    </Text>
                  </Flex>
                </Flex>

                <Flex p={2} flexDir="column" justify="flex-end">
                  <Button
                    bg="blue.300"
                    size="xs"
                    onClick={() => actions.deleteProduct(product.id)}
                  >
                    Eliminar
                  </Button>
                </Flex>
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
