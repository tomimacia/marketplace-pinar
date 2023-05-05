import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import FormatBlank from "../../../components/FormatBlank";
import { DynamicProductImages } from "../../../components/dynamicProducts/DynamicProductImages";
import { Stats } from "../../../components/dynamicProducts/Stats";
import { ProductPrice } from "../../../components/products/ProductPrice";
import { getSingleDoc } from "../../../firebase/services/getSingleDoc";
import { useCartList } from "../../../items/customHooks/cartHooks/useCartList";
import { useHandleFav } from "../../../items/customHooks/favoritesHooks/useHandleFav";

export async function getServerSideProps({ params }) {
  const resp = await getSingleDoc("Productos", params.productID);
  const producto = resp.data();
  return {
    props: {
      prodRef: { ...producto, id: params.productID },
    },
  };
}

export default function ProductsDynamic({ prodRef }) {
  const { favoriteList, favLoading, handleFavorito } = useHandleFav();
  const { cartList, actions } = useCartList();

  // Especial inmuebles vehiculos
  const paraConsulta = (param) => {
    return param === "Inmuebles" || param === "Vehiculos";
  };

  return (
    <Box>
      <FormatBlank
        headTitle={prodRef.Nombre}
        pageTitle={
          <Flex>
            <Link
              href={`/productPages/productInterface?Category=${prodRef.Categoria}`}
            >
              <Text
                textDecoration="underline"
                cursor="pointer"
                _hover={{ color: "blue" }}
              >
                {prodRef.Categoria}
              </Text>
            </Link>
            <Text ml={2} mr={2}>
              {">"}
            </Text>
            <Link
              href={`/productPages/productInterface?Category=${prodRef.Categoria}&SubCat1=${prodRef.SubCat1}`}
            >
              <Text
                textDecoration="underline"
                cursor="pointer"
                _hover={{ color: "blue" }}
              >
                {prodRef.SubCat1}
              </Text>
            </Link>
            {prodRef.Marca && (
              <Text ml={2} mr={2}>
                {`> ${prodRef.Marca}`}
              </Text>
            )}
          </Flex>
        }
      >
        <Flex
          borderLeft="1px solid #c7c7c7"
          borderRight="1px solid #c7c7c7"
          m="0 auto"
          flexDir="column"
          maxW="1200px"
        >
          <Flex flexDir={["column", "column", "row", "row"]}>
            <DynamicProductImages images={prodRef.Img} />
            <Flex
              p={[0, 5, 2, 3]}
              justifyContent="space-between"
              flexDir="column"
            >
              <Flex justify="space-between">
                <Heading
                  w="100%"
                  textOverflow="hidden"
                  as={motion.h3}
                  size={["sm", "md", "md", "lg"]}
                  fontFamily="arial"
                >
                  {prodRef.Nombre}
                </Heading>
                {!favLoading ? (
                  <Icon
                    as={
                      favoriteList.includes(prodRef.id)
                        ? AiFillHeart
                        : AiOutlineHeart
                    }
                    w="10%"
                    cursor="pointer"
                    _hover={{ opacity: "0.4" }}
                    color="blue.800"
                    fontSize={30}
                    onClick={() => handleFavorito(prodRef.id)}
                  />
                ) : (
                  <Spinner />
                )}
              </Flex>
              <Flex w="80%" h="60%" justify="space-between" flexDir="column">
                <ProductPrice
                  fontSizeProp={[15, 16, 19, 20]}
                  precio={prodRef.Precio}
                  descuento={prodRef.Descuento}
                />

                {!paraConsulta(prodRef.Categoria) ? (
                  <Flex
                    align="center"
                    w="100%"
                    m={5}
                    size={["sm", "sm", "md", "md"]}
                    flexDir="row"
                    justify="space-around"
                  >
                    <Button
                      maxW="300px"
                      borderRadius="15px"
                      _hover={{ bg: "blue.300" }}
                      border="1px solid gray"
                      onClick={() => actions.plusOne(prodRef.id)}
                      w="70%"
                      size={["sm", "sm", "ndd", "md"]}
                      bg="blue.500"
                    >
                      Sumar al carrito
                    </Button>
                    {cartList.includes(prodRef.id) && (
                      <Link href="/cart">
                        <Flex position="relative">
                          <Icon
                            as={AiOutlineShoppingCart}
                            cursor="pointer"
                            _hover={{ color: "blackAlpha.400" }}
                            fontSize={34}
                            top="10px"
                            right="4px"
                            bg="whiteAlpha.400"
                            borderRadius="50px"
                          />

                          <Box
                            w={4}
                            h={5}
                            left={4}
                            cursor="pointer"
                            pos="absolute"
                            lineHeight="18px"
                            textAlign="center"
                            bg="green.500"
                            borderRadius="50%"
                            fontWeight="Bold"
                            fontSize={15}
                            zIndex={10}
                          >
                            <Text>
                              {cartList.reduce((acc, prod) => {
                                return prod === prodRef.id ? acc + 1 : acc;
                              }, 0)}
                            </Text>
                          </Box>
                        </Flex>
                      </Link>
                    )}
                  </Flex>
                ) : (
                  <Flex w="100%" m="0 auto" flexDir="column">
                    <Button bg="blue.300" mt={5}>
                      Consultar
                    </Button>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Flex>
          <Flex mt={3} flexDir="column">
            <Flex p={4} flexDir="column" borderTop="1px solid #c7c7c7">
              <Flex align="center">
                <Icon as={MdVerified} />
                <Link href={`/productPages/vendedores/${prodRef.UserID}`}>
                  <Text
                    cursor="pointer"
                    _hover={{ textDecoration: "underline", color: "blue" }}
                  >
                    {prodRef.Vendedor}
                  </Text>
                </Link>
              </Flex>
              <Heading size="lg">Descripcion</Heading>
              <Flex mt={3} borderRadius="5px" minH="100px" p={2}>
                <Text fontSize={["sm", "sm", "md", "md"]}>
                  {prodRef.Descripcion}
                </Text>
              </Flex>
              {prodRef.Caracteristicas && (
                <Stats stats={prodRef.Caracteristicas} />
              )}
              {prodRef.Otros && <Stats stats={prodRef.Otros} isOtros />}
            </Flex>
          </Flex>
        </Flex>
      </FormatBlank>
    </Box>
  );
}
