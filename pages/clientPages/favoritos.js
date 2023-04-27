import { Flex, Icon, Image, Spinner, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { FormatClient } from "../../components/client/FormatClient";
import { Pagination } from "../../components/products/Pagination";
import { ProductPrice } from "../../components/products/ProductPrice";
import { getSingleDoc } from "../../firebase/services/getSingleDoc";
import { useHandlePagination } from "../../items/customHooks/productsInterfaceHooks/useHandlePagination";
import { useFavProducts } from "../../items/customHooks/useFavProducts";
import { useHandleFav } from "../../items/customHooks/useHandleFav";
import { useLocalStorage } from "../../items/customHooks/useLocalStorage";

export async function getServerSideProps({ query }) {
  const usuario = await getSingleDoc("users", query.cd);
  const favoritos = usuario.data().favoritos;
  let docObject = [];
  if (favoritos.length === 0) {
    return {
      props: {
        favData: [],
        favs: [],
      },
    };
  }
  for (let i = 0; i < favoritos.length; i++) {
    const document = await getSingleDoc("Productos", favoritos[i]);
    docObject = [...docObject, { ...document.data(), id: document.id }];
    if (docObject.length === favoritos.length) {
      return {
        props: {
          favData: docObject,
          favs: favoritos,
        },
      };
    }
  }
}

const Favoritos = ({ favData }) => {
  const [cartList, setCartList] = useLocalStorage("CART_CONTEXT_LOCAL_STORAGE", []);
  const { favoriteList, selectedProd, favLoading, handleFavorito } =
    useHandleFav();
  const products = useFavProducts(favData, favoriteList);
  const { page, pagesTotal, pageActions } = useHandlePagination(products);

  return (
    <FormatClient title="Favoritos" cartIndex={cartList.length}>
      {!products || products?.length > 0 ? (
        <Flex justify="center" flexDir="column" p={2} m={2}>
          {products.map((product, i) => {
            if (i > page * 10 - 11 && i < page * 10)
              return (
                <Flex
                  as={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transitionDuration={"0.2s"}
                  transitionDelay={`${(i - (page * 10 - 10)) * 0.1}s`}
                  key={product.id}
                  border="1px solid #a7a7a7"
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
                      <Link href={`/productPages/productos/${product.id}`}>
                        <Image
                          cursor="pointer"
                          border={[
                            "none",
                            "1px solid #a7a7a7",
                            "1px solid #a7a7a7",
                            "1px solid #a7a7a7",
                          ]}
                          m="auto"
                          boxSize={["100px", "120px", "160px", "160px"]}
                          objectFit="cover"
                          borderRadius="5px"
                          src={product.Img}
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
                      <Flex flexGrow={4}>
                        <Link href={`/productPages/productos/${product.id}`}>
                          <Text
                            cursor="pointer"
                            fontSize={[12, 14, 17, 17]}
                            fontWeight="bold"
                          >
                            {product.Nombre}
                          </Text>
                        </Link>
                      </Flex>
                      <ProductPrice
                        precio={product.Precio}
                        descuento={product.Descuento}
                      />
                    </Flex>
                    <Flex
                      flexDir="column"
                      align="flex-end"
                      justifyContent="space-between"
                    >
                      <Icon
                        as={AiFillHeart}
                        cursor="pointer"
                        display={
                          !favLoading || selectedProd !== i + 1
                            ? "flex"
                            : "none"
                        }
                        _hover={{ opacity: "0.4" }}
                        color="blue.800"
                        fontSize={[20, 25, 30, 30]}
                        onClick={() => handleFavorito(product.id, i + 1)}
                      />
                      <Spinner
                        display={
                          favLoading && selectedProd === i + 1 ? "flex" : "none"
                        }
                        color="blue.500"
                      />
                      <Flex>
                        {cartList.includes(product.id) && (
                          <Text
                            fontSize={[12, 15, 18, 18]}
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
                          fontSize={[20, 25, 30, 30]}
                          onClick={() => setCartList([...cartList, product.id])}
                        />
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              );
          })}
        </Flex>
      ) : (
        <Text
          mt={5}
          align="center"
          fontSize={[10, 20, 20, 20]}
          color="blackAlpha.500"
        >
          No se han encontrado favoritos
        </Text>
      )}

      <Pagination
        condition={products.length > 0}
        pagina={page}
        paginasTotales={pagesTotal}
        manejarPaginacion={pageActions.handlePagination}
        handleSiguiente={pageActions.setPlusPage}
        handleAnterior={pageActions.setMinusPage}
      />
    </FormatClient>
  );
};

export default Favoritos;
