import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BeatLoader } from "react-spinners";
import FormatBlank from "../components/FormatBlank";
import { ProductPrice } from "../components/products/productPrice";
import { useCartListHandler } from "../items/customHooks/useCartListHandler";
import { useGetCartProducts } from "../items/customHooks/useGetCartProducts";

const Carrito = () => {
  const {
    cartList,
    deleteCart,
    deleteProduct,
    minusOneProduct,
    plusOneProduct,
    quantityTotal,
  } = useCartListHandler();
  const { loading, products, error } = useGetCartProducts(cartList);

  return (
    <FormatBlank size="lg" cartIndex={cartList.length} title="Carrito">
      <Flex minH="60vh">
        <Flex flexGrow={1}></Flex>
        <Flex
          flexGrow={10}
          border="2px solid black"
          flexDir="column"
          bg="gray.200"
          p={3}
          borderRadius="10px"
        >
          <Box p={[2, 3, 4, 5]} borderBottom="1px solid black">
            <Heading size={["md", "md", "xl", "xl"]}>Tus productos</Heading>
          </Box>          
          {cartList.length > 0 ? (
            loading ? (
              <Flex mt={10} justify="center">
                <BeatLoader color="#68EBBB" />
              </Flex>
            ) : (
              products.map((product, i) => {
                let cantidad = 0;
                if (cartList.includes(product.id)) {
                  cartList.reduce((acc, elem) => {
                    return (cantidad = elem === product.id ? acc + 1 : acc);
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
                                onClick={() => minusOneProduct(product.id)}
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
                                onClick={() => plusOneProduct(product.id)}
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
                                (product.Descuento
                                  ? 1 - product.Descuento * 0.01
                                  : 1) *
                                cantidad}
                            </Text>
                          </Flex>
                        </Flex>

                        <Flex p={2} flexDir="column" justify="flex-end">
                          <Button
                            bg="blue.300"
                            size="xs"
                            onClick={() => deleteProduct(product.id)}
                          >
                            Eliminar
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  );
                }
              })
            )
          ) : (
            <Flex flexDir="column" m="auto">
              <Text fontSize={[20, 30, 40, 40]} color="blackAlpha.600">
                Tu carrito esta vacio!
              </Text>
              <Text fontSize={[10, 20, 20, 20]} color="blackAlpha.500">
                Agrega productos al carrito para realizar tu compra.
              </Text>
            </Flex>
          )}
          {cartList.length > 0 && !loading && (
            <Flex flexDir="column">
              <Flex>
                <Text>Total {quantityTotal(products)}</Text>{" "}
              </Flex>
              <Button
                size="sm"
                w="90px"
                m="auto"
                mt={2}
                onClick={deleteCart}
                bg="blue.300"
              >
                Borrar carro
              </Button>
            </Flex>
          )}
        </Flex>
        <Flex flexGrow={1}></Flex>
      </Flex>
    </FormatBlank>
  );
};

export default Carrito;
