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
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import FormatBlank from "../../../components/FormatBlank";
import { DynamicProductImages } from "../../../components/dynamicProducts/DynamicProductImages";
import { Stats } from "../../../components/dynamicProducts/Stats";
import { ProductPrice } from "../../../components/products/ProductPrice";
import { getSingleDoc } from "../../../firebase/services/getSingleDoc";
import { useCartList } from "../../../items/customHooks/useCartList";
import { useHandleFav } from "../../../items/customHooks/useHandleFav";

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
  const { favoriteList,  favLoading, handleFavorito } =
    useHandleFav();
  const { actions } = useCartList();

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
              href={`/productPages/productInterface?categoria=${prodRef.Categoria}`}
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
              href={`/productPages/productInterface?categoria=${prodRef.Categoria}&SubCat1=${prodRef.SubCat1}`}
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
                {`>${prodRef.Marca}`}
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
                  precio={prodRef.Precio}
                  descuento={prodRef.Descuento}
                />

                {!paraConsulta(prodRef.Categoria) ? (
                  <Flex
                    alignItems="center"
                    w="100%"
                    m="0 auto"
                    size={["sm", "sm", "md", "md"]}
                    flexDir="column"
                  >
                    <Button maxW="300px" w="100%" bg="blue.300">
                      Comprar
                    </Button>
                    <Button
                      maxW="300px"
                      onClick={() => actions.plusOne(prodRef.id)}
                      w="100%"
                      size={["sm", "sm", "ndd", "md"]}
                      bg="blue.300"
                      mt={5}
                    >
                      Agregar al carrito
                    </Button>
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
