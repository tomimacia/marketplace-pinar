import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";
import { FormatProduct } from "../../components/products/FormatProducts";
import { NoProducts } from "../../components/products/NoProducts";
import { Pagination } from "../../components/products/Pagination";
import ProductTopComp from "../../components/products/ProductTopComp";
import ProductsInterfaceAll from "../../components/products/ProductsInterfaceAll";
import { useHandlePagination } from "../../items/customHooks/useHandlePagination";
import { useGetProducts } from "../../items/customHooks/productsInterfaceHooks/useGetProducts";
import { useUrlQueryParams } from "../../items/customHooks/productsInterfaceHooks/useUrlQueryParams";

const productos = () => {
  const { products, setProducts, loadingProducts } = useGetProducts();
  const { page, pagesTotal, pageActions } = useHandlePagination(products);
  const router = useRouter();
  useUrlQueryParams(router);
  return (
    <FormatProduct headTitle showFilterBar={true} loader={loadingProducts}>
      <ProductTopComp setProducts={setProducts} />

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
          {!loadingProducts && !products.length && <NoProducts />}
          {loadingProducts ? (
            <Flex mt={10} justify="center">
              <BeatLoader color="#68EBBB" />
            </Flex>
          ) : (
            <ProductsInterfaceAll page={page} products={products} />
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
