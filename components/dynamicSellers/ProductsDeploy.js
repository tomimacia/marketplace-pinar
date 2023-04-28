import { Flex, Icon, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCartList } from "../../items/customHooks/useCartList";
import { ProductPrice } from "../products/ProductPrice";
import { motion } from "framer-motion";


export const ProductsDeploy = ({products}) => {
    const {cartList, actions} = useCartList()

  return (
    <Flex flexWrap="wrap" justify="space-around">
      {products.map((product, i) => {
        return (
          <Flex
            boxShadow="0 5px 5px"
            mb={10}
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transitionDuration={"0.5s"}
            transitionDelay={`${i * 0.1}s`}
            border="1px solid #c7c7c7"
            borderRadius="5px"
            w={["96%", "96%", "96%", "48%"]}
            p={1}
            key={product.id}
          >
            <Flex position="relative" w="100%" borderRadius="5px" >
              {/* Flex de la imagen */}
              <Flex
                w={["80px", "120px", "140px", "140px"]}
                minW={["80px", "120px", "140px", "140px"]}
                h={["120px", "120px", "140px", "140px"]}
                minH={["120px", "120px", "140px", "140px"]}
                maxH={["120px", "120px", "140px", "140px"]}
                ml={["10px", "20px", "20px", "10%"]}
                mr={["10px", "20px", "20px", "10%"]}
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
                    loading="lazy"
                    boxSize={["100px", "120px", "140px", "140px"]}
                    objectFit="cover"
                    borderRadius="5px"
                    m="auto"
                    bg="gray.300"
                    src={product.Img[0]}
                  />
                </Link>
              </Flex>
              {/* Flex nombre y precio */}
              <Flex
                maxH={["120px", "120px", "160px", "160px"]}
                h="100%"
                flexDir="column"
                placeContent="space-between"
              >
                {/* Flex del nombre */}
                <Flex h="50%">
                  <Link href={`/productPages/productos/${product.id}`}>
                    <Text
                      cursor="pointer"
                      fontSize={[12, 13, 14, 15]}
                      fontWeight="bold"
                      lineHeight="18px"
                      title={product.Nombre}
                      textOverflow="ellipsis"
                      overflow="hidden"
                    >
                      {product.Nombre}
                    </Text>
                  </Link>
                </Flex>
                {/* precio */}
                <ProductPrice
                  fontSizeProp={[12, 14, 15, 14]}
                  precio={product.Precio}
                  descuento={product.Descuento}
                />
              </Flex>

              <Flex position="absolute" right={0} bottom={0}>
                <Flex>
                  {cartList.includes(product.id) && (
                    <Text
                      fontSize={[12, 15, 18, 15]}
                      opacity="0.7"
                      fontWeight="bold"
                    >
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
                    fontSize={[20, 25, 28, 28]}
                    onClick={() => actions.plusOne(product.id)}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};
