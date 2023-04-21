import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import FormatBlank from "../../../components/FormatBlank";
import { firestore } from "../../../firebase/clientApp";
import { useCartList } from "../../../items/customHooks/useCartList";
import { useHandleFav } from "../../../items/customHooks/useHandleFav";
import { Stats } from "../../../components/dynamicProducts/stats";

export async function getServerSideProps({ params }) {
  const resp = await getDoc(doc(firestore, "Productos", params.productID));
  const producto = resp.data();
  return {
    props: {
      prodRef: { ...producto, id: params.productID },
    },
  };
}

export default function ProductsDynamic({ prodRef }) {
  const [mainImg, setMainImg] = useState(0);
  const [tempImg, setTempImg] = useState(0);
  const [imgDisplay, setImgDisplay] = useState(true);
  const { favoriteList, selectedProd, favLoading, handleFavorito } =
    useHandleFav();
  const { cartList, actions, quantityTotal } = useCartList();

  // Especial inmuebles vehiculos
  const paraConsulta = (param) => {
    return param === "Inmuebles" || param === "Vehiculos";
  };
  const handleMouseOver = (img) => {
    setTempImg(img);
    setImgDisplay(false);
  };

  return (
    <Box>
      <FormatBlank
        hiddenTitle={prodRef.Nombre}
        cartIndex={cartList.length}
        size="md"
        title={
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
          pr={[0, 0, 2, 2]}
          pl={[0, 0, 2, 2]}
          borderLeft="1px solid #c7c7c7"
          borderRight="1px solid #c7c7c7"
          m="0 auto"
          flexDir="column"
          maxW="1200px"
        >
          <Flex>
            <Flex flexDir={["column", "column", "row", "row"]}>
              <Flex flexDir={["row", "row", "column", "column"]}>
                {prodRef.Img.map((img, i) => {
                  return (
                    <Flex
                      key={i}
                      onClick={() => setMainImg(i)}
                      onMouseOver={() => handleMouseOver(i)}
                      onMouseOut={() => setImgDisplay(true)}
                      cursor="pointer"
                      justifyContent="center"
                      h="50px"
                      w="50px"
                      _hover={{ border: "2px solid blue" }}
                    >
                      <Image
                        objectFit="cover"
                        mb={1}
                        minH="50px"
                        w="40px"
                        minW="40px"
                        h="50px"
                        src={img}
                      />

                      <Flex
                        w="3px"
                        ml={1}
                        minW="3px"
                        minH="50px"
                        borderRadius={5}
                        bg={i === mainImg ? "blue.500" : "none"}
                      ></Flex>
                    </Flex>
                  );
                })}
              </Flex>
              <Flex bg="gray.200" mr={5} justify="center">
                <Image
                  pr={1}
                  pl={2}
                  objectFit="cover"
                  minH="400px"
                  h="400px"
                  src={prodRef.Img[imgDisplay ? mainImg : tempImg]}
                />
              </Flex>
            </Flex>
            <Flex
              p={[0,0,2,3]}
              w={["30%","40%","50%",'70%']}
              justifyContent="space-between"
              minH="400px"              
              flexDir="column"
              borderLeft="1px solid #c7c7c7"
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
                <Flex justify="center" w="100%">
                  <Flex borderBottom="1px solid #c7c7c7" w="100%" maxW="300px">
                    <Text fontSize="30px">$ {prodRef.Precio}</Text>
                  </Flex>
                </Flex>

                {!paraConsulta(prodRef.Categoria) ? (
                  <Flex
                    alignItems="center"
                    w="100%"
                    m="0 auto"
                    size={["sm","sm","md","md"]}
                    flexDir="column"
                  >
                    <Button maxW="300px" w="100%" bg="blue.300">
                      Comprar
                    </Button>
                    <Button
                      maxW="300px"
                      onClick={() => actions.plusOne(prodRef.id)}
                      w="100%"
                      size={["sm","sm","ndd","md"]}
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
                <Text>{prodRef.Descripcion}</Text>
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
