import { Flex, Text } from "@chakra-ui/react";
import { FormatClient } from "../../components/client/FormatClient";
import { Pagination } from "../../components/products/Pagination";
import { ProductStructure } from "../../components/products/ProductStructure";
import { getSingleDoc } from "../../firebase/services/getSingleDoc";
import { useCartList } from "../../items/customHooks/cartHooks/useCartList";
import { useFavProducts } from "../../items/customHooks/favoritesHooks/useFavProducts";
import { useHandleFav } from "../../items/customHooks/favoritesHooks/useHandleFav";
import { useHandlePagination } from "../../items/customHooks/useHandlePagination";

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
        },
      };
    }
  }
}

const Favoritos = ({ favData }) => {
  const { cartList, actions } = useCartList();
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
