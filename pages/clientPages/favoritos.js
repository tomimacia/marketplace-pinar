import { Flex, Progress, Text } from "@chakra-ui/react";
import { FormatClient } from "../../components/client/FormatClient";
import { Pagination } from "../../components/products/Pagination";
import { ProductStructure } from "../../components/products/ProductStructure";
import { useCartList } from "../../items/customHooks/cartHooks/useCartList";
import { useFavProducts } from "../../items/customHooks/favoritesHooks/useFavProducts";
import { useHandleFav } from "../../items/customHooks/favoritesHooks/useHandleFav";
import { useHandlePagination } from "../../items/customHooks/useHandlePagination";

const Favoritos = () => {
  const { cartList, actions } = useCartList();
  const { favoriteList, selectedProd, favLoading, handleFavorito } =
    useHandleFav();
  const { products, favProductsLoading } = useFavProducts(favoriteList);
  const { page, pagesTotal, pageActions } = useHandlePagination(products);
  return (
    <FormatClient title="Favoritos" cartIndex={cartList.length}>
      {products?.length > 0 ? (
        <Flex justify="center" flexDir="column" p={2} m={2}>
          {products.map((product, i) => {
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
          })}
        </Flex>
      ) : favProductsLoading ? (
        <Progress m="50px" size="xs" isIndeterminate />
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
