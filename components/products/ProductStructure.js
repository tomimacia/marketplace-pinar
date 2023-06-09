import { Flex, Icon, Image, Text, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { ProductPrice } from "./ProductPrice";

export const ProductStructure = ({
  i,
  page,
  product,
  favoriteList,
  cartList,
  onClickCarrito,
  onClickFavorito,
  isSpinner,
}) => {
  return (
    <Flex
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transitionDuration={"0.5s"}
      transitionDelay={`${(i - (page * 10 - 10)) * 0.1}s`}
      border="1px solid #a7a7a7"
      borderRadius="5px"
      p={1}
      mt={2}
    >
      <Flex position="relative" w="100%" borderRadius="5px">
        <Flex
          w={["80px", "120px", "160px", "160px"]}
          minW={["80px", "120px", "160px", "160px"]}
          h={["120px", "120px", "160px", "160px"]}
          ml={["10px", "20px", "35px", "40px"]}
          mr={["10px", "20px", "35px", "40px"]}
        >
          <Link href={`/productPages/productos/${product.id}`}>
            <Image
              cursor="pointer"
              border={[
                "none",
                "1px solid #a7a7a7",
                "1px solid #a7a7a7",
                "1px solid #a7a7a7",
              ]}
              loading="lazy"
              boxSize={["100px", "120px", "160px", "160px"]}
              objectFit="cover"
              borderRadius="5px"
              m="auto"
              bg="gray.300"
              src={product.Img[0]}
            />
          </Link>
        </Flex>
        <Flex
          maxH={["120px", "120px", "160px", "160px"]}
          h="100%"
          flexDir="column"
          placeContent="space-between"
          flexGrow={1}
        >
          <Flex maxH="50%" flexGrow>
            <Link href={`/productPages/productos/${product.id}`}>
              <Text
                textOverflow="ellipsis"
                overflow="hidden"                        
                cursor="pointer"
                fontSize={[12, 14, 17, 17]}
                fontWeight="bold"
              >
                {product.Nombre}
              </Text>
            </Link>
          </Flex>
          <ProductPrice precio={product.Precio} descuento={product.Descuento} />
        </Flex>

        <Flex flexDir="column" align="flex-end" justifyContent="space-between">
          {!isSpinner && favoriteList ? (
            <Icon
              as={
                favoriteList.includes(product.id) ? AiFillHeart : AiOutlineHeart
              }
              cursor="pointer"
              _hover={{ opacity: "0.4" }}
              color="blue.800"
              justify="right"
              fontSize={[20, 25, 30, 30]}
              onClick={onClickFavorito}
            />
          ) : (
            <Spinner color="blue.500" />
          )}
          <Flex bottom={0} right={0} position="absolute">
            {cartList.includes(product.id) && (
              <Text fontSize={[12, 15, 18, 18]} opacity="0.7" fontWeight="bold">
                (
                {cartList.reduce((acc, prod) => {
                  return prod === product.id ? acc + 1 : acc;
                }, 0)}
                )
              </Text>
            )}
            <Icon
              as={AiOutlineShoppingCart}
              cursor="pointer"
              _hover={
                !cartList.includes(product.id)
                  ? { opacity: "1" }
                  : { opacity: "0.7" }
              }
              opacity={cartList.includes(product.id) ? "1" : "0.3"}
              color="blue"
              fontSize={[20, 25, 30, 30]}
              onClick={onClickCarrito}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
