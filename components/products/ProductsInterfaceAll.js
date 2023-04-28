import React from "react";
import { useCartList } from "../../items/customHooks/cartHooks/useCartList";
import { useHandleFav } from "../../items/customHooks/favoritesHooks/useHandleFav";
import { ProductStructure } from "./ProductStructure";

const ProductsInterfaceAll = ({ products,page }) => {
  const { favoriteList, selectedProd, favLoading, handleFavorito } =
    useHandleFav();
  const { cartList, actions } = useCartList();
  return (
    <>
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
    </>
  );
};

export default ProductsInterfaceAll;
