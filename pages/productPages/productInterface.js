import { Box, Flex } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import { FormatProduct } from "../../components/products/FormatProducts";
import ProductTopComp from "../../components/products/ProductTopComp";
import { ProductStructure } from "../../components/products/productStructure";
import { ProductsPagination } from "../../components/products/productsPagination";
import {
  useCategoria,
  useSearchInputValue,
  useSetCategoria,
} from "../../contexts/productsContext";
import {
  useGetProducts,
  useHandlePagination,
} from "../../items/customHooks/productsInterfaceHooks/productsInterfaceHooks";
import { useHandleFav } from "../../items/customHooks/useHandleFav";
import { useLocalStorage } from "../../items/customHooks/useLocalStorage";

const productos = () => {
  const categoria = useCategoria();
  const setCategoria = useSetCategoria();

  const searchInputValue = useSearchInputValue();
  const { favoriteList, selectedProd, favLoading, handleFavorito } =
    useHandleFav();
  const [cartList, setCartList] = useLocalStorage("CART_CONTEXT_STORAGE", []);
  const { products, loadingProducts } = useGetProducts();
  const { page, pagesTotal, pageActions } = useHandlePagination(products);
  return (
    <FormatProduct showFilterBar={true} loader={loadingProducts}>
      <ProductTopComp />

      <Box
        mt={[2, 4, 7, 10]}
        minH="30vh"
        m={2}
        border="1px solid #a7a7a7"
        borderRadius="15px"
      >
        <Flex justify="center" flexDir="column" p={2} m={2}>
          {loadingProducts ? (
            <Flex mt={10} justify="center">
              <BeatLoader color="#68EBBB" />
            </Flex>
          ) : (
            products.map((product, i) => {
              if (i > page * 10 - 11 && i < page * 10)
                return (
                  <ProductStructure
                    page={page}
                    i={i}
                    product={product}
                    favoriteList={favoriteList}
                    cartList={cartList}
                    onClickCarrito={() =>
                      setCartList([...cartList, product.id])
                    }
                    onClickFavorito={() => handleFavorito(product.id, i)}
                    key={product.id}
                    isSpinner={favLoading && selectedProd === i}
                  />
                );
            })
          )}
          <ProductsPagination
            condition={!loadingProducts && pagesTotal > 1}
            pagina={page}
            paginasTotales={pagesTotal}
            manejarPaginacion={pageActions.handlePagination}
            handleSiguiente={pageActions.setPlusPage}
            handleAnterior={pageActions.setMinusPage}
          />
        </Flex>
      </Box>
    </FormatProduct>
  );
};

export default productos;

{
  /* <Box
        mt={[2, 4, 7, 10]}
        minH="30vh"
        m={2}
        border="1px solid #a7a7a7"
        borderRadius="15px"
      >
        <Flex justify="center" flexDir="column" p={2} m={2}>
          {!categoria && searchInputValue.length === 0 && <BusquedaGeneral />}
          {!loadedProducts && (categoria || searchInputValue.length > 0) ? (
            <Flex mt={10} justify="center">
              <BeatLoader color="#68EBBB" />
            </Flex>
          ) : (
            products.map((product, i) => {
              if (i > page * 10 - 11 && i < page * 10)
                return (
                  <ProductStructure
                    page={page}
                    i={i}
                    product={product}
                    favoriteList={favoriteList}
                    cartList={cartList}
                    onClickCarrito={() =>
                      setCartList([...cartList, product.id])
                    }
                    onClickFavorito={() => handleFavorito(product.id, i)}
                    key={product.id}
                    isSpinner={favLoading && selectedProd === i}
                  />
                );
            })
          )}
        </Flex>
        {loadedProducts && (
          <Flex justify="center" bg="white" h="10vh">
            {products.length
              ? pagesTotal > 1 && (
                  <ProductsPagination
                    pagina={page}
                    paginasTotales={pagesTotal}
                    manejarPaginacion={pageActions.handlePagination}
                    handleSiguiente={pageActions.setPlusPage}
                    handleAnterior={pageActions.setMinusPage}
                  />
                )
              : searchInputValue.length !== undefined && (
                  <Flex flexDir="column">
                    <Text>
                      No se encontraron resultados
                      {categoria && ` buscando en "${categoria}"`}
                    </Text>
                    {categoria && (
                      <Text
                        cursor="pointer"
                        _hover={{ textDecoration: "underline" }}
                        onClick={() => setCategoria()}
                      >
                        Buscar "{searchInputValue.join(" ")}" en general
                      </Text>
                    )}
                  </Flex>
                )}
          </Flex>
        )}
      </Box> */
}
