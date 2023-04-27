import { Box, Flex } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import { FormatProduct } from "../../components/products/FormatProducts";
import { Pagination } from "../../components/products/Pagination";
import { ProductStructure } from "../../components/products/ProductStructure";
import ProductTopComp from "../../components/products/ProductTopComp";
import {
  useGetProducts,
  useHandlePagination,
} from "../../items/customHooks/productsInterfaceHooks/productsInterfaceHooks";
import { useCartList } from "../../items/customHooks/useCartList";
import { useHandleFav } from "../../items/customHooks/useHandleFav";

const productos = () => {
  const { favoriteList, selectedProd, favLoading, handleFavorito } =
    useHandleFav();
  const { cartList, actions } = useCartList();
  const { products, loadingProducts } = useGetProducts();
  const { page, pagesTotal, pageActions } = useHandlePagination(products);

  return (
    <FormatProduct headTitle showFilterBar={true} loader={loadingProducts}>
      <ProductTopComp />

      <Box
        mt={[2, 4, 7, 10]}
        minH="30vh"
        m={2}
        border="1px solid #a7a7a7"
        borderRadius="15px"
      >
        <Flex
          key={products.length * 1000}
          justify="center"
          flexDir="column"
          p={2}
          m={2}
        >
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
                    onClickCarrito={() => actions.plusOne(product.id)}
                    onClickFavorito={() => handleFavorito(product.id, i)}
                    key={product.id}
                    isSpinner={favLoading && selectedProd === i}
                  />
                );
            })
          )}
          <Pagination
            condition={!loadingProducts}
            pagina={page}
            paginasTotales={pagesTotal}
            handleSiguiente={pageActions.setPlusPage}
            handleAnterior={pageActions.setMinusPage}
          />
        </Flex>
      </Box>
    </FormatProduct>
  );
};

export default productos;
